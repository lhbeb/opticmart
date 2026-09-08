import { isPublicStoreProduct } from '@/lib/kayakCatalog';
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
