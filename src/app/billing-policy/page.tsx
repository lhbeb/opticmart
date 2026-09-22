import type { Metadata } from 'next';
import Link from 'next/link';
import { AlertTriangle, CreditCard, ShieldCheck } from 'lucide-react';
import BrandContactDetails from '@/components/BrandContactDetails';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Billing Policy | OpticMart',
  description:
    'OpticMart Billing Policy covering order review, payment authorization, cancellations, duplicate orders, and customer support.',
  alternates: {
    canonical: 'https://www.opticmart.shop/billing-policy',
  },
};

export default function BillingPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
          <CreditCard className="mb-4 h-9 w-9 text-[#9BD4D3]" />
          <h1 className="text-4xl font-bold">Billing Policy</h1>
          <p className="mt-4 text-white/75">
            This policy explains how OpticMart reviews orders, handles payment authorization, and responds to duplicate, suspicious, or unavailable orders.
          </p>
        </header>

        <section className="mt-8 space-y-8 rounded-3xl border bg-white p-7 text-gray-700 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Order Review and Acceptance</h2>
            <p className="mt-3 leading-7">
              Placing an order does not mean it has been accepted for fulfillment. OpticMart may review product availability, payment status, billing details, shipping information, and fraud indicators before accepting or dispatching an order.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Right to Refuse or Cancel</h2>
            <p className="mt-3 leading-7">
              We may refuse, delay, or cancel an order when inventory cannot be fulfilled, payment cannot be verified, billing or shipping information is incomplete, pricing or listing information contains an error, or the order appears unauthorized or suspicious.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Quantity Limits and Duplicate Orders</h2>
            <p className="mt-3 leading-7">
              OpticMart may limit quantities per customer, account, household, payment method, billing address, or shipping address when needed to keep ordering fair, protect inventory, or prevent duplicate or suspicious transactions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Payment Authorization</h2>
            <p className="mt-3 leading-7">
              Payments may be authorized by a third-party payment provider before an order is processed. An authorization or payment confirmation does not guarantee shipment if the order later fails review or cannot be fulfilled.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Customer Contact About Cancellations</h2>
            <p className="mt-3 leading-7">
              If an order is cancelled or requires additional review, OpticMart may contact you using the email address or phone number provided at checkout. Refunds for cancelled paid orders are handled according to our return and refund process and the payment provider timeline.
            </p>
          </div>

          <div className="grid gap-4 rounded-2xl bg-[#F8FAFC] p-5 sm:grid-cols-2">
            <Link href="/return-policy" className="inline-flex items-center gap-2 font-semibold text-[#0F172A] hover:underline">
              <ShieldCheck className="h-5 w-5" />
              Return & Refund Policy
            </Link>
            <Link href="/billing-term-and-condition" className="inline-flex items-center gap-2 font-semibold text-[#0F172A] hover:underline">
              <AlertTriangle className="h-5 w-5" />
              Billing Terms & Conditions
            </Link>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Billing Support</h2>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-6">
              <BrandContactDetails />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
