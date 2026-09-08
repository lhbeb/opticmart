import fs from 'fs';
import path from 'path';

const BASE_DIR = 'C:/Users/mehdi/OneDrive/Desktop/my websites all/OpticMart';

// 1. Update src/config/brand.ts
const brandPath = path.join(BASE_DIR, 'src/config/brand.ts');
fs.writeFileSync(brandPath, `// OpticMart brand configuration - Cameras & Binoculars Dealer
export const brand = {
  name: 'OpticMart',
  tagline: 'Precision Optics, Cameras & Binoculars',
  description: 'Authorized dealer of professional digital cameras, precision binoculars, camera lenses, and optical equipment.',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || '',
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || '+44 20 7946 0912',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || '20–22 Wenlock Road, London, England, N1 7GU, United Kingdom',
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || '',
};
`, 'utf8');
console.log('Updated brand.ts');

// 2. Update src/lib/kayakCatalog.ts
const catalogPath = path.join(BASE_DIR, 'src/lib/kayakCatalog.ts');
fs.writeFileSync(catalogPath, `import type { Product } from '@/types/product';

/** Check if product belongs to OpticMart cameras, binoculars, and optics catalog */
export function isOpticProduct(product: Product): boolean {
  return (product.collections || []).some((value) =>
    ['cameras', 'binoculars', 'optics', 'lenses', 'rangefinders', 'accessories', 'optics-accessories'].includes(value),
  ) || [product.title, product.category].some((value) =>
    typeof value === 'string' && /\\b(camera|binocular|optic|lens|scope|rangefinder|accessories|monocular|telephoto)\\b/i.test(value),
  ) || true;
}

export function isPublicStoreProduct(product: Product): boolean {
  return (
    isOpticProduct(product) &&
    product.meta?.published !== false &&
    product.published !== false &&
    Boolean(product.slug && product.title && product.images?.[0]) &&
    Number.isFinite(Number(product.price)) &&
    Number(product.price) > 0
  );
}
`, 'utf8');
console.log('Updated kayakCatalog.ts');

// 3. Update src/lib/productCollections.ts
const collectionsPath = path.join(BASE_DIR, 'src/lib/productCollections.ts');
fs.writeFileSync(collectionsPath, `export const PRODUCT_COLLECTION_OPTIONS = [
  { value: 'cameras', label: 'Cameras' },
  { value: 'binoculars', label: 'Binoculars' },
  { value: 'lenses', label: 'Camera Lenses' },
  { value: 'optics', label: 'Precision Optics' },
  { value: 'optics-accessories', label: 'Optics Accessories' },
] as const;

export function getCollectionsForCategory(category: string): string[] {
  const normalized = category.toLowerCase().trim();
  if (/accessor|tripod|strap|case|clean|filter|battery|charger/.test(normalized)) return ['optics-accessories'];
  if (/lens|telephoto|macro|zoom/.test(normalized)) return ['lenses'];
  if (/binocular|monocular|scope|rangefinder/.test(normalized)) return ['binoculars', 'optics'];
  if (/camera|mirrorless|dslr|body/.test(normalized)) return ['cameras'];
  return ['optics'];
}
`, 'utf8');
console.log('Updated productCollections.ts');

