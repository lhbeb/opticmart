import Link from 'next/link';
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
