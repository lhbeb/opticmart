'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import FacebookPixel from '@/components/FacebookPixel';

export default function OptionalAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const update = () => setEnabled(localStorage.getItem('cookieConsent') === 'accepted');
    update();
    window.addEventListener('cookie-consent-change', update);
    return () => window.removeEventListener('cookie-consent-change', update);
  }, []);

  if (!enabled) return null;

  return (
    <>
      <FacebookPixel />
      <Script src="https://analyticsapp-five.vercel.app/tracker.js" strategy="afterInteractive" />
      <SpeedInsights />
    </>
  );
}