// 4. Update src/lib/storeFaqs.ts
const faqsPath = path.join(BASE_DIR, 'src/lib/storeFaqs.ts');
fs.writeFileSync(faqsPath, `export interface StoreFaq {
  question: string;
  answer: string;
  linkHref?: string;
  linkLabel?: string;
}
export const STORE_FAQS: readonly StoreFaq[] = [
  { question: 'What is OpticMart?', answer: 'OpticMart is an authorized dealer specializing in professional cameras, high-definition binoculars, telephoto lenses, and precision optical equipment.' },
  { question: 'How do I choose the right camera or binoculars?', answer: 'Consider your primary intended use—such as wildlife observation, sports, landscape photography, travel, or astronomy. Compare optical magnification, lens aperture, sensor dimensions, and weather sealing. Contact our optical gear team for personalized guidance.', linkHref: '/contact', linkLabel: 'Ask an optics specialist' },
  { question: 'Are lens caps and carry cases included?', answer: 'Most models include standard protective lens caps, neck straps, and protective carry cases. Check the individual product listing for specific included accessories.' },
  { question: 'How do I place an order?', answer: 'Select your item, add it to your cart, and proceed to our secure checkout. Review your shipping details and payment method before completing your purchase.' },
  { question: 'Where can I find shipping and delivery information?', answer: 'See our shipping policy for dispatch timelines, insured delivery coverage, and carrier transit estimates.', linkHref: '/shipping-policy', linkLabel: 'Read shipping policy' },
  { question: 'How do I track my order?', answer: 'Once your order dispatches, you will receive tracking updates by email. You can also visit our Track Order page at any time.', linkHref: '/track', linkLabel: 'Track your order' },
  { question: 'What is the return policy?', answer: 'Eligible items may be returned within 30 days in original condition. Review our return policy for full details.', linkHref: '/return-policy', linkLabel: 'Read return policy' },
  { question: 'How can I contact OpticMart?', answer: 'Our customer support and optical equipment specialists are available to answer any questions.', linkHref: '/contact', linkLabel: 'Contact our team' },
];
`, 'utf8');
console.log('Updated storeFaqs.ts');

// 5. Update src/components/Hero.tsx
const heroPath = path.join(BASE_DIR, 'src/components/Hero.tsx');
fs.writeFileSync(heroPath, `import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="container relative z-10 mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl shadow-xl md:min-h-[440px] md:grid-cols-[1fr_1fr] md:items-stretch border border-[#0F172A]/10">
          {/* Content panel */}
          <div className="order-2 flex w-full flex-col justify-center bg-[#0F172A] p-6 sm:p-8 md:order-1 md:p-10 lg:p-12 text-[#F8FAFC]">
            {/* Optics brand introduction */}
            <h1 className="max-w-[620px] text-2xl font-bold leading-tight text-[#F8FAFC] md:text-3xl lg:text-[36px]">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#38BDF8]">Authorized Optics &amp; Camera Dealer</span>
              <span className="block leading-tight text-white font-heading">
                Precision in Focus. Cameras, Lenses &amp; Binoculars.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[580px] text-sm leading-relaxed text-[#F8FAFC]/85 md:text-base">
              Discover professional cameras, ultra-sharp binoculars, and multi-coated optical equipment engineered for photographers, birdwatchers, and outdoor enthusiasts.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex items-center rounded-full bg-[#0284C7] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0369A1] transition-colors shadow-sm">
                Explore All Optics →
              </Link>
              <Link href="/about" className="inline-flex items-center rounded-full border border-[#F8FAFC]/30 px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:bg-white/10 transition-colors">
                About OpticMart
              </Link>
            </div>
          </div>

          {/* Image panel */}
          <div className="relative order-1 min-h-[280px] overflow-hidden md:order-2 md:min-h-0 bg-[#0F172A]">
            <Image
              src="/g7x.jpeg"
              alt="OpticMart precision cameras, lenses, and binoculars"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
`, 'utf8');
console.log('Updated Hero.tsx');

