import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { client, queries, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { ProjectCategory, Project } from '@/types';
import { createMetadata } from '@/lib/metadata';

// ISR: Revalidar cada hora
export const revalidate = 3600;

interface PageProps {
  params: Promise<{
    category: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: categorySlug } = await params;

  // Obtener información de la categoría
  const categories: ProjectCategory[] = await client.fetch(queries.projectCategories);
  const category = categories.find((c: ProjectCategory) => {
    const slugValue = typeof c.slug === 'string' ? c.slug : c.slug.current;
    return slugValue === categorySlug;
  });

  if (!category) {
    return {
      title: 'Category Not Found | VLanguret Design Build LLC',
    };
  }

  // Usar imagen de categoría si está disponible
  const images = category.coverImage
    ? [urlFor(category.coverImage).width(1200).height(630).url()]
    : undefined;

  return createMetadata({
    title: `${category.name} Projects`,
    description: category.description || `Browse our ${category.name.toLowerCase()} projects. Professional interior design and construction by VLanguret Design Build in Tempe, Arizona.`,
    path: `/projects/${categorySlug}`,
    images,
  });
}

export default async function CategoryProjectsPage({ params }: PageProps) {
  const { category: categorySlug } = await params;

  // Obtener categoría y proyectos desde Sanity
  const categories: ProjectCategory[] = await client.fetch(queries.projectCategories);
  const category = categories.find((c: ProjectCategory) => {
    const slugValue = typeof c.slug === 'string' ? c.slug : c.slug.current;
    return slugValue === categorySlug;
  });

  if (!category) {
    notFound();
  }

  // Obtener proyectos de esta categoría
  const projects: Project[] = await client.fetch(queries.projectsByCategory, {
    categorySlug
  });

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: category.name, href: `/projects/${categorySlug}` },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section - Editorial */}
        <section className="py-20 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-12">
              {/* Left column - Label */}
              <div className="lg:col-span-3">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                  {category.name}
                </p>
              </div>

              {/* Right column - Content */}
              <div className="lg:col-span-9">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] mb-6">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="font-serif text-lg sm:text-xl text-wood-500 max-w-2xl leading-relaxed">
                    {category.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Grid - Refined */}
        <section className="bg-wood-50">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
              {projects.map((project: Project) => {
                const projectSlug = typeof project.slug === 'string'
                  ? project.slug
                  : project.slug.current;
                return (
                <Link
                  key={project._id}
                  href={`/projects/${categorySlug}/${projectSlug}`}
                  className="group relative aspect-[4/3] overflow-hidden"
                >
                  {project.mainImage && (
                    <Image
                      src={urlFor(project.mainImage).width(800).height(600).url()}
                      alt={project.title}
                      fill
                      className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  )}

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wood-900/60 via-wood-900/10 to-transparent" />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-wood-900/0 group-hover:bg-wood-900/40 transition-colors duration-500" />

                  {/* Text Overlay - Bottom Left */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    {project.year && (
                      <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2">
                        {project.year}
                      </p>
                    )}
                    <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-white leading-tight">
                      {project.title}
                    </h3>

                    {/* View Project CTA - appears on hover */}
                    <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/90">
                        View Project
                      </span>
                      <span className="w-6 h-px bg-white/60" />
                    </div>
                  </div>
                </Link>
                );
              })}
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 text-center">
              <p className="font-serif text-lg text-wood-500">
                No projects available in this category yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}
