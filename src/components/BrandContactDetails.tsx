import Link from 'next/link';
import { Clock } from 'lucide-react';
import { brand } from '@/config/brand';

export default function BrandContactDetails() {
  return (
    <div className="space-y-3 text-sm leading-relaxed">
      <p>Questions about cameras, binoculars, optical gear, or your order?</p>
      <Link href="/contact" className="inline-block font-semibold underline underline-offset-4">Contact OpticMart</Link>
      {brand.email && <p><a href={`mailto:${brand.email}`} className="hover:underline">{brand.email}</a></p>}
      {brand.phone && <p><a href={`tel:${brand.phone.replace(/[^\d+]/g, '')}`} className="hover:underline">{brand.phone}</a></p>}
      {brand.address && <p>{brand.address}</p>}
      <div className="pt-2 border-t border-current/10 text-xs opacity-90 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold">
          <Clock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Support Hours (UK Time / GMT):</span>
        </div>
        <p className="pl-5">{brand.hours}</p>
        <p className="pl-5 text-current/75">{brand.weekendHours}</p>
      </div>
    </div>
  );
}
