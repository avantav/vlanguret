import { Metadata } from 'next';
import Layout from '@/components/Layout';
import TestimonialsGrid from '@/components/TestimonialsGrid';
import Breadcrumbs from '@/components/Breadcrumbs';
import Link from 'next/link';
import { getStaticTestimonials, TOTAL_GOOGLE_REVIEWS } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Testimonials | VLanguret Design Build LLC',
  description: 'Read testimonials from our satisfied clients. See what our customers say about our interior design and construction services in Tempe, Arizona.',
  keywords: 'testimonials, reviews, client feedback, interior design, construction, Tempe Arizona',
  openGraph: {
    title: 'Testimonials | VLanguret Design Build LLC',
    description: 'Read testimonials from our satisfied clients about our interior design and construction services.',
    url: 'https://vlanguret.com/testimonials',
  },
};

export default function TestimonialsPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Testimonials', href: '/testimonials' },
  ];

  // Get all testimonials
  const staticTestimonials = getStaticTestimonials();
  const formattedTestimonials = staticTestimonials.map((t, index) => ({
    id: index,
    clientName: t.clientName,
    content: t.content,
    rating: 5,
    date: t.date,
    photoCount: t.photoCount,
    photos: t.photos,
  }));

  return (
    <Layout>
      <div className="min-h-screen bg-wood-50">
        {/* Hero Section */}
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <div className="mt-8 mb-4">
              <p className="font-sans text-xs tracking-widest uppercase text-wood-600 mb-4">
                Client Testimonials
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-wood-800 leading-[1.1] mb-6">
                What Our Clients Say
              </h1>
              <p className="font-serif text-lg sm:text-xl lg:text-2xl text-wood-700 max-w-3xl leading-relaxed">
                We&apos;re proud to have a perfect 5-star rating on Google. Read what our satisfied customers have to say about working with VLanguret Design Build.
              </p>
            </div>
          </div>
        </section>

        {/* Press / As Seen On Section */}
        <section className="py-12 sm:py-16 bg-wood-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="font-sans text-xs tracking-widest uppercase text-wood-600 mb-4">
                As Seen On
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-wood-800">
                Featured In
              </h2>
            </div>

            {/* Press Logos - Placeholder for actual press mentions */}
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-60">
              {/* Placeholder logos - replace with actual press logos */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-12 bg-wood-200 flex items-center justify-center">
                  <span className="font-sans text-xs text-wood-500 uppercase tracking-wider">Press Logo</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-12 bg-wood-200 flex items-center justify-center">
                  <span className="font-sans text-xs text-wood-500 uppercase tracking-wider">Magazine</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-12 bg-wood-200 flex items-center justify-center">
                  <span className="font-sans text-xs text-wood-500 uppercase tracking-wider">Publication</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-12 bg-wood-200 flex items-center justify-center">
                  <span className="font-sans text-xs text-wood-500 uppercase tracking-wider">Feature</span>
                </div>
              </div>
            </div>

            <p className="text-center mt-8 font-serif text-sm text-wood-500 italic">
              Press mentions coming soon - contact us for media inquiries
            </p>
          </div>
        </section>

        {/* Google Reviews Highlight */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-wood-800 p-8 sm:p-12 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                {/* Google Logo */}
                <svg className="w-8 h-8" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="font-display text-xl text-white font-bold">Google Reviews</span>
              </div>

              {/* 5 Stars */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-display text-4xl sm:text-5xl font-bold text-white mb-2">5.0</p>
              <p className="font-serif text-lg text-wood-200 mb-6">
                Perfect rating based on {TOTAL_GOOGLE_REVIEWS}+ reviews
              </p>

              <a
                href="https://www.google.com/maps/place/VLanguret+Design+Build+LLC"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-wood-800 px-6 py-3 font-sans text-sm font-semibold tracking-wider uppercase hover:bg-wood-50 transition-colors duration-300"
              >
                Read All Reviews on Google
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* All Testimonials Grid */}
        <section className="py-12 sm:py-16 lg:py-20 bg-wood-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-wood-800 mb-4">
                Client Testimonials
              </h2>
              <p className="font-serif text-lg text-wood-600">
                Real feedback from real clients
              </p>
            </div>
            <TestimonialsGrid
              testimonials={formattedTestimonials}
              totalReviews={TOTAL_GOOGLE_REVIEWS}
            />
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 sm:py-24 bg-wood-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="font-serif text-xl sm:text-2xl text-wood-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join our satisfied clients and let us bring your design dreams to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group relative bg-white hover:bg-wood-50 text-wood-800 px-10 py-5 font-serif text-base font-semibold tracking-widest uppercase transition-all duration-500 inline-block overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-wood-800/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get a Quote
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/projects"
                className="border-2 border-white text-white hover:bg-white hover:text-wood-800 px-10 py-5 font-serif text-base font-semibold tracking-widest uppercase transition-all duration-300"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
