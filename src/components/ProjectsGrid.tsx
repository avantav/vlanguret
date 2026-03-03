import Image from 'next/image';
import Link from 'next/link';
import { client, queries, urlFor } from '@/lib/sanity';
import { Project } from '@/types';

const ProjectsGrid = async () => {
  // Obtener proyectos destacados desde Sanity (máximo 6)
  let projects: Project[] = [];

  try {
    projects = await client.fetch(queries.featuredProjects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return null; // No mostrar nada si hay error
  }

  // Si no hay proyectos, no mostrar nada
  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20">
          {/* Left column - Label */}
          <div className="lg:col-span-3">
            <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
              Featured Work
            </p>
          </div>

          {/* Right column - Heading */}
          <div className="lg:col-span-9">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-wood-800 leading-[1.15] max-w-2xl">
              Spaces designed for{' '}
              <span className="italic font-normal text-wood-600">how you live</span>.
            </h2>
          </div>
        </div>
      </div>

      {/* Full-width grid with small gaps */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {projects.map((project: Project) => {
          // Obtener slug de categoría
          const categorySlugValue = typeof project.category?.slug === 'string'
            ? project.category.slug
            : project.category?.slug?.current || 'residential';
          const categoryName = project.category?.name || 'Residential';
          const projectSlug = typeof project.slug === 'string'
            ? project.slug
            : project.slug.current;

          return (
            <Link
              key={project._id}
              href={`/projects/${categorySlugValue}/${projectSlug}`}
              className="group relative aspect-[4/3] overflow-hidden"
            >
              {project.mainImage && (
                <Image
                  src={urlFor(project.mainImage).width(800).height(600).url()}
                  alt={project.title}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-wood-900/60 via-wood-900/10 to-transparent" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-wood-900/0 group-hover:bg-wood-900/40 transition-colors duration-500" />

              {/* Text Overlay - Bottom Left */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2 transition-colors duration-300 group-hover:text-white/90">
                  {categoryName}
                </p>
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

      {/* View All Projects Button - Minimal */}
      <div className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex justify-center">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 font-sans text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-wood-800 hover:text-wood-600 transition-colors duration-300"
            >
              View All Projects
              <span className="w-8 h-px bg-wood-400 transition-all duration-300 group-hover:w-12 group-hover:bg-wood-600" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
