import type { Metadata } from 'next';
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
        <p className="mb-5 text-sm font-bold uppercase text-[#38BDF8]">OpticMart Optics</p>
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
