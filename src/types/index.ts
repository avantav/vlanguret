export interface ProjectCategory {
  _id: string;
  name: string;
  slug: string | { current: string };
  description?: string;
  coverImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string | { current: string };
  category: ProjectCategory;
  description?: string;
  mainImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  gallery?: Array<{
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  }>;
  videos?: string[];
  featured: boolean;
  order: number;
  publishedAt: string;
  year?: string;
  location?: string;
  features?: string[];
}

export interface Testimonial {
  _id: string;
  clientName: string;
  content: string;
  projectImage?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  rating?: number;
  date?: string;
  photoCount?: number;
  order: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  bio?: string;
  photo?: {
    asset: {
      _ref: string;
      url: string;
    };
    alt?: string;
  };
  order: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  roc: string[];
  socialMedia: {
    instagram: string;
    tiktok?: string;
  };
}
