import type { Metadata } from 'next';

export const siteConfig = {
  name: 'VLanguret Design Build LLC',
  title: 'VLanguret Design Build LLC - Luxury Interior Design & Remodeling in Tempe, AZ',
  description: 'Transform your home with VLanguret Design Build. Expert kitchen & bathroom remodeling, custom cabinets, countertops, and flooring. ROC licensed contractor serving Tempe, Phoenix, Scottsdale & Mesa. 15+ years experience, 5-star Google reviews.',
  url: 'https://vlanguret.com',
  ogImage: 'https://vlanguret.com/opengraph.jpg',
  ogImageSquare: 'https://vlanguret.com/opengraph-square.jpg',
  creator: 'Azucena Vidal Languret',
  phone: '+1-480-466-4693',
  email: 'info@vlanguret.com',
  address: {
    street: '2211 S 48th St Suite H',
    city: 'Tempe',
    state: 'AZ',
    zip: '85282',
    country: 'US',
  },
  keywords: [
    'interior design Tempe',
    'kitchen remodeling Tempe AZ',
    'bathroom renovation Arizona',
    'design build contractor',
    'remodeling contractor Phoenix',
    'home renovation Scottsdale',
    'kitchen cabinets Mesa AZ',
    'bathroom remodel Chandler',
    'custom kitchen cabinets',
    'granite countertops installation',
    'flooring installation Arizona',
    'luxury home remodeling',
    'full service design build',
    'ROC licensed contractor Arizona',
    '5 star rated contractor',
    'residential construction Tempe AZ',
  ],
};

export function createMetadata({
  title,
  description,
  path = '',
  images,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  const ogImages = images
    ? images.map((imageUrl, index) => ({
        url: imageUrl.startsWith('http') ? imageUrl : `${siteConfig.url}${imageUrl}`,
        secureUrl: imageUrl.startsWith('https') ? imageUrl : imageUrl.startsWith('http') ? undefined : `${siteConfig.url}${imageUrl}`,
        width: index === 0 ? 1200 : 1200,
        height: index === 0 ? 630 : 1200,
        alt: title || siteConfig.name,
        type: 'image/jpeg',
      }))
    : [
        {
          url: siteConfig.ogImage,
          secureUrl: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
          type: 'image/jpeg',
        },
      ];

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: siteConfig.keywords.join(', '),
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    metadataBase: new URL(siteConfig.url),
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url,
      title: title || siteConfig.title,
      description: pageDescription,
      siteName: siteConfig.name,
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || siteConfig.title,
      description: pageDescription,
      images: ogImages.map((img) => img.url),
      creator: '@vlanguret',
      site: '@vlanguret',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    other: {
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      'format-detection': 'telephone=no',
    },
  };
}

export function createProjectMetadata({
  title,
  description,
  images,
  category,
  publishedTime,
}: {
  title: string;
  description: string;
  images?: string[];
  category?: string;
  publishedTime?: string;
}): Metadata {
  const path = `/projects/${category}/${title.toLowerCase().replace(/\s+/g, '-')}`;
  const metadata = createMetadata({
    title,
    description,
    path,
    images: images,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      authors: [siteConfig.creator],
      section: category,
    },
  };
}
