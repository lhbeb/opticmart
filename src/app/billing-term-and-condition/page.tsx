import type { Metadata } from 'next';
import Link from 'next/link';
import { CreditCard, LockKeyhole, ShieldCheck } from 'lucide-react';
import BrandContactDetails from '@/components/BrandContactDetails';

export const metadata: Metadata = {
  title: 'Billing Terms & Conditions | OpticMart',
  description:
    'OpticMart billing terms covering secure checkout, payment providers, accepted payment methods, currency, authorization, and settlement.',
  alternates: {
    canonical: 'https://www.opticmart.shop/billing-term-and-condition',
  },
};

export default function BillingTermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
          <LockKeyhole className="mb-4 h-9 w-9 text-[#9BD4D3]" />
          <h1 className="text-4xl font-bold">Billing Terms & Conditions</h1>
          <p className="mt-4 text-white/75">
            These terms explain how payments are handled on OpticMart and how our third-party payment providers support secure checkout.
          </p>
        </header>

        <section className="mt-8 space-y-8 rounded-3xl border bg-white p-7 text-gray-700 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Secure Checkout</h2>
            <p className="mt-3 leading-7">
              OpticMart uses HTTPS/SSL protection for website traffic. Payment card details are handled by the relevant payment provider and are not intentionally stored as full card numbers on OpticMart&apos;s own application servers.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Third-Party Payment Processing</h2>
            <p className="mt-3 leading-7">
              The OpticMart codebase supports Stripe checkout and PayPal checkout or invoice flows. Available payment options can vary by product and checkout route. Payment providers may perform their own fraud checks and authorization reviews.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Payment Methods and Currency</h2>
            <p className="mt-3 leading-7">
              Products are listed and charged in GBP (British Pounds) unless a product page or checkout page clearly states otherwise. Checkout may support payment cards through Stripe and PayPal-based payment options where enabled. We accept major credit and debit cards.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Authorization and Settlement</h2>
            <p className="mt-3 leading-7">
              Payment authorization may occur before final order review. If an order cannot be fulfilled or fails review, OpticMart may cancel the order and issue or request the appropriate refund through the payment provider.
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl bg-[#F8FAFC] p-5 sm:grid-cols-3">
            <Link href="/privacy-policy" className="inline-flex items-center gap-2 font-semibold text-[#0F172A] hover:underline">
              <ShieldCheck className="h-5 w-5" />
              Privacy Policy
            </Link>
            <Link href="/terms" className="inline-flex items-center gap-2 font-semibold text-[#0F172A] hover:underline">
              <CreditCard className="h-5 w-5" />
              Terms of Service
            </Link>
            <Link href="/shipping-policy" className="inline-flex items-center gap-2 font-semibold text-[#0F172A] hover:underline">
              Shipping Policy
            </Link>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Billing Support</h2>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-6">
              <BrandContactDetails />
            </div>
          </div>

          <p className="border-t pt-6 text-sm text-gray-500">Last updated: September 19, 2026</p>
        </section>
      </div>
    </main>
  );
}
