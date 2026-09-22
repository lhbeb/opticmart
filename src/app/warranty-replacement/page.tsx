import type { Metadata } from 'next';
import Link from 'next/link';
import { RefreshCcw, ShieldCheck } from 'lucide-react';
import BrandContactDetails from '@/components/BrandContactDetails';

export const metadata: Metadata = {
  title: 'Warranty & Replacement | OpticMart',
  description:
    'OpticMart warranty and replacement information, including product-specific coverage, manufacturer warranties, replacements, repairs, and refunds.',
  alternates: {
    canonical: 'https://www.opticmart.shop/warranty-replacement',
  },
};

export default function WarrantyReplacementPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
          <ShieldCheck className="mb-4 h-9 w-9 text-[#9BD4D3]" />
          <h1 className="text-4xl font-bold">Warranty & Replacement</h1>
          <p className="mt-4 text-white/75">
            Warranty coverage can vary by product, brand, condition, listing details, and manufacturer policy. This page explains how OpticMart handles warranty and replacement questions without creating a blanket warranty promise.
          </p>
        </header>

        <section className="mt-8 space-y-8 rounded-3xl border bg-white p-7 text-gray-700 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Product-Specific Coverage</h2>
            <p className="mt-3 leading-7">
              Warranty coverage is determined by the applicable product listing, order information, manufacturer warranty, and any written support confirmation from OpticMart. This page does not create coverage beyond what is stated for the relevant product or required by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Manufacturer and Brand Warranties</h2>
            <p className="mt-3 leading-7">
              Some products may include manufacturer warranty information. If a manufacturer warranty applies, customers may need to follow the manufacturer&apos;s registration, proof-of-purchase, inspection, or service process.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">If a Replacement Is Approved</h2>
            <p className="mt-3 leading-7">
              If OpticMart approves a replacement, we may provide an identical item when available. If an identical replacement is unavailable, we may offer a similar-value replacement, repair route, refund, or another resolution after reviewing the order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">How to Request Help</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7">
              <li>Contact OpticMart with your order number and product name.</li>
              <li>Describe the issue and include clear photos or videos when useful.</li>
              <li>Wait for support instructions before sending anything back.</li>
            </ol>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] p-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#0F172A]">
              <RefreshCcw className="h-5 w-5" />
              Returns May Still Apply
            </h2>
            <p className="mt-3 leading-7">
              If your concern is a return, damaged item, incorrect item, or change-of-mind return, review the <Link href="/return-policy" className="font-semibold text-[#0F172A] hover:underline">Return & Refund Policy</Link>.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Warranty Support</h2>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-6">
              <BrandContactDetails />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
