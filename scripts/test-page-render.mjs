async function main() {
  console.log('Testing http://localhost:3000/ ...');
  const res = await fetch('http://localhost:3000/');
  console.log('Status:', res.status);
  const html = await res.text();
  console.log('HTML length:', html.length);
  const imgSrcs = [...html.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
  console.log('Found', imgSrcs.length, 'img src attributes in homepage');
  const opticsImgs = imgSrcs.filter(s => s.includes('optics-trade.eu'));
  console.log('Optics-trade images in homepage:', opticsImgs.length);
  if (opticsImgs.length > 0) {
    console.log('First 3:', opticsImgs.slice(0, 3));
  }

  // Now test a product page
  // Let's find a slug from HTML or test a known one
  const slugMatch = html.match(/\/products\/([a-z0-9-]+)/);
  if (slugMatch) {
    const slug = slugMatch[1];
    console.log('\nTesting product page /products/' + slug);
    const pRes = await fetch(`http://localhost:3000/products/${slug}`);
    console.log('Product page status:', pRes.status);
    const pHtml = await pRes.text();
    console.log('Product page length:', pHtml.length);
    const pImgs = [...pHtml.matchAll(/src="([^"]+)"/g)].map(m => m[1]);
    const pOpticsImgs = pImgs.filter(s => s.includes('optics-trade.eu'));
    console.log('Optics-trade images in PDP:', pOpticsImgs.length);
    if (pOpticsImgs.length > 0) {
      console.log('PDP images:', pOpticsImgs.slice(0, 5));
    }
  }
}

main().catch(console.error);
