import Layout from '@/components/Layout';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Get a Quote',
  description: 'To receive a quote, please fill in the form below and we will get back to you as soon as possible. We look forward to working with you! Call 480-466-4693 - Tempe, Arizona.',
  path: '/contact',
});

export default function ContactPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        </section>

        <section className="pb-16 sm:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
              <div>
                <div className="mb-12">
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-800 mb-6">
                    Get a Quote
                  </h2>
                  <p className="font-serif text-lg sm:text-xl text-wood-700 leading-relaxed font-medium">
                    To receive a quote, please fill in the form below and we will get back to you as soon as possible. 
                    We look forward to working with you!
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="firstName" className="block font-sans text-sm font-semibold text-wood-800 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 min-h-touch border border-wood-300 focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-colors duration-200 font-sans font-medium"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block font-sans text-sm font-semibold text-wood-800 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 min-h-touch border border-wood-300 focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-colors duration-200 font-sans font-medium"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-sans text-sm font-semibold text-wood-800 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 min-h-touch border border-wood-300 focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-colors duration-200 font-sans font-medium"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-sans text-sm font-semibold text-wood-800 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 min-h-touch border border-wood-300 focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-colors duration-200 font-sans font-medium"
                      placeholder="(480) 123-4567"
                    />
                  </div>

                  <div>
                    <label htmlFor="comments" className="block font-sans text-sm font-semibold text-wood-800 mb-2">
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      name="comments"
                      rows={6}
                      className="w-full px-4 py-3 border border-wood-300 focus:ring-2 focus:ring-wood-500 focus:border-transparent transition-colors duration-200 resize-vertical font-sans font-medium"
                      placeholder="Tell us about your project, timeline, budget, or any specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group relative w-full bg-wood-800 hover:bg-wood-900 text-white px-8 py-4 font-serif text-sm font-bold tracking-widest uppercase transition-all duration-500 inline-block overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Submit Request
                      <svg 
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                </form>
              </div>

              <div>
                <div className="mb-12">
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-wood-800 mb-6">
                    Contact Information
                  </h2>
                </div>

                <div className="space-y-10">
                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-wood-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-2">
                        Location
                      </h3>
                      <p className="font-serif text-lg text-wood-700 font-medium">
                        2211 S 48th St Suite H<br />
                        Tempe, AZ 85282
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-wood-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:info@vlanguret.com"
                        className="font-serif text-lg text-wood-700 hover:text-wood-600 transition-colors duration-200 font-medium"
                      >
                        info@vlanguret.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-wood-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+14804664693"
                        className="block font-serif text-lg text-wood-700 hover:text-wood-600 transition-colors duration-200 font-medium"
                      >
                        480-466-4693
                      </a>
                      <a
                        href="tel:+14804954660"
                        className="block font-serif text-lg text-wood-700 hover:text-wood-600 transition-colors duration-200 font-medium"
                      >
                        480-495-4660
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-wood-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-2">
                        ROC License
                      </h3>
                      <p className="font-serif text-lg text-wood-700 font-medium">
                        ROC 335633, ROC 335636
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-wood-100 flex items-center justify-center">
                        <svg className="w-6 h-6 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-2">
                        Mexico Office
                      </h3>
                      <p className="font-serif text-lg text-wood-700 font-medium">
                        Tamaulipas #80, 83010<br />
                        Hermosillo, Sonora
                      </p>
                      <a
                        href="tel:+526622146692"
                        className="block font-serif text-lg text-wood-700 hover:text-wood-600 transition-colors duration-200 font-medium mt-1"
                      >
                        +52 662 214 6692
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-wood-50 border border-wood-200">
                    <p className="font-serif text-base text-wood-600 italic">
                      We offer design and construction services throughout the United States and Mexico.
                    </p>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-wood-200">
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-wood-800 mb-6">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.instagram.com/vlanguret/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-16 h-16 bg-wood-800 hover:bg-wood-900 text-white transition-all duration-300 transform hover:scale-105"
                      aria-label="Follow us on Instagram"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    <a
                      href="https://www.tiktok.com/@vlanguret"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-16 h-16 bg-wood-800 hover:bg-wood-900 text-white transition-all duration-300 transform hover:scale-105"
                      aria-label="Follow us on TikTok"
                    >
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
