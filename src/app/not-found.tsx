import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | VLanguret Design Build',
  description: 'The page you are looking for could not be found. Return to VLanguret Design Build to explore our luxury interior design and remodeling services.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] flex flex-col">
      {/* Header with Logo */}
      <header className="py-8 px-6 sm:px-8 lg:px-12">
        <Link href="/" className="inline-block">
          <Image
            src="/logo-original.png"
            alt="VLanguret Design Build"
            width={200}
            height={60}
            className="h-12 sm:h-14 w-auto"
            priority
          />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 sm:px-8 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <span className="font-display text-[120px] sm:text-[180px] lg:text-[220px] font-light text-wood-200 leading-none select-none">
              404
            </span>
          </div>

          {/* Message */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-wood-800 mb-4">
            Page Not Found
          </h1>
          <p className="font-serif text-lg sm:text-xl text-wood-500 mb-10 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let us help you find your way back.
          </p>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-wood-800 text-white font-sans text-sm font-medium tracking-wider uppercase hover:bg-wood-900 transition-colors duration-300"
            >
              Return Home
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-wood-300 text-wood-700 font-sans text-sm font-medium tracking-wider uppercase hover:border-wood-500 hover:text-wood-900 transition-colors duration-300"
            >
              View Portfolio
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-wood-100">
            <p className="font-sans text-xs tracking-[0.2em] uppercase text-wood-400 mb-6">
              Popular Pages
            </p>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Process', href: '/processes' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Contact', href: '/schedule' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-serif text-base text-wood-500 hover:text-wood-800 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 sm:px-8 lg:px-12 text-center">
        <p className="font-sans text-xs tracking-wider text-wood-400">
          Need help? Contact us at{' '}
          <a
            href="mailto:info@vlanguret.com"
            className="text-wood-600 hover:text-wood-800 transition-colors"
          >
            info@vlanguret.com
          </a>
          {' '}or call{' '}
          <a
            href="tel:+14804664693"
            className="text-wood-600 hover:text-wood-800 transition-colors"
          >
            (480) 466-4693
          </a>
        </p>
      </footer>
    </div>
  );
}
