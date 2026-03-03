import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import { client, queries, urlFor } from '@/lib/sanity';
import { ProjectCategory, Project } from '@/types';
import { createMetadata } from '@/lib/metadata';

// ISR: Revalidar cada hora
export const revalidate = 3600;

export const metadata = createMetadata({
  title: 'Gallery',
  description: 'Explore our portfolio of interior design and construction projects. From residential to commercial spaces, see how we bring your vision to life.',
  path: '/projects',
});

export default async function ProjectsPage() {
  // Obtener categorías desde Sanity
  const categories: ProjectCategory[] = await client.fetch(queries.projectCategories);

  // Para cada categoría, obtener el conteo de proyectos
  const categoriesWithCounts = await Promise.all(
    categories.map(async (category: ProjectCategory) => {
      const categorySlug = typeof category.slug === 'string' ? category.slug : category.slug.current;
      const projects: Project[] = await client.fetch(queries.projectsByCategory, {
        categorySlug
      });
      return {
        ...category,
        projectCount: projects.length,
      };
    })
  );
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section - Editorial */}
        <section className="py-20 sm:py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              {/* Left column - Label */}
              <div className="lg:col-span-3">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                  Portfolio
                </p>
              </div>

              {/* Right column - Content */}
              <div className="lg:col-span-9">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1] mb-6">
                  Our Projects
                </h1>
                <p className="font-serif text-lg sm:text-xl text-wood-500 max-w-2xl leading-relaxed">
                  Explore our portfolio of interior design and construction projects.
                  From residential to commercial spaces, see how we bring your vision to life.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories Grid - Refined */}
        <section className="bg-wood-50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {categoriesWithCounts
              .filter((category: ProjectCategory & { projectCount: number }) => category.projectCount > 0)
              .map((category: ProjectCategory & { projectCount: number }) => {
                const categorySlug = typeof category.slug === 'string' ? category.slug : category.slug.current;
                return (
              <Link
                key={category._id}
                href={`/projects/${categorySlug}`}
                className="group relative aspect-[4/3] overflow-hidden"
              >
                {category.coverImage && (
                  <Image
                    src={urlFor(category.coverImage).width(800).height(600).url()}
                    alt={`${category.name} projects`}
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
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-tight mb-2">
                    {category.name}
                  </h3>
                  <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/70">
                    {category.projectCount} {category.projectCount === 1 ? 'project' : 'projects'}
                  </p>

                  {/* Explore CTA - appears on hover */}
                  <div className="flex items-center gap-2 mt-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/90">
                      Explore
                    </span>
                    <span className="w-6 h-px bg-white/60" />
                  </div>
                </div>
              </Link>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}
