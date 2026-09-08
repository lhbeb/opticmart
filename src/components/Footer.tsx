import BrandContactDetails from '@/components/BrandContactDetails';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-[#0F172A] text-[#F8FAFC]">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logosvg.svg"
                alt="OpticMart Logo"
                width={200}
                height={40}
                className="h-auto w-40 sm:w-48 text-white"
              />
            </Link>
            <p className="mb-4 text-[#F8FAFC]/90 text-sm leading-relaxed">
              OpticMart is a premier dealer for professional cameras, precision binoculars, and optical equipment. High performance glass for photographers, birdwatchers, and outdoor enthusiasts.
            </p>
            <BrandContactDetails />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white mb-4 tracking-wide uppercase">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white hover:underline transition-colors duration-200">Home</Link></li>
              <li><Link href="/search?category=Binoculars" className="hover:text-white hover:underline transition-colors duration-200">Binoculars</Link></li>
              <li><Link href="/search?category=Riflescopes" className="hover:text-white hover:underline transition-colors duration-200">Riflescopes</Link></li>
              <li><Link href="/search?category=Spotting+Scopes" className="hover:text-white hover:underline transition-colors duration-200">Spotting Scopes</Link></li>
              <li><Link href="/search?category=Rangefinders" className="hover:text-white hover:underline transition-colors duration-200">Rangefinders</Link></li>
              <li><Link href="/search?category=Red+Dots" className="hover:text-white hover:underline transition-colors duration-200">Red Dots</Link></li>
              <li><Link href="/search?category=Thermal" className="hover:text-white hover:underline transition-colors duration-200">Thermal & Night Vision</Link></li>
              <li><Link href="/search?category=Scope+Mounts" className="hover:text-white hover:underline transition-colors duration-200">Scope Mounts</Link></li>
              <li><Link href="/#featured" className="hover:text-white hover:underline transition-colors duration-200">Featured Optics</Link></li>
              <li><Link href="/track" className="hover:text-white hover:underline transition-colors duration-200">Track Order</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white mb-4 tracking-wide uppercase">Policies & Info</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors duration-200">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white hover:underline transition-colors duration-200">Terms of Service</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline transition-colors duration-200">About OpticMart</Link></li>
              <li><Link href="/frequently-asked-questions" className="hover:text-white hover:underline transition-colors duration-200">FAQs</Link></li>
              <li><Link href="/return-policy" className="hover:text-white hover:underline transition-colors duration-200">Refund & Return Policy</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white hover:underline transition-colors duration-200">Shipping & Delivery Policy</Link></li>
              <li><Link href="/local-pickup" className="hover:text-white hover:underline transition-colors duration-200">Local Pickup Guide</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline transition-colors duration-200">Customer Support</Link></li>
              <li><Link href="/cookies" className="hover:text-white hover:underline transition-colors duration-200">Cookies Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/15 mt-12 pt-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center">
              <Image
                src="/secure-checkout.png"
                alt="Secure Checkout"
                width={400}
                height={64}
                className="h-16 w-auto max-w-full object-contain brightness-110 contrast-110"
              />
            </div>
            <p className="text-center text-xs sm:text-sm text-[#F8FAFC]/70">© {new Date().getFullYear()} OpticMart. All rights reserved. opticmart.shop</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
