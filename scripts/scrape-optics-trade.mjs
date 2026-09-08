import fs from 'fs';
import path from 'path';
import https from 'https';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env.local
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const PROGRESS_FILE = path.join(__dirname, 'optics-trade-progress.json');

// CLI options
const args = process.argv.slice(2);
const sitemapArg = args.find(a => a.startsWith('--sitemap='))?.split('=')[1] || '1'; // default products-1.xml
const limitArg = parseInt(args.find(a => a.startsWith('--limit='))?.split('=')[1] || '0', 10);
const concurrencyArg = parseInt(args.find(a => a.startsWith('--concurrency='))?.split('=')[1] || '12', 10);

console.log(`Starting Scraper: Sitemap ${sitemapArg}, Limit: ${limitArg || 'ALL'}, Concurrency: ${concurrencyArg}`);

// State tracking
let progress = {
  processedUrls: {},
  totalInserted: 0,
  lastUpdated: new Date().toISOString()
};

if (fs.existsSync(PROGRESS_FILE)) {
  try {
    progress = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    console.log(`Loaded existing progress: ${Object.keys(progress.processedUrls || {}).length} URLs previously handled.`);
  } catch (e) {
    console.warn('Could not parse progress file, starting fresh.');
  }
}

function saveProgress() {
  progress.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

// Fetch helper with headers & timeout
async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          ...(options.headers || {})
        }
      });
      clearTimeout(timeout);
      if (res.ok) return await res.text();
      if (res.status === 404) return null;
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
}

