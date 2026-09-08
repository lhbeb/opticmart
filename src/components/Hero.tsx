import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      <div className="container relative z-10 mx-auto px-4 py-8 md:py-10">
        <div className="mx-auto grid w-full max-w-7xl overflow-hidden rounded-2xl shadow-xl md:min-h-[440px] md:grid-cols-[1fr_1fr] md:items-stretch border border-[#0F172A]/10">
          {/* Content panel */}
          <div className="order-2 flex w-full flex-col justify-center bg-[#0F172A] p-6 sm:p-8 md:order-1 md:p-10 lg:p-12 text-[#F8FAFC]">
            {/* Kayak brand introduction */}
            <h1 className="max-w-[620px] text-2xl font-bold leading-tight text-[#F8FAFC] md:text-3xl lg:text-[36px]">
              <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#F8FAFC]/80">OpticMart Optics</span>
              <span className="block leading-tight text-white">
                Find Your Own Water
              </span>
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-[580px] text-sm leading-relaxed text-[#F8FAFC]/85 md:text-base">
              Make room for a different kind of day. Discover OpticMart cameras, binoculars, and precision optics for every adventure.
            </p>
            <Link href="/about" className="mt-7 inline-flex w-fit rounded-full border border-[#F8FAFC]/50 px-6 py-3 text-sm font-semibold text-[#F8FAFC] hover:bg-[#F8FAFC] hover:text-[#0F172A]">Meet OpticMart →</Link>
          </div>

          {/* Image panel */}
          <div className="relative order-1 min-h-[280px] overflow-hidden md:order-2 md:min-h-0 bg-[#0F172A]/20">
            <Image
              src="/opticmart-wave-hero.webp"
              alt="OpticMart touring kayak beside a curling ocean wave"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 50vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
