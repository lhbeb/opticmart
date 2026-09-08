async function checkLive() {
  try {
    const res = await fetch('https://opticmart.shop');
    const html = await res.text();
    console.log(`HTTP Status: ${res.status}`);
    
    // Find all img tags
    const imgMatches = [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
    console.log(`Total <img> tags: ${imgMatches.length}`);
    console.log('Sample images:', imgMatches.slice(0, 10));

    // Find any product cards or title matches
    const productLinks = [...html.matchAll(/href="(\/products\/[^"]+)"/g)].map(m => m[1]);
    console.log(`Product links count: ${productLinks.length}`);
    console.log('Sample product links:', productLinks.slice(0, 10));

    // Check if there are any Next.js image optimizer URLs
    const nextImages = imgMatches.filter(u => u.includes('/_next/image'));
    console.log(`_next/image count: ${nextImages.length}`);

    // If there is a product link, fetch that product page as well
    if (productLinks.length > 0) {
      const prodUrl = `https://opticmart.shop${productLinks[0]}`;
      console.log(`\nFetching product page: ${prodUrl}`);
      const prodRes = await fetch(prodUrl);
      const prodHtml = await prodRes.text();
      const prodImgs = [...prodHtml.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m => m[1]);
      console.log(`Product page images count: ${prodImgs.length}`);
      console.log('Product page sample images:', prodImgs.slice(0, 10));
    }
  } catch (err) {
    console.error('Error fetching live site:', err);
  }
}

checkLive();
