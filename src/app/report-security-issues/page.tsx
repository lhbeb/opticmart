import type { Metadata } from 'next';
import { Bug, Mail, ShieldAlert } from 'lucide-react';
import BrandContactDetails from '@/components/BrandContactDetails';
import { brand } from '@/config/brand';

export const metadata: Metadata = {
  title: 'Report Security Issues | OpticMart',
  description:
    'Responsible disclosure information for reporting suspected OpticMart website security issues in good faith.',
  alternates: {
    canonical: 'https://www.opticmart.shop/report-security-issues',
  },
};

export default function ReportSecurityIssuesPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="rounded-3xl bg-[#0F172A] p-8 text-white sm:p-10">
          <ShieldAlert className="mb-4 h-9 w-9 text-[#9BD4D3]" />
          <h1 className="text-4xl font-bold">Report Security Issues</h1>
          <p className="mt-4 text-white/75">
            If you believe you found a security issue on OpticMart, please report it responsibly so we can investigate and address it.
          </p>
        </header>

        <section className="mt-8 space-y-8 rounded-3xl border bg-white p-7 text-gray-700 sm:p-10">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">How to Report</h2>
            <p className="mt-3 leading-7">
              Email <a href={`mailto:${brand.email}`} className="font-semibold text-[#0F172A] hover:underline">{brand.email}</a> with a clear subject such as &quot;Security issue report.&quot; Include enough detail for our team to reproduce and understand the issue.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Please Include</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
              <li>Affected URL or feature.</li>
              <li>Steps to reproduce the issue.</li>
              <li>Potential impact.</li>
              <li>Relevant screenshots, logs, or proof-of-concept details that do not expose customer data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Good-Faith Testing Expectations</h2>
            <ul className="mt-3 list-disc space-y-2 pl-6 leading-7">
              <li>Do not access, modify, delete, or disclose another customer&apos;s data.</li>
              <li>Do not disrupt service, send spam, perform social engineering, or run destructive testing.</li>
              <li>Stop testing and report promptly if you encounter sensitive data.</li>
              <li>Give OpticMart reasonable time to investigate and remediate before public disclosure.</li>
            </ul>
          </div>

          <div className="rounded-2xl bg-[#F8FAFC] p-5">
            <h2 className="flex items-center gap-2 text-xl font-bold text-[#0F172A]">
              <Bug className="h-5 w-5" />
              No Monetary Bounty Promise
            </h2>
            <p className="mt-3 leading-7">
              OpticMart does not currently promise monetary rewards or a paid bounty program for vulnerability reports.
            </p>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold text-[#0F172A]">Contact</h2>
            <div className="mt-3 rounded-2xl bg-[#F8FAFC] p-6">
              <BrandContactDetails />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
