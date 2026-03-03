interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ProjectData {
  title: string;
  description?: string;
  year?: string;
  location?: string;
  mainImage?: string;
  url?: string;
}

interface StructuredDataProps {
  type: 'Organization' | 'LocalBusiness' | 'WebSite' | 'BreadcrumbList' | 'Project';
  data: BreadcrumbItem[] | ProjectData | Record<string, unknown>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseUrl = 'https://vlanguret.com';
    
    switch (type) {
      case 'Organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'VLanguret Design Build LLC',
          url: baseUrl,
          logo: `${baseUrl}/logo-original.png`,
          image: `${baseUrl}/opengraph.jpg`,
          description: 'Professional interior design and construction services in Tempe, Arizona. Full-service design build contractor with over 15 years of experience. Kitchen and bathroom remodeling, custom cabinets, countertops, and flooring.',
          foundingDate: '2009',
          founder: {
            '@type': 'Person',
            name: 'Azucena Vidal Languret'
          },
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2211 S 48th St Suite H',
            addressLocality: 'Tempe',
            addressRegion: 'Arizona',
            postalCode: '85282',
            addressCountry: 'US'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-480-466-4693',
            contactType: 'customer service',
            email: 'info@vlanguret.com',
            areaServed: ['Tempe', 'Phoenix', 'Scottsdale', 'Mesa', 'Chandler', 'Gilbert'],
            availableLanguage: ['English', 'Spanish']
          },
          sameAs: [
            'https://www.instagram.com/vlanguret/',
            'https://www.tiktok.com/@vlanguret',
            'https://maps.app.goo.gl/k9wD8pbWQ7HQD2vM8'
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '20',
            reviewCount: '20'
          }
        };

      case 'LocalBusiness':
        return {
          '@context': 'https://schema.org',
          '@type': ['LocalBusiness', 'HomeAndConstructionBusiness', 'GeneralContractor'],
          '@id': `${baseUrl}/#localbusiness`,
          name: 'VLanguret Design Build LLC',
          description: 'Professional interior design and construction services in Tempe, Arizona. Expert kitchen & bathroom remodeling, custom cabinets, countertops, and flooring. ROC licensed contractor.',
          url: baseUrl,
          telephone: '+1-480-466-4693',
          email: 'info@vlanguret.com',
          image: `${baseUrl}/opengraph.jpg`,
          logo: `${baseUrl}/logo-original.png`,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '2211 S 48th St Suite H',
            addressLocality: 'Tempe',
            addressRegion: 'AZ',
            postalCode: '85282',
            addressCountry: 'US'
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: '33.3884',
            longitude: '-111.9066'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
              opens: '08:00',
              closes: '17:00'
            }
          ],
          priceRange: '$$$',
          currenciesAccepted: 'USD',
          paymentAccepted: 'Cash, Credit Card, Check',
          areaServed: [
            { '@type': 'City', name: 'Tempe', '@id': 'https://www.wikidata.org/wiki/Q79556' },
            { '@type': 'City', name: 'Phoenix' },
            { '@type': 'City', name: 'Scottsdale' },
            { '@type': 'City', name: 'Mesa' },
            { '@type': 'City', name: 'Chandler' },
            { '@type': 'City', name: 'Gilbert' }
          ],
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '5.0',
            bestRating: '5',
            worstRating: '1',
            ratingCount: '20',
            reviewCount: '20'
          },
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Interior Design and Construction Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Kitchen Remodeling',
                  description: 'Complete kitchen design, custom cabinets, countertops, and installation'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Bathroom Renovation',
                  description: 'Luxury bathroom design, tile work, vanities, and fixtures'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Custom Cabinets',
                  description: 'Custom cabinet design and installation for kitchens, bathrooms, and more'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Countertop Installation',
                  description: 'Granite, quartz, and marble countertop fabrication and installation'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Flooring Installation',
                  description: 'Hardwood, tile, LVP, and carpet flooring installation'
                }
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Interior Design',
                  description: 'Full-service interior design for residential and commercial spaces'
                }
              }
            ]
          }
        };

      case 'WebSite':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'VLanguret Design Build LLC',
          url: baseUrl,
          description: 'Professional interior design and construction services in Tempe, Arizona.',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/projects?search={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        };

      case 'BreadcrumbList':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: (data as BreadcrumbItem[]).map((item: BreadcrumbItem, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
          }))
        };

      case 'Project':
        const projectData = data as ProjectData;
        return {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: projectData.title,
          description: projectData.description,
          creator: {
            '@type': 'Organization',
            name: 'VLanguret Design Build LLC'
          },
          dateCreated: projectData.year,
          locationCreated: {
            '@type': 'Place',
            name: projectData.location || 'Tempe, Arizona'
          },
          image: projectData.mainImage,
          url: projectData.url
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
};

export default StructuredData;
