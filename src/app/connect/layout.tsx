import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connect with VLanguret | Book a Consultation',
  description: 'Schedule a consultation with VLanguret for luxury interior design and remodeling services in Arizona. Call (480) 466-4693 or message us on WhatsApp.',
  keywords: [
    'VLanguret contact',
    'interior design consultation',
    'luxury remodeling Arizona',
    'Tempe interior designer',
    'home renovation consultation',
    'custom kitchen design Arizona',
    'bathroom remodel Tempe',
    'luxury home design',
    'Arizona interior design',
    'schedule design consultation',
  ],
  openGraph: {
    title: 'Connect with VLanguret | Luxury Interior Design',
    description: 'Schedule a consultation for premium interior design and remodeling services. Transform your home into a masterpiece.',
    url: 'https://vlanguret.com/connect',
    siteName: 'VLanguret',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Connect with VLanguret',
    description: 'Schedule a consultation for luxury interior design and remodeling services in Arizona.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://vlanguret.com/connect',
    languages: {
      'en-US': 'https://vlanguret.com/connect',
      'es-MX': 'https://vlanguret.com/connect',
    },
  },
};

export default function ConnectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Connect with VLanguret',
            description: 'Schedule a consultation with VLanguret for luxury interior design and remodeling services.',
            url: 'https://vlanguret.com/connect',
            mainEntity: {
              '@type': 'LocalBusiness',
              name: 'VLanguret',
              description: 'Luxury Interior Design & Remodeling',
              telephone: '+1-480-466-4693',
              email: 'info@vlanguret.com',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2211 S 48th St Suite H',
                addressLocality: 'Tempe',
                addressRegion: 'AZ',
                postalCode: '85282',
                addressCountry: 'US',
              },
              sameAs: [
                'https://www.instagram.com/vlanguret/',
                'https://www.tiktok.com/@vlanguret',
              ],
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                  opens: '09:00',
                  closes: '17:00',
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Saturday',
                  opens: '10:00',
                  closes: '14:00',
                },
              ],
            },
          }),
        }}
      />
      {children}
    </>
  );
}
