'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnHero, setIsOnHero] = useState(true);
  const [logoBounce, setLogoBounce] = useState(false);
  const wasOnHero = useRef(true);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const nowOnHero = scrollY < windowHeight * 0.7;

      setIsScrolled(scrollY > 20);
      setIsOnHero(nowOnHero);

      if (wasOnHero.current && !nowOnHero) {
        setLogoBounce(true);
        setTimeout(() => setLogoBounce(false), 600);
      }
      wasOnHero.current = nowOnHero;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioCategories = [
    { name: 'All Projects', href: '/projects' },
    { name: 'Residential', href: '/projects/residential' },
    { name: 'Commercial', href: '/projects/commercial' },
  ];

  const useTransparentStyle = isHomePage && isOnHero && !isScrolled;

  const navBackground = isScrolled
    ? 'bg-white/95 backdrop-blur-xl shadow-sm'
    : useTransparentStyle
    ? 'bg-transparent'
    : 'bg-white/95 backdrop-blur-xl';

  const textColor = useTransparentStyle ? 'text-white' : 'text-wood-700';
  const textHover = useTransparentStyle ? 'hover:text-white/70' : 'hover:text-wood-900';

  // Use single logo with CSS filter for white version on dark backgrounds
  const logoFilter = useTransparentStyle ? 'brightness(0) invert(1)' : 'none';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBackground}`}
    >
      <div className="lg:hidden">
        <div className="flex justify-center items-center pt-4 pb-3">
          <Link href="/" className="flex items-center">
            <div className={`relative h-14 sm:h-16 w-auto transition-all duration-500 ${logoBounce ? 'animate-logo-bounce' : ''}`}>
              <Image
                src="/logo-original.png"
                alt="VLanguret Design Build"
                width={500}
                height={150}
                className="h-full w-auto object-contain transition-all duration-500"
                style={{ filter: logoFilter }}
                priority
              />
            </div>
          </Link>
        </div>

        <div className={`mx-auto w-24 sm:w-32 h-px mb-3 transition-colors duration-300 ${useTransparentStyle ? 'bg-white/20' : 'bg-wood-200'}`} />

        <div className="flex justify-center items-center flex-wrap gap-x-4 gap-y-2 sm:gap-x-6 pb-4 px-4">
          <Link
            href="/about"
            className={`font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${textColor} ${textHover}`}
          >
            About
          </Link>

          <Link
            href="/projects"
            className={`font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Portfolio
          </Link>

          <Link
            href="/processes"
            className={`hidden sm:block font-sans text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Process
          </Link>

          <Link
            href="/services"
            className={`hidden md:block font-sans text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Services
          </Link>

          <Link
            href="/publications"
            className={`font-sans text-[10px] sm:text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Press
          </Link>

          <Link
            href="/schedule"
            className={`font-sans text-[9px] sm:text-[10px] font-semibold tracking-[0.1em] uppercase px-2.5 sm:px-3 py-1.5 sm:py-2 transition-all duration-300 whitespace-nowrap ${
              useTransparentStyle
                ? 'text-wood-900 bg-white hover:bg-white/90'
                : 'text-white bg-wood-800 hover:bg-wood-900'
            }`}
          >
            Start Project
          </Link>

          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/vlanguret/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/vlanguret.design.build/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/azucena-vidal-languret-0477ba41/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="flex justify-center items-center pt-6 pb-4">
          <Link href="/" className="flex items-center">
            <div className={`relative h-16 xl:h-20 w-auto transition-all duration-500 ${logoBounce ? 'animate-logo-bounce' : ''}`}>
              <Image
                src="/logo-original.png"
                alt="VLanguret Design Build"
                width={600}
                height={180}
                className="h-full w-auto object-contain transition-all duration-500"
                style={{ filter: logoFilter }}
                priority
              />
            </div>
          </Link>
        </div>

        <div className={`mx-auto w-32 h-px mb-4 transition-colors duration-300 ${useTransparentStyle ? 'bg-white/20' : 'bg-wood-200'}`} />

        <div className="flex justify-center items-center gap-8 xl:gap-10 pb-5">
          <Link
            href="/about"
            className={`font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
          >
            About
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setIsProjectsDropdownOpen(true)}
            onMouseLeave={() => setIsProjectsDropdownOpen(false)}
          >
            <Link
              href="/projects"
              className={`flex items-center gap-1.5 font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
            >
              Portfolio
              <svg
                className={`w-3 h-3 transition-transform duration-300 ${isProjectsDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            <div className="absolute top-full left-0 right-0 h-4" />
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                isProjectsDropdownOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
              }`}
            >
              <div className="w-52 bg-white/95 backdrop-blur-xl shadow-xl py-3 border border-wood-100/50">
                {portfolioCategories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="block px-5 py-2.5 text-[13px] font-normal text-wood-600 hover:text-wood-900 hover:bg-wood-50/50 transition-colors duration-200"
                    onClick={() => setIsProjectsDropdownOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/processes"
            className={`font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Process
          </Link>

          <Link
            href="/services"
            className={`font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Services
          </Link>

          <Link
            href="/testimonials"
            className={`font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Reviews
          </Link>

          <Link
            href="/publications"
            className={`font-sans text-[13px] font-normal tracking-wide transition-colors duration-300 ${textColor} ${textHover}`}
          >
            Publications
          </Link>

          <div className={`w-px h-5 transition-colors duration-300 ${useTransparentStyle ? 'bg-white/30' : 'bg-wood-200'}`} />

          <Link
            href="/schedule"
            className={`font-sans text-[12px] font-medium tracking-wider px-6 py-3 transition-all duration-300 ${
              useTransparentStyle
                ? 'text-white border border-white/40 hover:bg-white hover:text-wood-800'
                : 'text-wood-800 border border-wood-800 hover:bg-wood-800 hover:text-white'
            }`}
          >
            Start Your Project
          </Link>

          <div className={`w-px h-5 transition-colors duration-300 ${useTransparentStyle ? 'bg-white/30' : 'bg-wood-200'}`} />

          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/vlanguret/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="Instagram"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/vlanguret.design.build/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="Facebook"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/azucena-vidal-languret-0477ba41/"
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors duration-300 ${textColor} ${textHover}`}
              aria-label="LinkedIn"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