// Product parser from HTML
function parseProduct(html, productUrl) {
  if (!html) return null;

  // Title
  let title = html.match(/<span class="base"[^>]*itemprop="name">([^<]+)<\/span>/i)?.[1]
    || html.match(/<h1 class="page-title"[^>]*>[\s\S]*?<span[^>]*>([^<]+)<\/span>/i)?.[1]
    || html.match(/<title>([^<]+)<\/title>/i)?.[1] || '';
  title = title.replace(/\s*-\s*Optics Trade\s*$/i, '').trim();

  if (!title) return null;

  // Slug from URL
  const slugMatch = productUrl.match(/\/int\/([^/]+?)(?:\.html)?$/i);
  const rawSlug = slugMatch ? slugMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const slug = rawSlug.toLowerCase().replace(/[^a-z0-9-]+/g, '').slice(0, 100);

  // Price (EUR)
  const priceStr = html.match(/<meta itemprop="price" content="([^"]+)"/i)?.[1]
    || html.match(/data-price-amount="([^"]+)"/i)?.[1];
  const priceEur = parseFloat(priceStr) || 0;
  if (priceEur <= 0) return null;

  // Convert to USD (approx 1.08x)
  const price = Math.round(priceEur * 1.08 * 100) / 100;
  const originalPrice = Math.round(price * 1.18 * 100) / 100;

  // Specifications
  const specs = [...html.matchAll(/<th class="col label" scope="row">([^<]+)<\/th>[\s\S]*?<td class="col data"[^>]*>([^<]+)<\/td>/gi)]
    .map(m => [m[1].trim(), m[2].trim()]);

  // Brand / Manufacturer
  let brand = specs.find(s => s[0].toLowerCase() === 'manufacturer')?.[1]
    || html.match(/<td class="col data" data-th="Manufacturer">([^<]+)<\/td>/i)?.[1]
    || html.match(/itemprop="brand"[^>]*content="([^"]+)"/i)?.[1]
    || '';
  brand = brand.trim() || 'Optics Trade';

  // Description
  let mainDesc = html.match(/<div class="product attribute description">([\s\S]*?)<\/div>/i)?.[1]
    || html.match(/id="description"[\s\S]*?<div class="value">([\s\S]*?)<\/div>/i)?.[1]
    || '';
  
  // Clean description text
  let cleanDesc = mainDesc
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();

  if (!cleanDesc || cleanDesc.length < 20) {
    cleanDesc = `${title} engineered by ${brand}. Features high-contrast multi-coated optics, precision mechanical construction, and crystal-clear edge-to-edge optical resolution.`;
  }

  // Generate clean HTML specs table
  let specsHtml = '';
  if (specs.length > 0) {
    specsHtml = `
<div class="mt-8 border-t border-gray-200 pt-6">
  <h3 class="text-lg font-bold text-gray-900 mb-4">Technical Specifications</h3>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
    ${specs.map(([k, v]) => `
      <div class="flex justify-between py-1.5 border-b border-gray-100">
        <span class="text-gray-500 font-medium">${k}</span>
        <span class="text-gray-900 font-semibold text-right">${v}</span>
      </div>
    `).join('')}
  </div>
</div>`;
  }

  const fullDescription = `<p>${cleanDesc}</p>${specsHtml}`;

  // Images
  const imgMatches = [...html.matchAll(/(?:href|src|data-src|content)="([^"]*?media\/catalog\/product[^"]*?\.(?:jpg|jpeg|png|webp))"/gi)]
    .map(m => m[1])
    .filter(u => !u.includes('/placeholder/'));

  // Clean cached URLs to high-res master URLs
  const cleanImgUrls = [...new Set(imgMatches.map(u => u.replace(/\/cache\/[a-f0-9]{32}/i, '')))];

  if (cleanImgUrls.length === 0) return null;

  // Category & Collections detection
  const specKeys = specs.map(s => s[0].toLowerCase()).join(' ');
  const textCorpus = (title + ' ' + productUrl + ' ' + specKeys).toLowerCase();

  let category = 'Optics Accessories';
  let collections = ['optics'];

  if (specKeys.includes('binoculars series') || textCorpus.includes('binocular') || /\b\d+x\d+\b/.test(title)) {
    category = 'Binoculars';
    collections = ['binoculars', 'optics'];
  } else if (specKeys.includes('spotting scopes series') || textCorpus.includes('spotting scope')) {
    category = 'Spotting Scopes';
    collections = ['spotting-scopes', 'optics'];
  } else if (specKeys.includes('rangefinders series') || textCorpus.includes('rangefinder')) {
    category = 'Rangefinders';
    collections = ['rangefinders', 'optics'];
  } else if (specKeys.includes('riflescopes series') || textCorpus.includes('riflescope') || textCorpus.includes('rifle-scope')) {
    category = 'Riflescopes';
    collections = ['riflescopes', 'optics'];
  } else if (specKeys.includes('red dot series') || textCorpus.includes('dot sight') || textCorpus.includes('red dot')) {
    category = 'Dot Sights';
    collections = ['optics', 'optics-accessories'];
  } else if (textCorpus.includes('camera') || textCorpus.includes('digiscop') || textCorpus.includes('thermal') || textCorpus.includes('night vision')) {
    category = 'Digital Cameras';
    collections = ['cameras', 'optics'];
  } else if (textCorpus.includes('eyepiece') || textCorpus.includes('lens')) {
    category = 'Precision Lenses';
    collections = ['lenses', 'optics'];
  } else {
    category = 'Optics Accessories';
    collections = ['optics-accessories', 'optics'];
  }

  // Feature top quality products
  const isFeatured = priceEur > 300 && ['Nikon', 'Zeiss', 'Swarovski Optik', 'Leica', 'Vortex'].includes(brand);
  if (isFeatured) {
    collections.push('featured');
  }

  // Ratings
  const rating = parseFloat((4.5 + Math.random() * 0.4).toFixed(1));
  const reviewCount = Math.floor(8 + Math.random() * 32);

  return {
    id: slug,
    slug,
    title,
    description: fullDescription,
    price,
    original_price: originalPrice,
    rating,
    review_count: reviewCount,
    images: cleanImgUrls.slice(0, 10),
    condition: 'New',
    category,
    brand,
    payee_email: 'arvaradodotcom@gmail.com',
    currency: 'USD',
    checkout_link: 'https://opticmart.shop/checkout',
    checkout_flow: 'stripe',
    collections,
    in_stock: true,
    is_featured: isFeatured,
    meta: {
      published: true,
      targetMarket: 'us',
      gmc_enabled: true,
      sourceUrl: productUrl
    },
    published: true
  };
}

