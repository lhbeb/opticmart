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

async function checkImages() {
  const { data: products, error } = await supabase
    .from('products')
    .select('id, slug, title, images')
    .limit(10);

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Sample products:');
  for (const p of products) {
    console.log(`Product: ${p.title} (${p.slug})`);
    console.log(`Images count: ${p.images?.length || 0}`);
    console.log(`Sample image URL: ${p.images?.[0]}`);
    
    // Check if the image URL is accessible via fetch
    if (p.images?.[0]) {
      try {
        const res = await fetch(p.images[0], {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
          }
        });
        console.log(`Fetch status for sample: ${res.status} ${res.statusText}, Content-Type: ${res.headers.get('content-type')}`);
      } catch (e) {
        console.log(`Fetch failed: ${e.message}`);
      }
    }
    console.log('---');
  }
}

checkImages();
