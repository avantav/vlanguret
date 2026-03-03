import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9h69oymm',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource | null | undefined) {
  if (!source) {
    // Retornar un objeto con métodos que devuelvan strings vacíos si source es null/undefined
    return {
      url: () => '',
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
      height: () => ({ width: () => ({ url: () => '' }), url: () => '' }),
    };
  }
  return builder.image(source);
}

// GROQ Queries
export const queries = {
  // Project Categories
  projectCategories: `*[_type == "projectCategory"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    coverImage,
    order
  }`,

  // All Projects
  projects: `*[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage,
    gallery,
    videos,
    featured,
    order,
    publishedAt
  }`,

  // Featured Projects
  featuredProjects: `*[_type == "project" && featured == true] | order(publishedAt desc) [0...6] {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage,
    featured,
    publishedAt
  }`,

  // Projects by Category
  projectsByCategory: `*[_type == "project" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage,
    gallery,
    videos,
    featured,
    order,
    publishedAt
  }`,

  // Single Project
  project: `*[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category->{
      _id,
      name,
      slug
    },
    description,
    mainImage,
    gallery,
    videos,
    featured,
    order,
    publishedAt
  }`,

  // Testimonials
  testimonials: `*[_type == "testimonial"] | order(order asc) {
    _id,
    clientName,
    content,
    projectImage,
    rating,
    order
  }`,

  // Team Members
  teamMembers: `*[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo,
    order
  }`,
};
