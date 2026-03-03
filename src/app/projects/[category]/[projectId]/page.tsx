import type { Metadata } from 'next';
import Layout from '@/components/Layout';
import ProjectGallery from '@/components/ProjectGallery';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import { client, queries, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { Project } from '@/types';
import { createProjectMetadata } from '@/lib/metadata';

export const runtime = 'edge';

// ISR: Revalidar cada hora
export const revalidate = 3600;

interface ProjectDetailPageProps {
  params: Promise<{
    category: string;
    projectId: string;
  }>;
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { category: categorySlug, projectId } = await params;

  // Obtener el proyecto desde Sanity
  const project: Project = await client.fetch(queries.project, { slug: projectId });

  if (!project) {
    return {
      title: 'Project Not Found | VLanguret Design Build LLC',
    };
  }

  // Preparar imágenes para metadata (rectangular y cuadrada para WhatsApp)
  const images = project.mainImage
    ? [
        urlFor(project.mainImage).width(1200).height(630).url(),
        urlFor(project.mainImage).width(1200).height(1200).url(),
      ]
    : undefined;

  return createProjectMetadata({
    title: project.title,
    description: project.description || `${project.title} - Professional interior design and construction project by VLanguret Design Build LLC.`,
    images,
    category: project.category?.name || categorySlug,
    publishedTime: project.publishedAt,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { category: categorySlug, projectId } = await params;

  // Obtener el proyecto desde Sanity
  const project: Project | null = await client.fetch(queries.project, { slug: projectId });

  if (!project) {
    notFound();
  }

  // Obtener categoría para breadcrumbs y título
  const categoryName = project.category?.name || categorySlug;

  // Procesar galería de imágenes
  const galleryUrls = (project.gallery || []).map((image: { asset: { _ref: string; url: string }; alt?: string }) =>
    urlFor(image).width(1200).height(900).url()
  );

  // Obtener proyectos relacionados de la misma categoría
  const relatedProjects: Project[] = await client.fetch(queries.projectsByCategory, {
    categorySlug
  });
  const filteredRelatedProjects = relatedProjects
    .filter((p: Project) => p._id !== project._id)
    .slice(0, 3);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: categoryName, href: `/projects/${categorySlug}` },
    { label: project.title, href: `/projects/${categorySlug}/${projectId}` },
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mt-12">
              {/* Left column - Label */}
              <div className="lg:col-span-3">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                  {categoryName}
                </p>
              </div>

              {/* Right column - Content */}
              <div className="lg:col-span-9">
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-wood-800 leading-[1.1] mb-6">
                  {project.title}
                </h1>

                {project.description && (
                  <p className="font-serif text-lg sm:text-xl text-wood-500 max-w-2xl leading-relaxed mb-8">
                    {project.description}
                  </p>
                )}

                {/* Project Details */}
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  {project.year && (
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-wood-400 block mb-1">Year</span>
                      <span className="font-serif text-wood-700">{project.year}</span>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <span className="font-sans text-[10px] tracking-[0.15em] uppercase text-wood-400 block mb-1">Location</span>
                      <span className="font-serif text-wood-700">{project.location}</span>
                    </div>
                  )}
                </div>

                {/* Key Features */}
                {project.features && project.features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-4">
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {project.features.map((feature: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center font-serif text-wood-600"
                        >
                          <span className="w-1 h-1 bg-wood-400 rounded-full mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/schedule"
                    className="group inline-flex items-center gap-3 bg-wood-800 hover:bg-wood-900 text-white px-8 py-4 font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300"
                  >
                    Start Your Project
                    <svg
                      className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <Link
                    href={`/projects/${categorySlug}`}
                    className="group inline-flex items-center gap-3 border border-wood-300 text-wood-800 hover:bg-wood-50 px-8 py-4 font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300"
                  >
                    View More Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Hero Image - Full Width */}
        {project.mainImage && (
          <section className="bg-white">
            <div className="w-full">
              <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
                <Image
                  src={urlFor(project.mainImage).width(2400).height(1028).url()}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  priority
                  sizes="100vw"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-wood-900/20 via-transparent to-wood-900/10 pointer-events-none" />
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {galleryUrls.length > 0 && (
          <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
                <div className="lg:col-span-3">
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                    Gallery
                  </p>
                </div>
                <div className="lg:col-span-9">
                  <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-wood-800">
                    Project Gallery
                  </h2>
                </div>
              </div>
            </div>

            <div className="w-full px-6 sm:px-8 lg:px-12">
              <ProjectGallery images={galleryUrls} title={project.title} />
            </div>
          </section>
        )}

        {/* Related Projects */}
        {filteredRelatedProjects.length > 0 && (
          <section className="py-20 sm:py-24 lg:py-32 bg-wood-50">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
              {/* Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 sm:mb-20">
                <div className="lg:col-span-3">
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                    Related Work
                  </p>
                </div>
                <div className="lg:col-span-9">
                  <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-wood-800 leading-[1.15]">
                    More {categoryName}{' '}
                    <span className="italic font-normal text-wood-600">Projects</span>
                  </h2>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {filteredRelatedProjects.map((relatedProject) => {
                  const projectSlug = typeof relatedProject.slug === 'string'
                    ? relatedProject.slug
                    : relatedProject.slug.current;
                  return (
                  <Link
                    key={relatedProject._id}
                    href={`/projects/${categorySlug}/${projectSlug}`}
                    className="group relative aspect-[4/3] overflow-hidden"
                  >
                    {relatedProject.mainImage && (
                      <Image
                        src={urlFor(relatedProject.mainImage).width(800).height(600).url()}
                        alt={relatedProject.title}
                        fill
                        className="object-cover object-center transition-all duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}

                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-wood-900/60 via-wood-900/10 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-wood-900/0 group-hover:bg-wood-900/40 transition-colors duration-500" />

                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                      <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-white leading-tight mb-2">
                        {relatedProject.title}
                      </h3>

                      {/* View Project CTA */}
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
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
