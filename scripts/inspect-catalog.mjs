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
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log('Total count:', count);

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

  console.log('Fetched total products:', allProducts.length);

  const catMap = {};
  let withImages = 0;
  let withoutImages = 0;
  for (const p of allProducts) {
    const cat = p.category || 'Uncategorized';
    catMap[cat] = (catMap[cat] || 0) + 1;
    if (p.images && p.images.length > 0 && p.images[0]) {
      withImages++;
    } else {
      withoutImages++;
    }
  }

  console.log('Category distribution:', catMap);
  console.log('With images:', withImages, 'Without images:', withoutImages);

  const brandMap = {};
  for (const p of allProducts) {
    const b = p.brand || 'Unknown';
    brandMap[b] = (brandMap[b] || 0) + 1;
  }
  const sortedBrands = Object.entries(brandMap).sort((a, b) => b[1] - a[1]);
  console.log('\nTop 20 brands:', sortedBrands.slice(0, 20));

  // Check how many riflescopes, red dots, night vision, thermal, rangefinders, mounts are in titles
  const types = {
    riflescope: 0,
    binoculars: 0,
    monocular: 0,
    'red dot / dot sight': 0,
    rangefinder: 0,
    'spotting scope': 0,
    mount: 0,
    thermal: 0,
    'night vision': 0,
    tripod: 0,
    lens: 0,
    other: 0,
  };

  for (const p of allProducts) {
    const t = (p.title + ' ' + (p.category || '')).toLowerCase();
    if (t.includes('riflescope') || t.includes('rifle scope')) types.riflescope++;
    else if (t.includes('binocular')) types.binoculars++;
    else if (t.includes('monocular')) types.monocular++;
    else if (t.includes('dot') || t.includes('reflex')) types['red dot / dot sight']++;
    else if (t.includes('rangefinder')) types.rangefinder++;
    else if (t.includes('spotting scope') || t.includes('spotter')) types['spotting scope']++;
    else if (t.includes('mount') || t.includes('ring') || t.includes('rail')) types.mount++;
    else if (t.includes('thermal')) types.thermal++;
    else if (t.includes('night vision')) types['night vision']++;
    else if (t.includes('tripod') || t.includes('adapter')) types.tripod++;
    else if (t.includes('lens')) types.lens++;
    else types.other++;
  }
  console.log('\nTypes by title/content:', types);

  // Print 10 sample products
  console.log('\n10 sample products:');
  for (let i = 0; i < 10; i++) {
    console.log(`[${allProducts[i].brand}] ${allProducts[i].title} (£${allProducts[i].price}) - Images: ${allProducts[i].images?.length}`);
  }
}

main().catch(console.error);
