import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envText = fs.readFileSync('.env.local', 'utf-8');
const env = {};
for (const line of envText.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const k = trimmed.slice(0, idx).trim();
    let v = trimmed.slice(idx + 1).trim();
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1);
    }
    env[k] = v;
  }
}

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function main() {
  console.log('Fetching all products from Supabase...');
  let allProducts = [];
  let page = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('products')
      .select('id, slug, title, category, brand, images, price, rating')
      .range(page * pageSize, (page + 1) * pageSize - 1);
    if (error) {
      console.error(error);
      break;
    }
    if (!data || data.length === 0) break;
    allProducts.push(...data);
    if (data.length < pageSize) break;
    page++;
  }

  console.log(`Total products currently in DB: ${allProducts.length}`);

  // Separate by product type / category
  const riflescopes = [];
  const spottingScopes = [];
  const dotSights = [];
  const rangefinders = [];
  const lenses = [];
  const binoculars = [];
  const mountsAndAccessories = [];

  for (const p of allProducts) {
    const titleLow = (p.title || '').toLowerCase();
    const catLow = (p.category || '').toLowerCase();
    const combined = `${titleLow} ${catLow}`;

    // Ensure it has at least 1 image
    if (!p.images || p.images.length === 0 || !p.images[0]) {
      continue;
    }

    if (combined.includes('riflescope') || combined.includes('rifle scope')) {
      riflescopes.push(p);
    } else if (combined.includes('spotting scope') || combined.includes('spotter')) {
      spottingScopes.push(p);
    } else if (combined.includes('dot') || combined.includes('reflex') || catLow.includes('dot sight')) {
      dotSights.push(p);
    } else if (combined.includes('rangefinder') || catLow.includes('rangefinder')) {
      rangefinders.push(p);
    } else if (combined.includes('lens') || catLow.includes('precision lenses')) {
      lenses.push(p);
    } else if (combined.includes('binocular') || catLow.includes('binoculars')) {
      binoculars.push(p);
    } else {
      mountsAndAccessories.push(p);
    }
  }

  console.log('Detected items:');
  console.log('- Riflescopes:', riflescopes.length);
  console.log('- Spotting Scopes:', spottingScopes.length);
  console.log('- Dot Sights:', dotSights.length);
  console.log('- Rangefinders:', rangefinders.length);
  console.log('- Precision Lenses:', lenses.length);
  console.log('- Binoculars:', binoculars.length);
  console.log('- Mounts & Accessories:', mountsAndAccessories.length);

  // Selection target: ~300 products total
  // 1. All Riflescopes (all available)
  // 2. All Spotting Scopes (all available)
  // 3. All Dot Sights (all available)
  // 4. All Rangefinders (all available)
  // 5. All Precision Lenses (all available)
  // 6. Curate top Binoculars: prioritize products with multiple images, high ratings, and prestigious brands
  const selectedBinoculars = [...binoculars].sort((a, b) => {
    const imgDiff = (b.images?.length || 0) - (a.images?.length || 0);
    if (imgDiff !== 0) return imgDiff;
    return (b.rating || 0) - (a.rating || 0);
  }).slice(0, 145);

  // 7. Curate top Mounts & Accessories across distinct brands (Spuhr, Recknagel, MAK, Rusan, INNOmount, EAW, ERA-TAC, Optilock)
  // Group by brand to ensure great variety
  const mountsByBrand = {};
  for (const m of mountsAndAccessories) {
    const b = m.brand || 'Other';
    if (!mountsByBrand[b]) mountsByBrand[b] = [];
    mountsByBrand[b].push(m);
  }

  // Sort within each brand by images count and rating
  for (const b in mountsByBrand) {
    mountsByBrand[b].sort((a, b) => {
      const imgDiff = (b.images?.length || 0) - (a.images?.length || 0);
      if (imgDiff !== 0) return imgDiff;
      return (b.rating || 0) - (a.rating || 0);
    });
  }

  const selectedMounts = [];
  // Take up to 15 per brand across the top mount brands
  const targetMountBrands = ['Spuhr', 'INNOmount', 'ERA-TAC', 'EAW', 'Rusan', 'Optilock', 'Recknagel', 'MAK'];
  for (const brand of targetMountBrands) {
    if (mountsByBrand[brand]) {
      selectedMounts.push(...mountsByBrand[brand].slice(0, 15));
    }
  }

  // If still need more to reach target ~300
  const currentTotal = riflescopes.length + spottingScopes.length + dotSights.length + rangefinders.length + lenses.length + selectedBinoculars.length + selectedMounts.length;
  console.log(`Subtotal selected so far: ${currentTotal}`);

  const needed = 300 - currentTotal;
  if (needed > 0) {
    // Add more binoculars or other top accessories
    const remainingBinos = binoculars.slice(145, 145 + needed);
    selectedBinoculars.push(...remainingBinos);
  }

  const finalKeepList = [
    ...riflescopes,
    ...spottingScopes,
    ...dotSights,
    ...rangefinders,
    ...lenses,
    ...selectedBinoculars,
    ...selectedMounts
  ];

  console.log(`\nFinal curated count to keep: ${finalKeepList.length} products`);
  const keepIds = new Set(finalKeepList.map(p => p.id));
  const toDelete = allProducts.filter(p => !keepIds.has(p.id));
  console.log(`Products to remove: ${toDelete.length}`);

  // Sample check on final categories
  const finalCatCount = {};
  for (const p of finalKeepList) {
    finalCatCount[p.category] = (finalCatCount[p.category] || 0) + 1;
  }
  console.log('Final categories count:', finalCatCount);
}

main().catch(console.error);
