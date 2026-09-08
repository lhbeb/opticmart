import type { Metadata } from 'next';
import Link from 'next/link';
import AboutNotifier from '@/components/AboutNotifier';
export const metadata: Metadata = {
  title: 'About OpticMart | Kayaks & Paddling Gear',
  description: 'Meet OpticMart, a premier dealer for cameras, binoculars, and precision optics.',
};
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]/40">
      <AboutNotifier />
      <section className="bg-[#0F172A] px-6 py-20 text-center text-[#F8FAFC]">
        <p className="mb-5 text-sm font-bold uppercase tracking-widest">OpticMart Optics</p>
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl">Find Your Own Water</h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed">OpticMart is a optics & camera dealer inspired by the simple pleasure of getting out on the water. Our focus is kayaking, paddling gear, and the adventures that begin at the shoreline.</p>
      </section>
      <section className="mx-auto max-w-4xl space-y-10 px-6 py-16">
        <div><h2 className="mb-4 text-3xl font-bold text-[#0F172A]">A Brand for Paddlers</h2><p className="leading-8 text-gray-700">Explore the available models and review each product’s dimensions, capacity, included equipment, and intended use before choosing a camera or binoculars for your next adventure.</p></div>
        <div className="rounded-2xl bg-white p-8 shadow-sm"><h2 className="mb-4 text-2xl font-bold text-[#0F172A]">Explore the Collection</h2><p className="mb-6 leading-8 text-gray-700">Discover OpticMart kayaks and paddling accessories. Product pages provide the details for each available item.</p><Link className="font-semibold text-[#0F172A] underline" href="/search">Browse kayaks and gear →</Link></div>
        <div><h2 className="mb-4 text-2xl font-bold text-[#0F172A]">Here to Help</h2><p className="mb-4 leading-8 text-gray-700">Have a question about a product or an order? Get in touch with our team.</p><Link className="font-semibold text-[#0F172A] underline" href="/contact">Contact OpticMart →</Link></div>
      </section>
    </main>
  );
}
