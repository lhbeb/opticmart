async function testHotlink() {
  const url = 'https://www.optics-trade.eu/media/catalog/product/7/x/7x50_3.jpg';

  console.log('Testing raw fetch without headers (like Next.js Image optimizer might do):');
  try {
    const res1 = await fetch(url);
    console.log(`Raw fetch: ${res1.status} ${res1.statusText}`);
  } catch (e) {
    console.log(`Raw fetch failed: ${e.message}`);
  }

  console.log('\nTesting with browser headers and Referer https://opticmart.shop:');
  try {
    const res2 = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://opticmart.shop/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    console.log(`With Referer https://opticmart.shop: ${res2.status} ${res2.statusText}`);
  } catch (e) {
    console.log(`Referer test failed: ${e.message}`);
  }

  console.log('\nTesting with browser headers and Referer http://localhost:3000:');
  try {
    const res3 = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'http://localhost:3000/',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    });
    console.log(`With Referer localhost:3000: ${res3.status} ${res3.statusText}`);
  } catch (e) {
    console.log(`Referer test failed: ${e.message}`);
  }
}

testHotlink();
