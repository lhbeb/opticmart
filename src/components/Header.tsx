"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X, Search, ChevronLeft, ChevronRight, Info, ChevronDown, ArrowRight } from 'lucide-react';
import { getCartCount } from '@/utils/cart';
import ClientOnly from './ClientOnly';
import SearchBar from './SearchBar';

export interface Subcategory {
  label: string;
  href: string;
}

export interface CategoryNav {
  label: string;
  href: string;
  subcategories: Subcategory[];
}

export const opticsNavigation: CategoryNav[] = [
  {
    label: 'Binoculars',
    href: '/search?category=Binoculars',
    subcategories: [
      { label: 'Hunting Binoculars', href: '/search?category=Binoculars&query=Hunting+Binoculars' },
      { label: 'Birdwatching Binoculars', href: '/search?category=Binoculars&query=Birdwatching+Binoculars' },
      { label: 'Marine Binoculars', href: '/search?category=Binoculars&query=Marine+Binoculars' },
      { label: 'Compact Binoculars', href: '/search?category=Binoculars&query=Compact+Binoculars' },
      { label: '8x42 Binoculars', href: '/search?category=Binoculars&query=8x42+Binoculars' },
    ],
  },
  {
    label: 'Riflescopes',
    href: '/search?category=Riflescopes',
    subcategories: [
      { label: 'Hunting Riflescopes', href: '/search?category=Riflescopes&query=Hunting+Riflescopes' },
      { label: 'Tactical Riflescopes', href: '/search?category=Riflescopes&query=Tactical+Riflescopes' },
      { label: 'Target Riflescopes', href: '/search?category=Riflescopes&query=Target+Riflescopes' },
      { label: 'Wide Angle Riflescopes', href: '/search?category=Riflescopes&query=Wide+Angle+Riflescopes' },
      { label: 'Low Light Riflescopes', href: '/search?category=Riflescopes&query=Low+Light+Riflescopes' },
    ],
  },
  {
    label: 'Spotting Scopes',
    href: '/search?category=Spotting+Scopes',
    subcategories: [
      { label: 'Angled Spotting Scopes', href: '/search?category=Spotting+Scopes&query=Angled+Spotting+Scopes' },
      { label: 'Straight Spotting Scopes', href: '/search?category=Spotting+Scopes&query=Straight+Spotting+Scopes' },
      { label: 'Expandable Spotting Scopes', href: '/search?category=Spotting+Scopes&query=Expandable+Spotting+Scopes' },
      { label: 'Birdwatching Spotting Scopes', href: '/search?category=Spotting+Scopes&query=Birdwatching+Spotting+Scopes' },
      { label: 'Hunting Spotting Scopes', href: '/search?category=Spotting+Scopes&query=Hunting+Spotting+Scopes' },
    ],
  },
  {
    label: 'Rangefinders',
    href: '/search?category=Rangefinders',
    subcategories: [
      { label: 'Hunting Rangefinders', href: '/search?category=Rangefinders&query=Hunting+Rangefinders' },
      { label: 'Golf Rangefinders', href: '/search?category=Rangefinders&query=Golf+Rangefinders' },
      { label: 'LRF Binoculars', href: '/search?category=Rangefinders&query=LRF+Binoculars' },
      { label: 'LRF Riflescopes', href: '/search?category=Rangefinders&query=LRF+Riflescopes' },
      { label: 'Rangefinders Accessories', href: '/search?category=Rangefinders&query=Rangefinders+Accessories' },
    ],
  },
  {
    label: 'Red Dots',
    href: '/search?category=Red+Dots',
    subcategories: [
      { label: 'Reflex Sights', href: '/search?category=Red+Dots&query=Reflex+Sights' },
      { label: 'Micro Handgun Red Dot Sights', href: '/search?category=Red+Dots&query=Micro+Handgun+Red+Dot+Sights' },
      { label: 'Tube Dot Sights', href: '/search?category=Red+Dots&query=Tube+Dot+Sights' },
      { label: 'Prism Scopes', href: '/search?category=Red+Dots&query=Prism+Scopes' },
      { label: 'Magnifiers', href: '/search?category=Red+Dots&query=Magnifiers' },
    ],
  },
  {
    label: 'Monoculars',
    href: '/search?category=Monoculars',
    subcategories: [
      { label: 'Tactical Monoculars', href: '/search?category=Monoculars&query=Tactical+Monoculars' },
      { label: 'Stabilized Monoculars', href: '/search?category=Monoculars&query=Stabilized+Monoculars' },
    ],
  },
  {
    label: 'Night Vision',
    href: '/search?category=Night+Vision',
    subcategories: [
      { label: 'Analog Night Vision', href: '/search?category=Night+Vision&query=Analog+Night+Vision' },
      { label: 'Digital Night Vision', href: '/search?category=Night+Vision&query=Digital+Night+Vision' },
      { label: 'IR Illuminators', href: '/search?category=Night+Vision&query=IR+Illuminators' },
      { label: 'Fusion', href: '/search?category=Night+Vision&query=Fusion' },
    ],
  },
  {
    label: 'Thermal',
    href: '/search?category=Thermal',
    subcategories: [
      { label: 'Thermal Imaging Goggles', href: '/search?category=Thermal&query=Thermal+Imaging+Goggles' },
      { label: 'Thermal Binoculars', href: '/search?category=Thermal&query=Thermal+Binoculars' },
      { label: 'Thermal Imaging Scopes', href: '/search?category=Thermal&query=Thermal+Imaging+Scopes' },
      { label: 'Thermal Clip-on Systems', href: '/search?category=Thermal&query=Thermal+Clip-on+Systems' },
      { label: 'Thermal Rifle Scopes', href: '/search?category=Thermal&query=Thermal+Rifle+Scopes' },
    ],
  },
  {
    label: 'Scope Mounts',
    href: '/search?category=Scope+Mounts',
    subcategories: [
      { label: 'Picatinny Rails', href: '/search?category=Scope+Mounts&query=Picatinny+Rails' },
      { label: 'Weaver & Picatinny Rings', href: '/search?category=Scope+Mounts&query=Weaver+and+Picatinny+Rings' },
      { label: 'Brands Specific Mounts', href: '/search?category=Scope+Mounts&query=Brand+Specific+Mounts' },
      { label: 'Fixed Mounts', href: '/search?category=Scope+Mounts&query=Fixed+Mounts' },
      { label: 'Detachable Mounts', href: '/search?category=Scope+Mounts&query=Detachable+Mounts' },
    ],
  },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const announcementIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileCategory = (label: string) => {
    setExpandedCategory(prev => (prev === label ? null : label));
  };

  // Check if we're on the checkout page
  const isCheckoutPage = pathname === '/checkout';

  const announcements = [
    <span key="nav-1">📷 <span className="font-bold">OpticMart</span> — Authorized Dealer for Cameras & Binoculars</span>,
    <span key="nav-2">🔭 <span className="font-bold">Free Expedited Shipping</span> on Precision Optics Orders</span>,
    "whatsapp-contact" // Special marker for WhatsApp announcement
  ];

  // Announcement bar animation
  useEffect(() => {
    const startAnnouncementRotation = () => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2500);
    };

    startAnnouncementRotation();

    return () => {
      if (announcementIntervalRef.current) {
        clearInterval(announcementIntervalRef.current);
      }
    };
  }, [announcements.length]);

  const handleAnnouncementNavigation = (direction: 'prev' | 'next') => {
    if (announcementIntervalRef.current) {
      clearInterval(announcementIntervalRef.current);
    }

    setCurrentAnnouncement(prev => {
      if (direction === 'prev') {
        return prev === 0 ? announcements.length - 1 : prev - 1;
      } else {
        return (prev + 1) % announcements.length;
      }
    });

    // Restart auto-rotation after manual navigation
    setTimeout(() => {
      announcementIntervalRef.current = setInterval(() => {
        setCurrentAnnouncement(prev => (prev + 1) % announcements.length);
      }, 2500);
    }, 100);
  };

  useEffect(() => {
    const updateCartCount = () => {
      if (typeof window !== 'undefined') {
        setCartCount(getCartCount());
      }
    };
    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (pathname === '/checkout') {
        setIsSticky(false);
        return;
      }

      if (typeof window !== 'undefined') {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const promotionalBarHeight = 40;

        if (scrollTop > promotionalBarHeight) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const handleCartClick = () => {
    if (cartCount > 0) {
      router.push('/checkout');
    }
  };

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 1. Announcement Bar - Studio Light background (#F8FAFC) with Precision Slate text (#0F172A) */}
      <div suppressHydrationWarning={true} className="bg-[#F8FAFC] text-[#0F172A] py-2 relative overflow-hidden h-[40px] flex items-center border-b border-[#0F172A]/10">
        <div suppressHydrationWarning={true} className="container mx-auto px-4 flex items-center justify-center relative w-full h-full text-xs sm:text-sm">
          {/* Announcement Text */}
          <div suppressHydrationWarning={true} className="text-center font-medium px-4 sm:px-16 transition-all duration-500 ease-in-out h-full flex items-center justify-center min-h-[24px]">
            {announcements[currentAnnouncement] === "whatsapp-contact" ? (
              <div key={currentAnnouncement} className="flex items-center justify-center animate-fade-in text-xs sm:text-sm h-full w-full">
                <a
                  href="/contact"
                  className="flex items-center gap-1.5 hover:opacity-80 transition-opacity flex-wrap justify-center text-[#0F172A]"
                  aria-label="Contact OpticMart"
                >
                  <Info className="h-4 w-4 text-[#0284C7]" />
                  <span className="whitespace-nowrap">Need help choosing a camera or binoculars? <span className="font-bold">Chat with OpticMart</span></span>
                  <span className="underline whitespace-nowrap font-bold text-[#0284C7]">Contact us</span>
                </a>
              </div>
            ) : (
              <span key={currentAnnouncement} className="inline-block animate-fade-in whitespace-nowrap text-xs sm:text-sm h-full flex items-center text-[#0F172A]">
                {announcements[currentAnnouncement]}
              </span>
            )}
          </div>

          {/* Desktop Carousel Navigation Arrows */}
          <button
            onClick={() => handleAnnouncementNavigation('prev')}
            className="hidden sm:block absolute left-1/2 transform -translate-x-60 p-1 hover:bg-[#0F172A]/10 rounded-full transition-colors duration-200 z-10 text-[#0F172A]"
            aria-label="Previous announcement"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() => handleAnnouncementNavigation('next')}
            className="hidden sm:block absolute left-1/2 transform translate-x-56 p-1 hover:bg-[#0F172A]/10 rounded-full transition-colors duration-200 z-10 text-[#0F172A]"
            aria-label="Next announcement"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 2. Main Header - Precision Titanium Slate (#0F172A) */}
      <header
        ref={headerRef}
        suppressHydrationWarning={true}
        className={`w-full z-40 transition-all duration-300 ${isSticky
          ? 'fixed top-0 left-0 right-0 shadow-lg animate-slide-down'
          : 'relative'
          }`}
      >
        <div suppressHydrationWarning={true} className="bg-[#0F172A] text-white">
          <div suppressHydrationWarning={true} className="container mx-auto px-4 py-2 sm:py-2.5 lg:py-3">
            <div suppressHydrationWarning={true} className="flex items-center justify-between gap-4 sm:gap-6">
              
              {/* Logo - OpticMart SVG */}
              <Link href="/" className="flex items-center space-x-2 flex-shrink-0 text-white hover:opacity-90 transition-opacity py-1">
                <Image
                  src="/logosvg.svg"
                  alt="OpticMart Logo"
                  width={210}
                  height={42}
                  priority
                  className="w-44 sm:w-48 md:w-52 lg:w-56 h-auto text-white"
                />
              </Link>

              {/* Desktop Search Bar - Rounded-full Pill Shape */}
              <div suppressHydrationWarning={true} className="hidden lg:flex flex-1 max-w-xl mx-8">
                <div
                  suppressHydrationWarning={true}
                  onClick={() => setIsSearchOpen(true)}
                  className="w-full flex items-center bg-[#F8FAFC] text-[#0F172A] rounded-full px-4 py-2 cursor-pointer transition-all hover:bg-white hover:shadow-md border border-[#E2E8F0]"
                >
                  <input
                    type="text"
                    placeholder="Search cameras, binoculars, lenses, optics..."
                    className="flex-1 bg-transparent outline-none text-sm text-[#0F172A] placeholder-[#0F172A]/60 cursor-pointer font-medium"
                    readOnly
                  />
                  <Search className="h-4.5 w-4.5 text-[#0284C7]" />
                </div>
              </div>

              {/* Right Side Actions */}
              <div suppressHydrationWarning={true} className="flex items-center gap-3">
                {/* Mobile Search Icon - Visible when sticky or mobile */}
                {isSticky && (
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    className="lg:hidden text-white hover:text-[#38BDF8] p-2 transition-colors duration-200"
                    aria-label="Search cameras & binoculars"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}

                {/* Help / Contact Icon - Desktop */}
                <Link
                  href="/contact"
                  className="hidden sm:flex items-center gap-1 text-white hover:text-[#38BDF8] px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-colors duration-200 text-sm font-medium"
                  aria-label="Contact OpticMart"
                >
                  <Info className="h-4 w-4" />
                  <span>Support</span>
                </Link>

                {/* Shopping Cart Button */}
                <button
                  onClick={handleCartClick}
                  className="relative flex items-center justify-center p-2 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                  aria-label="Cart"
                >
                  <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
                  <ClientOnly>
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#0284C7] text-white text-xs rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center font-bold shadow-sm">
                        {cartCount}
                      </span>
                    )}
                  </ClientOnly>
                </button>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                  aria-label="Menu"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Search Bar - Visible only when NOT sticky */}
          {!isSticky && (
            <div suppressHydrationWarning={true} className="lg:hidden bg-[#0F172A] border-t border-white/10 px-4 py-2.5">
              <div
                suppressHydrationWarning={true}
                onClick={() => setIsSearchOpen(true)}
                className="w-full flex items-center bg-[#F8FAFC] text-[#0F172A] rounded-full px-3.5 py-1.5 cursor-pointer shadow-inner border border-[#E2E8F0]"
              >
                <input
                  type="text"
                  placeholder="Search cameras, binoculars, lenses..."
                  className="flex-1 bg-transparent outline-none text-xs sm:text-sm text-[#0F172A] placeholder-[#0F172A]/60 cursor-pointer"
                  readOnly
                />
                <Search className="h-4 w-4 text-[#0284C7]" />
              </div>
            </div>
          )}
        </div>

        {/* 3. Navigation Bar (Desktop) - Optics Blue Accent Bar with Dropdowns */}
        {!isCheckoutPage && (
          <div suppressHydrationWarning={true} className="hidden lg:block bg-[#0284C7] border-t border-white/10 shadow-sm relative z-30">
            <div suppressHydrationWarning={true} className="container mx-auto px-4">
              <nav className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-1 xl:space-x-2 flex-wrap">
                  {opticsNavigation.map((cat) => {
                    const isOpen = activeDropdown === cat.label;
                    return (
                      <div
                        key={cat.label}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(cat.label)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <Link
                          href={cat.href}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all duration-150 text-white hover:bg-white/15 focus-visible:outline-none ${isOpen ? 'bg-white/20 text-white shadow-inner' : ''}`}
                        >
                          <span>{cat.label}</span>
                          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#38BDF8]' : 'opacity-80'}`} />
                        </Link>

                        {/* Dropdown Menu Panel */}
                        {isOpen && (
                          <div
                            className="absolute left-0 top-full pt-1.5 z-50 w-64 animate-fade-in"
                            onMouseEnter={() => handleMouseEnter(cat.label)}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="bg-[#0F172A] text-white border border-white/15 rounded-xl shadow-2xl p-2.5 backdrop-blur-md">
                              <Link
                                href={cat.href}
                                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#0284C7] text-white font-semibold text-xs hover:bg-[#0369A1] transition-colors"
                              >
                                <span>Browse All {cat.label}</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                              </Link>
                              <div className="border-t border-white/10 my-1.5" />
                              <div className="flex flex-col space-y-0.5">
                                {cat.subcategories.map((sub) => (
                                  <Link
                                    key={sub.label}
                                    href={sub.href}
                                    className="px-3 py-1.5 rounded-lg text-xs text-slate-200 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-between group/sub"
                                  >
                                    <span>{sub.label}</span>
                                    <ChevronRight className="h-3 w-3 opacity-0 group-hover/sub:opacity-100 text-[#38BDF8] transition-opacity" />
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Right side quick links */}
                <div className="hidden xl:flex items-center space-x-3 text-xs font-semibold text-white/90">
                  <Link href="/#featured" className="hover:text-white transition-colors flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-full">
                    <span>⭐ Featured Optics</span>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden bg-[#F8FAFC] border-t border-[#0F172A]/10 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col font-heading text-sm space-y-1">
                <div className="text-xs uppercase font-bold text-gray-400 tracking-wider px-3 py-1">
                  Product Categories
                </div>

                {opticsNavigation.map((cat) => {
                  const isExpanded = expandedCategory === cat.label;
                  return (
                    <div key={cat.label} className="border-b border-gray-100 last:border-none">
                      <div className="flex items-center justify-between">
                        <Link
                          href={cat.href}
                          className="flex-1 py-2.5 px-3 text-[#0F172A] hover:bg-[#0284C7]/10 rounded-lg font-medium transition-colors text-sm"
                          onClick={handleMobileMenuClose}
                        >
                          {cat.label}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleMobileCategory(cat.label)}
                          className="p-2.5 text-[#0F172A]/70 hover:text-[#0284C7] rounded-lg"
                          aria-label={`Toggle ${cat.label} subcategories`}
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#0284C7]' : ''}`} />
                        </button>
                      </div>

                      {/* Subcategories Accordion */}
                      {isExpanded && (
                        <div className="pl-4 pr-2 pb-2 space-y-1 bg-gray-50/80 rounded-lg mb-1.5 border-l-2 border-[#0284C7]">
                          <Link
                            href={cat.href}
                            className="block py-1.5 px-2.5 text-xs font-semibold text-[#0284C7] hover:underline"
                            onClick={handleMobileMenuClose}
                          >
                            Browse All {cat.label} →
                          </Link>
                          {cat.subcategories.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="block py-1.5 px-2.5 text-xs text-gray-700 hover:text-[#0284C7] hover:bg-white rounded transition-colors"
                              onClick={handleMobileMenuClose}
                            >
                              {sub.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="border-t border-[#0F172A]/10 my-3 pt-2" />
                <div className="text-xs uppercase font-bold text-gray-400 tracking-wider px-3 py-1">
                  Customer Care
                </div>
                <Link href="/#featured" className="py-2 px-3 text-[#0F172A] hover:bg-[#0284C7]/10 rounded-lg font-medium transition-colors" onClick={handleMobileMenuClose}>
                  Featured Optics
                </Link>
                <Link href="/track" className="py-2 px-3 text-[#0F172A] hover:bg-[#0284C7]/10 rounded-lg font-medium transition-colors" onClick={handleMobileMenuClose}>
                  Track Order
                </Link>
                <Link href="/frequently-asked-questions" className="py-2 px-3 text-[#0F172A] hover:bg-[#0284C7]/10 rounded-lg font-medium transition-colors" onClick={handleMobileMenuClose}>
                  FAQs & Guides
                </Link>
                <Link href="/contact" className="py-2 px-3 text-[#0F172A] hover:bg-[#0284C7]/10 rounded-lg font-medium transition-colors" onClick={handleMobileMenuClose}>
                  Contact & Advisory
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* SearchBar overlay */}
        <SearchBar open={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      </header>

      {/* Mobile Swipeable Menu - Below header */}
      {!isCheckoutPage && (
        <div suppressHydrationWarning={true} className="lg:hidden bg-[#0284C7] border-t border-black/5 shadow-sm">
          <div suppressHydrationWarning={true} className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <nav className="flex min-w-max items-center gap-1.5 px-3 py-1.5">
              {opticsNavigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex-shrink-0 whitespace-nowrap rounded-full bg-white/10 hover:bg-white/25 px-3 py-1 text-xs font-medium text-white transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
