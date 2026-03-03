import Link from 'next/link';
import Image from 'next/image';
import { publications } from './AsSeenInSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-wood-50 border-t border-wood-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block">
              <div className="relative h-20 sm:h-24 w-auto">
                <Image
                  src="/footer.png"
                  alt="VLanguret Design Build LLC"
                  width={320}
                  height={96}
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>

            <div>
              <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-4">
                Stay Inspired
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 min-w-0 px-4 py-3 border border-wood-200 bg-white text-wood-800 placeholder-wood-400 focus:outline-none focus:border-wood-400 font-sans text-sm transition-colors"
                />
                <button
                  type="submit"
                  className="bg-wood-800 hover:bg-wood-900 text-white px-6 py-3 font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 flex-shrink-0"
                >
                  Send
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-4">
                  Arizona Office
                </p>
                <div className="space-y-3 font-serif text-base text-wood-600">
                  <p>
                    2211 S 48th St Suite H<br />
                    Tempe, AZ 85282
                  </p>
                  <a
                    href="mailto:info@vlanguret.com"
                    className="block hover:text-wood-800 transition-colors duration-200"
                  >
                    info@vlanguret.com
                  </a>
                  <a
                    href="tel:+14804664693"
                    className="block hover:text-wood-800 transition-colors duration-200"
                  >
                    480 466 4693
                  </a>
                  <a
                    href="tel:+14804954660"
                    className="block hover:text-wood-800 transition-colors duration-200"
                  >
                    480 495 4660
                  </a>
                  <p className="text-wood-400 text-sm pt-2">
                    ROC 335633 &nbsp;·&nbsp; ROC 335636
                  </p>
                </div>
              </div>

              <div>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-4">
                  Mexico Office
                </p>
                <div className="space-y-3 font-serif text-base text-wood-600">
                  <p>
                    Tamaulipas #80, 83010<br />
                    Hermosillo, Sonora
                  </p>
                  <a
                    href="tel:+526622146692"
                    className="block hover:text-wood-800 transition-colors duration-200"
                  >
                    +52 662 214 6692
                  </a>
                </div>
              </div>

              <div>
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-4">
                  Explore
                </p>
                <nav className="space-y-3">
                  {[
                    { label: 'Our Projects', href: '/projects' },
                    { label: 'About Us', href: '/about' },
                    { label: 'Our Process', href: '/processes' },
                    { label: 'Testimonials', href: '/testimonials' },
                    { label: 'Publications', href: '/publications' },
                    { label: 'Schedule Consultation', href: '/schedule' },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block font-serif text-base text-wood-600 hover:text-wood-800 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {publications.length > 0 && (
          <div className="mt-12 sm:mt-16 pt-8 border-t border-wood-100">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-wood-400">
                As Seen In
              </p>
              <div className="flex items-center gap-6">
                {publications.map((pub) => (
                  pub.url ? (
                    <a
                      key={pub.name}
                      href={pub.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block opacity-60 hover:opacity-100 transition-opacity duration-300"
                      title={pub.name}
                    >
                      <Image
                        src={pub.logo}
                        alt={pub.name}
                        width={120}
                        height={45}
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </a>
                  ) : (
                    <div key={pub.name} className="opacity-60">
                      <Image
                        src={pub.logo}
                        alt={pub.name}
                        width={120}
                        height={45}
                        className="h-6 sm:h-7 w-auto object-contain"
                      />
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 sm:mt-10 pt-8 border-t border-wood-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-wood-400">
            © {currentYear} VLanguret Design Build
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/vlanguret/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wood-400 hover:text-wood-600 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/vlanguret.design.build/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wood-400 hover:text-wood-600 transition-colors duration-200"
              aria-label="Follow us on Facebook"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/azucena-vidal-languret-0477ba41/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-wood-400 hover:text-wood-600 transition-colors duration-200"
              aria-label="Connect on LinkedIn"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
