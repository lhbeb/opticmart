import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false }
});

async function inspectAllProductImages() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, title, images, category');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Total products in database: ${products.length}`);
  
  let emptyImages = 0;
  let singleImage = 0;
  let multipleImages = 0;
  let invalidUrls = 0;
  let sampleEmpty = [];
  let sampleWithImages = [];

  for (const p of products) {
    const imgs = p.images;
    if (!imgs || !Array.isArray(imgs) || imgs.length === 0) {
      emptyImages++;
      if (sampleEmpty.length < 5) sampleEmpty.push(p);
    } else {
      if (imgs.length === 1) singleImage++;
      else multipleImages++;

      if (sampleWithImages.length < 5) sampleWithImages.push(p);

      const first = imgs[0];
      if (!first || !first.startsWith('http')) {
        invalidUrls++;
      }
    }
  }

  console.log(`Products with NO images: ${emptyImages}`);
  console.log(`Products with 1 image: ${singleImage}`);
  console.log(`Products with >1 images: ${multipleImages}`);
  console.log(`Products with invalid first URL: ${invalidUrls}`);

  if (sampleEmpty.length > 0) {
    console.log('\nSample empty products:');
    sampleEmpty.forEach(p => console.log(`- ${p.title} (${p.slug}): ${JSON.stringify(p.images)}`));
  }

  if (sampleWithImages.length > 0) {
    console.log('\nSample products with images:');
    sampleWithImages.forEach(p => console.log(`- ${p.title} (${p.slug}): count=${p.images.length}, img[0]=${p.images[0]}`));
  }
}

inspectAllProductImages();
