"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const typingTextRef = useRef<HTMLSpanElement>(null);
  const placeholder = '\u00a0';

  useEffect(() => {
    const element = typingTextRef.current;
    if (!element) return;

    const words = [
      'Digital & Mirrorless Cameras',
      'High-Power Binoculars',
      'Precision Zoom & Prime Lenses',
      'Professional Spotting Scopes'
    ];
    let isAnimating = true;
    let currentIndex = 0;

    const sleep = (duration: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, duration));

    const typeWord = async (word: string) => {
      element.textContent = '';
      const letters = word.split('');
      for (const letter of letters) {
        if (!isAnimating) return;
        element.textContent = `${element.textContent}${letter}`;
        await sleep(80);
      }
    };

    const deleteWord = async () => {
      while (isAnimating && (element.textContent?.length ?? 0) > 0) {
        element.textContent = element.textContent?.slice(0, -1) ?? '';
        await sleep(35);
      }
      element.textContent = placeholder;
    };

    const animateLoop = async () => {
      element.textContent = placeholder;

      while (isAnimating) {
        const word = words[currentIndex];

        await typeWord(word);
        if (!isAnimating) break;

        await sleep(2200);
        if (!isAnimating) break;

        await deleteWord();
        if (!isAnimating) break;

        await sleep(300);
        if (!isAnimating) break;

        currentIndex = (currentIndex + 1) % words.length;
      }
    };

    animateLoop();

    return () => {
      isAnimating = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="container relative z-10 mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl shadow-xl md:min-h-[440px] md:grid-cols-[1fr_1fr] md:items-stretch border border-[#0F172A]/10">
          {/* Content panel */}
          <div className="order-2 flex w-full flex-col justify-center bg-[#0F172A] p-6 sm:p-8 md:order-1 md:p-10 lg:p-12 text-[#F8FAFC]">
            {/* Optics brand introduction */}
            <h1 className="max-w-[620px] text-2xl font-bold leading-tight text-[#F8FAFC] md:text-3xl lg:text-[36px]">
              <span className="mb-3 block text-xs font-semibold uppercase text-[#38BDF8]">Authorized Optics &amp; Camera Dealer</span>
              <span
                ref={typingTextRef}
                className="mb-1 block h-[1.25em] text-[#38BDF8]"
              >
                {placeholder}
              </span>
              <span className="block leading-tight text-white font-heading">
                Precision in Focus. Cameras, Lenses &amp; Binoculars.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[580px] text-sm leading-relaxed text-[#F8FAFC]/85 md:text-base">
              Discover professional cameras, ultra-sharp binoculars, and multi-coated optical equipment engineered for photographers, birdwatchers, and outdoor enthusiasts.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/search" className="inline-flex items-center rounded-full bg-[#0284C7] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0369A1] transition-colors shadow-sm">
                Explore All Optics →
              </Link>
              <Link href="/about" className="inline-flex items-center rounded-full border border-[#F8FAFC]/30 px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:bg-white/10 transition-colors">
                About OpticMart
              </Link>
            </div>
          </div>

          {/* Image panel */}
          <div className="relative order-1 min-h-[280px] overflow-hidden md:order-2 md:min-h-0 bg-[#0F172A]">
            <Image
              src="/opticmart-hero.png"
              alt="OpticMart precision cameras, lenses, and binoculars"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
