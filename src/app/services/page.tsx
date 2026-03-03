import Layout from '@/components/Layout';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { createMetadata } from '@/lib/metadata';

// ISR: Revalidar cada hora
export const revalidate = 3600;

export const metadata = createMetadata({
  title: 'Services - VLanguret Design Build',
  description: 'Full-service interior design, construction, and commercial design services. From concept to completion, we bring your vision to life.',
  path: '/services',
});

const services = [
  {
    id: 'interior-design',
    title: 'Full Interior Design',
    subtitle: 'Complete Design Solutions',
    description: 'From concept to completion, our full-service interior design transforms your space into a reflection of your personal style. We handle everything from space planning and color selection to furniture procurement and final styling.',
    features: [
      'Initial consultation and space assessment',
      'Concept development and mood boards',
      '2D and 3D renderings',
      'Material and finish selections',
      'Furniture and accessory procurement',
      'Project management and installation',
    ],
    image: 'https://static.wixstatic.com/media/39b539_d9d75f68c3ba43e2a389edd20f79e5f1~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/39b539_d9d75f68c3ba43e2a389edd20f79e5f1~mv2.jpg',
  },
  {
    id: 'construction',
    title: 'Construction',
    subtitle: 'Quality Craftsmanship',
    description: 'As a licensed general contractor, we manage every aspect of your renovation or new construction project. Our experienced team ensures quality craftsmanship, timely completion, and transparent communication throughout the process.',
    features: [
      'Kitchen and bathroom renovations',
      'Whole-home remodels',
      'Room additions and expansions',
      'Custom cabinetry and millwork',
      'Flooring and tile installation',
      'Permit acquisition and inspections',
    ],
    image: 'https://static.wixstatic.com/media/39b539_2a4c5d9e8f7a4b3c9d1e2f3a4b5c6d7e~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/kitchen-remodel.jpg',
  },
  {
    id: 'commercial-design',
    title: 'Commercial Design',
    subtitle: 'Spaces That Inspire',
    description: 'We create inspiring commercial environments that enhance productivity, reflect your brand identity, and leave lasting impressions on clients and employees alike. From offices to retail spaces, we design for success.',
    features: [
      'Office and workspace design',
      'Retail and showroom environments',
      'Restaurant and hospitality spaces',
      'Brand-aligned interior concepts',
      'Space optimization and flow',
      'ADA compliance and accessibility',
    ],
    image: 'https://static.wixstatic.com/media/39b539_commercial_design~mv2.jpg/v1/fill/w_1200,h_800,al_c,q_85/commercial.jpg',
  },
];

export default function ServicesPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-wood-800 leading-[1.1] mb-4 sm:mb-6 mt-4 sm:mt-6">
              Our Services
            </h1>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-700 max-w-3xl leading-relaxed">
              Comprehensive design and construction services tailored to bring your vision to life.
              From initial concept to final installation, we&apos;re with you every step of the way.
            </p>
          </div>
        </section>

        {/* Services Sections */}
        {services.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className={`py-12 sm:py-20 lg:py-28 ${index % 2 === 0 ? 'bg-wood-50' : 'bg-white'}`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image */}
                <div className={`relative aspect-[4/3] overflow-hidden bg-wood-100 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-wood-200 to-wood-300 flex items-center justify-center">
                    <div className="text-center p-6 sm:p-8">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 text-wood-400 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="font-serif text-sm sm:text-base text-wood-500">Project Image</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-wood-600 mb-3 sm:mb-4">
                    {service.subtitle}
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-wood-800 leading-[1.1] mb-4 sm:mb-6">
                    {service.title}
                  </h2>
                  <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-700 leading-relaxed mb-6 sm:mb-8">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 sm:space-y-3 mb-8 sm:mb-10">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 sm:gap-3">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-wood-600 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-serif text-sm sm:text-base lg:text-lg text-wood-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/schedule"
                    className="group relative bg-wood-800 hover:bg-wood-900 text-white px-6 sm:px-8 py-3 sm:py-4 font-serif text-sm sm:text-base font-semibold tracking-widest uppercase transition-all duration-500 inline-block overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      Get Started
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Why Choose Us Section */}
        <section className="py-12 sm:py-20 lg:py-28 bg-wood-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <p className="font-sans text-[10px] sm:text-xs tracking-widest uppercase text-wood-400 mb-4 sm:mb-6">
                Why Choose Us
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
                The VLanguret Difference
              </h2>
              <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-200 max-w-2xl mx-auto leading-relaxed">
                What sets us apart is our commitment to excellence and our passion for creating spaces that truly reflect our clients.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {[
                {
                  title: 'Design + Build',
                  description: 'One team handling both design and construction ensures seamless execution and accountability.',
                  icon: (
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                },
                {
                  title: 'Personalized Approach',
                  description: 'Every project is unique. We take time to understand your lifestyle, preferences, and goals.',
                  icon: (
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  ),
                },
                {
                  title: 'Transparent Process',
                  description: 'Clear communication, detailed timelines, and no surprises. You\'re informed every step of the way.',
                  icon: (
                    <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-wood-700 text-wood-300 mb-4 sm:mb-6">
                    {item.icon}
                  </div>
                  <h3 className="font-display text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">
                    {item.title}
                  </h3>
                  <p className="font-serif text-sm sm:text-base lg:text-lg text-wood-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 lg:py-28 bg-wood-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-wood-800 leading-[1.1] mb-4 sm:mb-6">
              Let&apos;s Create Something Beautiful
            </h2>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-700 mb-8 sm:mb-10 leading-relaxed">
              Ready to transform your space? Schedule a complimentary consultation and let&apos;s discuss your project.
            </p>
            <Link
              href="/schedule"
              className="group relative bg-wood-800 hover:bg-wood-900 text-white px-8 sm:px-12 py-4 sm:py-5 font-serif text-sm sm:text-base font-semibold tracking-widest uppercase transition-all duration-500 inline-block overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Schedule Consultation
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
}