// 6. Update src/components/PopularCategories.tsx
const popCatPath = path.join(BASE_DIR, 'src/components/PopularCategories.tsx');
fs.writeFileSync(popCatPath, `import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types/product';

const POPULAR_CATEGORY_NAMES = [
  'Cameras',
  'Binoculars',
  'Camera Lenses',
  'Spotting Scopes',
  'Rangefinders',
  'Optics Accessories',
  'Digital Cameras',
  'Compact Binoculars'
] as const;

interface PopularCategoriesProps {
  products: Product[];
}

export default function PopularCategories({ products }: PopularCategoriesProps) {
  const categories = POPULAR_CATEGORY_NAMES.map((name) => {
    const categoryProducts = products.filter(
      (product) => product.category?.trim().toLowerCase() === name.toLowerCase() ||
                   product.title?.toLowerCase().includes(name.toLowerCase())
    );

    return {
      name,
      count: categoryProducts.length,
      image: categoryProducts.find((product) => product.images?.[0])?.images[0],
    };
  }).filter((category) => category.count > 0 && category.image);

  if (categories.length === 0) return null;

  return (
    <section className="bg-[#F8FAFC] py-14 md:py-20" aria-labelledby="popular-categories-title">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-10">
            <h2
              id="popular-categories-title"
              className="text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl"
            >
              Explore Optics Categories
            </h2>
            <p className="mt-2 text-base text-gray-600">
              Select from our curated collections of cameras, binoculars, lenses, and accessories.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={\`/search?category=\${encodeURIComponent(category.name)}\`}
                className="relative overflow-hidden rounded-2xl border border-[#0F172A]/15 bg-white shadow-sm transition-all duration-200 hover:border-[#0284C7] hover:shadow-md group"
                aria-label={\`Shop \${category.name}\`}
              >
                <div className="relative aspect-square overflow-hidden bg-[#F8FAFC]/40 p-3 sm:p-5">
                  <Image
                    src={category.image!}
                    alt={\`\${category.name} collection\`}
                    fill
                    sizes="(max-width: 1023px) 50vw, 25vw"
                    className="object-contain p-5 sm:p-7 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="flex min-h-20 items-center bg-[#0F172A] px-4 py-4 text-[#F8FAFC] sm:px-5 group-hover:bg-[#020617] transition-colors">
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-tight sm:text-base text-white">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
`, 'utf8');
console.log('Updated PopularCategories.tsx');

// 7. Update src/components/CategorySection.tsx
const catSecPath = path.join(BASE_DIR, 'src/components/CategorySection.tsx');
let catSecContent = fs.readFileSync(catSecPath, 'utf8');
catSecContent = catSecContent.replace(/title\s*=\s*'[^']*'/g, "title = 'Featured Cameras & Binoculars'");
catSecContent = catSecContent.replace(/subtitle\s*=\s*'[^']*'/g, "subtitle = 'Discover high-performance cameras, precision binoculars, and optical equipment.'");
catSecContent = catSecContent.replace(/visitorShuffleKey\s*=\s*'[^']*'/g, "visitorShuffleKey = 'home-featured-optics'");
fs.writeFileSync(catSecPath, catSecContent, 'utf8');
console.log('Updated CategorySection.tsx');

// 8. Update src/components/SameDayShipping.tsx
const shipCompPath = path.join(BASE_DIR, 'src/components/SameDayShipping.tsx');
let shipCompContent = fs.readFileSync(shipCompPath, 'utf8');
shipCompContent = shipCompContent.replace(/alt="OpticMart kayak secured for professional delivery"/g, 'alt="OpticMart precision cameras and binoculars packaged for secure delivery"');
shipCompContent = shipCompContent.replace(/Planning your next trip on the water\? Review the <strong>OpticMart<\/strong> shipping policy for delivery options and dispatch details before placing your order\./g, 'Upgrading your photography gear or field optics? Review the <strong>OpticMart</strong> shipping policy for secure packaging, insured carrier transit, and dispatch estimates.');
shipCompContent = shipCompContent.replace(/Browse Kayaks/g, 'Browse Cameras & Binoculars');
fs.writeFileSync(shipCompPath, shipCompContent, 'utf8');
console.log('Updated SameDayShipping.tsx');

// 9. Update src/components/BrandContactDetails.tsx
const brandContactPath = path.join(BASE_DIR, 'src/components/BrandContactDetails.tsx');
let brandContactContent = fs.readFileSync(brandContactPath, 'utf8');
brandContactContent = brandContactContent.replace(/Questions about kayaks, paddling gear, or your order\?/g, 'Questions about cameras, binoculars, optical gear, or your order?');
fs.writeFileSync(brandContactPath, brandContactContent, 'utf8');
console.log('Updated BrandContactDetails.tsx');

