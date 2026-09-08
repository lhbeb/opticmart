async function test() {
  try {
    const res = await fetch('http://localhost:3000/');
    console.log('Homepage status:', res.status);
    const html = await res.text();
    const imgs = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    console.log('Homepage images count:', imgs.length);
    console.log('Sample homepage images:', imgs.slice(0, 10));

    // Check product cards
    const productCards = [...html.matchAll(/class="[^"]*rounded-t-xl[^"]*"/g)];
    console.log('Rounded-t-xl card images:', productCards.length);

    const pRes = await fetch('http://localhost:3000/products/nikon-action-ex-7x50');
    console.log('\nProduct page status:', pRes.status);
    const pHtml = await pRes.text();
    const pImgs = [...pHtml.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    console.log('Product page images count:', pImgs.length);
    console.log('Sample product page images:', pImgs.slice(0, 10));

    // Test each sample image fetch
    for (const img of pImgs.slice(0, 5)) {
      const fullUrl = img.startsWith('/') ? `http://localhost:3000${img}` : img;
      try {
        const testImg = await fetch(fullUrl);
        console.log(`Fetch: ${fullUrl.slice(0, 70)}... => Status: ${testImg.status}, Content-Type: ${testImg.headers.get('content-type')}`);
      } catch (err) {
        console.log(`Fetch error for ${fullUrl}:`, err.message);
      }
    }
  } catch (e) {
    console.error('Test error:', e);
  }
}

test();
