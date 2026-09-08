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
    return <><Hero /><section id="featured" className="mx-auto max-w-4xl px-6 py-16 text-center"><h2 className="mb-4 text-3xl font-bold text-[#0F172A]">Our Collection Is Taking Shape</h2><p className="text-gray-600">OpticMart kayaks and paddling gear are coming soon. Find your inspiration on the water.</p></section></>;
  }
  try {
    const [featuredRows, productRows] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);

    const products = productRows.filter(isPublicStoreProduct);
    const featuredProducts = featuredRows.filter(isPublicStoreProduct);

    const kayaks = products.filter(p =>
      p.category?.toLowerCase().includes('kayak') ||
      p.title?.toLowerCase().includes('kayak')
    );

    const accessoriesAndParts = products.filter((product) =>
      product.category?.toLowerCase().includes('paddle') ||
      product.category?.toLowerCase().includes('accessories') ||
      product.collections?.includes('kayak-accessories')
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
        title="Featured OpticMart Lineup"
        subtitle="Explore kayaks and gear for your next day on the water."
        maxDisplay={FEATURED_PRODUCT_LIMIT}
        shuffleForVisitor
        visitorShuffleKey="home-featured"
      />

      <SameDayShipping />

      {kayaks.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={kayaks}
            sectionId="opticmart-kayaks"
            title="Explore OpticMart Optics"
            editorialCard={{
              title: 'Make Time for the Water',
              description:
                'Discover the OpticMart kayak collection. Compare available models and find the right fit for your paddling plans.',
            }}
            randomizeForVisitor
            visitorShuffleKey="home-kayaks"
          />
        </Suspense>
      )}

      {accessoriesAndParts.length > 0 && (
        <Suspense fallback={null}>
          <ProductGrid
            products={accessoriesAndParts}
            sectionId="accessories-parts"
            title="Accessories & Equipment"
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
          <p className="text-gray-600">Please refresh the page or try again later.</p>
        </div>
      </>
    );
  }
}