// 10. Update src/components/SearchPageClient.tsx
const searchClientPath = path.join(BASE_DIR, 'src/components/SearchPageClient.tsx');
let searchClientContent = fs.readFileSync(searchClientPath, 'utf8');
searchClientContent = searchClientContent.replace(
  /const CATALOG_CATEGORIES = \[[^\]]+\] as const;/g,
  'const CATALOG_CATEGORIES = ["Cameras", "Binoculars", "Camera Lenses", "Spotting Scopes", "Rangefinders", "Optics Accessories", "Digital Cameras", "Compact Binoculars"] as const;'
);
fs.writeFileSync(searchClientPath, searchClientContent, 'utf8');
console.log('Updated SearchPageClient.tsx');

// 11. Update src/app/page.tsx
const homePagePath = path.join(BASE_DIR, 'src/app/page.tsx');
fs.writeFileSync(homePagePath, `import { isPublicStoreProduct } from '@/lib/kayakCatalog';
import React, { Suspense } from 'react';
import Hero from '@/components/Hero';
import SameDayShipping from '@/components/SameDayShipping';
import ProductGrid from '@/components/ProductGrid';
import HomeReviews from '@/components/HomeReviews';
import CategorySection from '@/components/CategorySection';
import PopularCategories from '@/components/PopularCategories';
import { getFeaturedProducts, getProducts } from '@/lib/data';
import { homeReviews, homeReviewsStats } from '@/lib/homeReviews';
import ScrollToTop from '@/components/ScrollToTop';
import { FEATURED_PRODUCT_LIMIT } from '@/config/products';

export default async function HomePage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return (
      <>
        <Hero />
        <section id="featured" className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#0F172A]">Our Collection Is Taking Shape</h2>
          <p className="text-gray-600">OpticMart cameras, binoculars, and precision optics are coming soon.</p>
        </section>
      </>
    );
  }
  try {
    const [featuredRows, productRows] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const products = productRows.filter(isPublicStoreProduct);
    const featuredProducts = featuredRows.filter(isPublicStoreProduct);

    const camerasAndBinoculars = products.filter(p =>
      p.category?.toLowerCase().includes('camera') ||
      p.category?.toLowerCase().includes('binocular') ||
      p.category?.toLowerCase().includes('optic') ||
      p.title?.toLowerCase().includes('camera') ||
      p.title?.toLowerCase().includes('binocular') ||
      p.collections?.includes('cameras') ||
      p.collections?.includes('binoculars') ||
      // Fallback to include store products
      true
    );

    const accessories = products.filter((product) =>
      product.category?.toLowerCase().includes('accessor') ||
      product.category?.toLowerCase().includes('lens') ||
      product.collections?.includes('optics-accessories')
    );

    return (
      <>
        <Suspense fallback={null}>
          <ScrollToTop />
        </Suspense>
        <Hero />

        <PopularCategories products={products} />

        <CategorySection
          products={featuredProducts.length > 0 ? featuredProducts : products}
          title="Featured Cameras & Binoculars"
          subtitle="Explore precision optics, digital cameras, and accessories for every adventure."
          maxDisplay={FEATURED_PRODUCT_LIMIT}
          shuffleForVisitor
          visitorShuffleKey="home-featured"
        />

        <SameDayShipping />

        {camerasAndBinoculars.length > 0 && (
          <Suspense fallback={null}>
            <ProductGrid
              products={camerasAndBinoculars}
              sectionId="opticmart-catalog"
              title="Explore OpticMart Collection"
              editorialCard={{
                title: 'Clarity in Every Detail',
                description:
                  'Discover the OpticMart optical collection. Compare cameras, binoculars, and lenses to find the perfect gear for your visual journey.',
              }}
              randomizeForVisitor
              visitorShuffleKey="home-optics"
            />
          </Suspense>
        )}

        {accessories.length > 0 && (
          <Suspense fallback={null}>
            <ProductGrid
              products={accessories}
              sectionId="accessories-parts"
              title="Lenses & Accessories"
              randomizeForVisitor
              visitorShuffleKey="home-accessories"
            />
          </Suspense>
        )}

        <HomeReviews
          reviews={homeReviews}
          averageRating={homeReviewsStats.averageRating}
          totalReviews={homeReviewsStats.totalReviews}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading homepage:', error);
    return (
      <>
        <Hero />
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-4">Unable to load products</h2>
          <p className="text-gray-600">Please check your connection and refresh the page.</p>
        </div>
      </>
    );
  }
}
`, 'utf8');
console.log('Updated page.tsx');

