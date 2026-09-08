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
  console.log('--- Fetching all products from Supabase ---');
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
      riflescopes.push({ ...p, newCategory: 'Riflescopes' });
    } else if (combined.includes('spotting scope') || combined.includes('spotter')) {
      spottingScopes.push({ ...p, newCategory: 'Spotting Scopes' });
    } else if (combined.includes('dot') || combined.includes('reflex') || catLow.includes('dot sight')) {
      dotSights.push({ ...p, newCategory: 'Dot Sights' });
    } else if (combined.includes('rangefinder') || catLow.includes('rangefinder')) {
      rangefinders.push({ ...p, newCategory: 'Rangefinders' });
    } else if (combined.includes('lens') || catLow.includes('precision lenses')) {
      lenses.push({ ...p, newCategory: 'Precision Lenses' });
    } else if (combined.includes('binocular') || catLow.includes('binoculars')) {
      binoculars.push({ ...p, newCategory: 'Binoculars' });
    } else {
      mountsAndAccessories.push({ ...p, newCategory: 'Optics Accessories' });
    }
  }

  // Sort Binoculars by images count and rating
  const selectedBinoculars = [...binoculars].sort((a, b) => {
    const imgDiff = (b.images?.length || 0) - (a.images?.length || 0);
    if (imgDiff !== 0) return imgDiff;
    return (b.rating || 0) - (a.rating || 0);
  }).slice(0, 145);

  // Curate top Mounts & Accessories across distinct brands
  const mountsByBrand = {};
  for (const m of mountsAndAccessories) {
    const b = m.brand || 'Other';
    if (!mountsByBrand[b]) mountsByBrand[b] = [];
    mountsByBrand[b].push(m);
  }

  for (const b in mountsByBrand) {
    mountsByBrand[b].sort((a, b) => {
      const imgDiff = (b.images?.length || 0) - (a.images?.length || 0);
      if (imgDiff !== 0) return imgDiff;
      return (b.rating || 0) - (a.rating || 0);
    });
  }

  const selectedMounts = [];
  const targetMountBrands = ['Spuhr', 'INNOmount', 'ERA-TAC', 'EAW', 'Rusan', 'Optilock', 'Recknagel', 'MAK'];
  for (const brand of targetMountBrands) {
    if (mountsByBrand[brand]) {
      selectedMounts.push(...mountsByBrand[brand].slice(0, 15));
    }
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

  console.log(`\nCurated items to keep: ${finalKeepList.length}`);
  const keepIds = new Set(finalKeepList.map(p => p.id));
  const toDeleteIds = allProducts.filter(p => !keepIds.has(p.id)).map(p => p.id);
  console.log(`Items to delete: ${toDeleteIds.length}`);

  // 1. Update categories where newCategory !== category
  console.log('\nUpdating categories for reclassified items...');
  for (const item of finalKeepList) {
    if (item.newCategory && item.newCategory !== item.category) {
      const { error } = await supabase
        .from('products')
        .update({ category: item.newCategory })
        .eq('id', item.id);
      if (error) {
        console.error(`Failed to update category for ${item.title}:`, error);
      } else {
        console.log(`Updated [${item.title}] category to: ${item.newCategory}`);
      }
    }
  }

  // 2. Delete unwanted items in batches of 200
  console.log('\nDeleting unselected items from database in batches...');
  const batchSize = 200;
  for (let i = 0; i < toDeleteIds.length; i += batchSize) {
    const chunk = toDeleteIds.slice(i, i + batchSize);
    const { error } = await supabase
      .from('products')
      .delete()
      .in('id', chunk);
    if (error) {
      console.error(`Batch delete error at ${i}:`, error);
    } else {
      console.log(`Deleted batch ${i + 1} - ${Math.min(i + batchSize, toDeleteIds.length)} / ${toDeleteIds.length}`);
    }
  }

  // 3. Verify final count
  const { count: finalCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  console.log(`\n=== Verification Complete: Final product count in DB = ${finalCount} ===`);
}

main().catch(console.error);