// Supabase Batch Upsert
async function upsertBatch(products) {
  if (products.length === 0) return true;

  const url = `${SUPABASE_URL}/rest/v1/products`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': SUPABASE_KEY,
      'Authorization': `Bearer ${SUPABASE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates,return=minimal'
    },
    body: JSON.stringify(products)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Supabase upsert failed [${res.status}]: ${errorText}`);
  }

  return true;
}

// Main processing worker
async function run() {
  const sitemaps = sitemapArg === 'all' 
    ? Array.from({ length: 14 }, (_, i) => `https://www.optics-trade.eu/media/sitemaps/int/products-${i + 1}.xml`)
    : [`https://www.optics-trade.eu/media/sitemaps/int/products-${sitemapArg}.xml`];

  console.log(`Processing sitemaps:`, sitemaps);

  let allUrls = [];
  for (const smUrl of sitemaps) {
    try {
      console.log(`Fetching sitemap: ${smUrl}`);
      const xml = await fetchWithRetry(smUrl);
      if (!xml) continue;
      const urls = xml.match(/<loc>(.*?)<\/loc>/g)?.map(l => l.replace(/<\/?loc>/g, '').trim()) || [];
      console.log(`Found ${urls.length} URLs in ${smUrl}`);
      allUrls.push(...urls);
    } catch (e) {
      console.error(`Failed to load ${smUrl}:`, e.message);
    }
  }

  // Deduplicate and filter already processed
  const pendingUrls = allUrls.filter(u => !progress.processedUrls[u]);
  console.log(`Total URLs: ${allUrls.length}, Pending un-scraped: ${pendingUrls.length}`);

  const targetUrls = limitArg > 0 ? pendingUrls.slice(0, limitArg) : pendingUrls;
  console.log(`URLs to scrape in this run: ${targetUrls.length}`);

  let buffer = [];
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  // Process with concurrency pool
  let idx = 0;
  async function worker(workerId) {
    while (idx < targetUrls.length) {
      const currentIdx = idx++;
      const url = targetUrls[currentIdx];

      try {
        const html = await fetchWithRetry(url);
        const parsed = parseProduct(html, url);

        if (parsed) {
          buffer.push(parsed);
          progress.processedUrls[url] = { status: 'ok', slug: parsed.slug, category: parsed.category };
          successCount++;
        } else {
          progress.processedUrls[url] = { status: 'skipped' };
          skippedCount++;
        }
      } catch (err) {
        progress.processedUrls[url] = { status: 'error', error: err.message };
        errorCount++;
      }

      // Flush buffer if reaches 50
      if (buffer.length >= 50) {
        const toFlush = [...buffer];
        buffer = [];
        try {
          await upsertBatch(toFlush);
          progress.totalInserted += toFlush.length;
          saveProgress();
          console.log(`[Worker ${workerId}] Batch of ${toFlush.length} inserted into Supabase! (Total: ${progress.totalInserted}, Progress: ${currentIdx + 1}/${targetUrls.length})`);
        } catch (dbErr) {
          console.error(`Database batch insert error:`, dbErr.message);
          // Put back in buffer to retry
          buffer.push(...toFlush);
        }
      }
    }
  }

  const startTime = Date.now();
  const workers = Array.from({ length: concurrencyArg }, (_, i) => worker(i + 1));
  await Promise.all(workers);

  // Flush remaining buffer
  if (buffer.length > 0) {
    try {
      await upsertBatch(buffer);
      progress.totalInserted += buffer.length;
      saveProgress();
      console.log(`Final batch of ${buffer.length} products inserted.`);
    } catch (e) {
      console.error('Failed to flush final batch:', e.message);
    }
  }

  saveProgress();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  console.log(`\n========================================`);
  console.log(`Scraping Run Completed in ${elapsed}s`);
  console.log(`Successfully Parsed & Ingested: ${successCount}`);
  console.log(`Skipped (no price/no image): ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
  console.log(`Total Products in DB from all runs: ${progress.totalInserted}`);
  console.log(`========================================\n`);
}

run().catch(console.error);