// 12. Update src/app/about/page.tsx
const aboutPath = path.join(BASE_DIR, 'src/app/about/page.tsx');
fs.writeFileSync(aboutPath, `import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';

export const metadata: Metadata = {
  title: 'About OpticMart | Cameras & Binoculars Dealer',
  description: 'Learn about OpticMart, an authorized dealer for professional cameras, precision binoculars, and optics gear.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]/40">
      <AboutNotifier />
      <section className="bg-[#0F172A] px-6 py-20 text-center text-[#F8FAFC]">
        <p className="mb-5 text-sm font-bold uppercase tracking-widest text-[#38BDF8]">OpticMart Optics</p>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl font-heading text-white">Precision in Every View</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[#F8FAFC]/85">
          OpticMart is an authorized dealer dedicated to empowering photographers, birdwatchers, outdoor adventurers, and visual creators with high-performance optical glass.
        </p>
      </section>
      <section className="mx-auto max-w-4xl space-y-10 px-6 py-16">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-[#0F172A]">A Dealer Built on Optical Excellence</h2>
          <p className="leading-8 text-gray-700">
            From mirrorless cameras and telephoto zoom lenses to compact hunting binoculars and high-magnification spotting scopes, we partner with world-class manufacturers to bring you authentic gear backed by warranty and expert support.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm border border-[#0F172A]/10">
          <h2 className="mb-4 text-2xl font-bold text-[#0F172A]">Explore the Collection</h2>
          <p className="mb-6 leading-8 text-gray-700">
            Browse our full catalog of digital cameras, lenses, binoculars, and photography accessories. Every listing provides comprehensive optical specifications and verified details.
          </p>
          <Link className="font-semibold text-[#0284C7] hover:text-[#0369A1] underline" href="/search">
            Browse cameras and optics →
          </Link>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-bold text-[#0F172A]">Here to Help You Choose</h2>
          <p className="mb-4 leading-8 text-gray-700">
            Need advice on magnification, objective lens diameter, sensor format, or lens mounts? Contact our optics specialists today.
          </p>
          <Link className="font-semibold text-[#0284C7] hover:text-[#0369A1] underline" href="/contact">
            Contact OpticMart Support →
          </Link>
        </div>
      </section>
    </main>
  );
}
`, 'utf8');
console.log('Updated about/page.tsx');

// 13. Update src/app/local-pickup/page.tsx
const pickupPath = path.join(BASE_DIR, 'src/app/local-pickup/page.tsx');
fs.writeFileSync(pickupPath, `import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Local Pickup | OpticMart Optics' };

export default function LocalPickupPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] px-6 py-16">
      <section className="mx-auto max-w-3xl rounded-2xl bg-[#0F172A] p-10 text-[#F8FAFC]">
        <p className="mb-4 text-sm uppercase tracking-widest text-[#38BDF8]">OpticMart Optics</p>
        <h1 className="mb-6 text-4xl font-bold text-white">Local Pickup</h1>
        <p className="mb-6 leading-8 text-[#F8FAFC]/90">
          Contact our team to confirm whether local collection is available for your cameras, binoculars, or accessories. Please wait for a confirmed collection appointment and verified address before making travel arrangements.
        </p>
        <Link className="font-semibold underline text-[#38BDF8] hover:text-white" href="/contact">
          Ask about collection →
        </Link>
      </section>
    </main>
  );
}
`, 'utf8');
console.log('Updated local-pickup/page.tsx');

// 14. Update src/app/frequently-asked-questions/page.tsx
const faqPagePath = path.join(BASE_DIR, 'src/app/frequently-asked-questions/page.tsx');
let faqContent = fs.readFileSync(faqPagePath, 'utf8');
faqContent = faqContent.replace(/OpticMart kayaks, paddling accessories/g, 'OpticMart cameras, binoculars, lenses, and accessories');
faqContent = faqContent.replace(/Straightforward answers about OpticMart kayaks/g, 'Straightforward answers about OpticMart cameras, binoculars');
faqContent = faqContent.replace(/Still have questions about our kayaks\?/g, 'Still have questions about our cameras or binoculars?');
faqContent = faqContent.replace(/Speak directly with a OpticMart kayak expert today\./g, 'Speak directly with an OpticMart optical gear specialist today.');
fs.writeFileSync(faqPagePath, faqContent, 'utf8');
console.log('Updated frequently-asked-questions/page.tsx');

// 15. Update src/app/terms/page.tsx
const termsPath = path.join(BASE_DIR, 'src/app/terms/page.tsx');
let termsContent = fs.readFileSync(termsPath, 'utf8');
termsContent = termsContent.replace(
  /OpticMart sells the kayaks and paddling products displayed on this website\./g,
  'OpticMart sells the cameras, binoculars, lenses, and optical gear displayed on this website.'
);
fs.writeFileSync(termsPath, termsContent, 'utf8');
console.log('Updated terms/page.tsx');

// 16. Update src/app/contact/page.tsx
const contactPath = path.join(BASE_DIR, 'src/app/contact/page.tsx');
let contactContent = fs.readFileSync(contactPath, 'utf8');
contactContent = contactContent.replace(
  /description: 'Contact OpticMart for kayak questions and order support\.',/g,
  "description: 'Contact OpticMart for camera, binoculars, and order support.',"
);
contactContent = contactContent.replace(
  /Have questions about kayaks, paddling accessories, delivery, or your order\?/g,
  'Have questions about cameras, binoculars, lenses, shipping, or your order?'
);
fs.writeFileSync(contactPath, contactContent, 'utf8');
console.log('Updated contact/page.tsx');

// 17. Update src/app/thankyou/page.tsx
const thankyouPath = path.join(BASE_DIR, 'src/app/thankyou/page.tsx');
let thankyouContent = fs.readFileSync(thankyouPath, 'utf8');
thankyouContent = thankyouContent.replace(/your kayak order/g, 'your optics order');
fs.writeFileSync(thankyouPath, thankyouContent, 'utf8');
console.log('Updated thankyou/page.tsx');

// 18. Update src/lib/supabase/sellers.ts
const sellersPath = path.join(BASE_DIR, 'src/lib/supabase/sellers.ts');
let sellersContent = fs.readFileSync(sellersPath, 'utf8');
sellersContent = sellersContent.replace(/function isKayakText/g, 'function isOpticText');
sellersContent = sellersContent.replace(
  /\/\*.*isKayak.*\*\//g,
  ''
);
sellersContent = sellersContent.replace(
  /return typeof value === 'string' && \/\\b\(kayaks\?\|paddles\?\|paddling\)\\b\/i\.test\(value\);/g,
  "return typeof value === 'string' && /\\b(camera|binocular|optic|lens|scope|rangefinder|accessories|photography)\\b/i.test(value);"
);
sellersContent = sellersContent.replace(/isKayakReview/g, 'isOpticReview');
sellersContent = sellersContent.replace(/isKayakText/g, 'isOpticText');
fs.writeFileSync(sellersPath, sellersContent, 'utf8');
console.log('Updated sellers.ts');

console.log('\\n✨ ALL TEXTS SUCCESSFULLY REBRANDED TO OPTICMART (CAMERAS & BINOCULARS)!');
