import Layout from '@/components/Layout';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';
import TeamGrid from '@/components/TeamGrid';
import { createMetadata } from '@/lib/metadata';
import { staticTeamMembers } from '@/lib/teamMembers';

// ISR: Revalidar cada hora
export const revalidate = 3600;

export const metadata = createMetadata({
  title: 'About - Azucena Vidal Languret',
  description: 'Hello, my name is Azucena Vidal Languret (better known as Susy by my clients) and I am an Interior Designer and General Contractor. Over 17+ years of experience creating functional, beautiful spaces.',
  path: '/about',
});

export default async function AboutPage() {
  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ];

  // Use static team members with local photos
  const displayMembers = staticTeamMembers;

  // Foto close-up de Azucena para el hero (diferente a la del grid de team)
  const azucenaImage = '/images/azucena-about.png';

  return (
    <Layout>
      <div className="min-h-screen">
        <section className="pt-12 pb-8 sm:pt-16 sm:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <Breadcrumbs items={breadcrumbs} />

            <div className="flex flex-wrap gap-3 mt-8 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-wood-50 text-wood-600 font-sans text-[11px] tracking-[0.15em] uppercase">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Woman-Owned
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-wood-50 text-wood-600 font-sans text-[11px] tracking-[0.15em] uppercase">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Mexican Heritage
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-wood-50 text-wood-600 font-sans text-[11px] tracking-[0.15em] uppercase">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Licensed Contractor
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-wood-800 leading-[1.1]">
              About Us
            </h1>
          </div>
        </section>

        <section className="pt-8 pb-16 sm:pt-12 sm:pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="mb-12 lg:mb-16">
              <Image
                src={azucenaImage}
                alt="Azucena Vidal Languret - Interior Designer and General Contractor"
                width={1600}
                height={1200}
                className="w-full h-auto grayscale"
                priority
              />
            </div>

            <div>
              <div className="space-y-6">
                <p className="font-serif text-lg sm:text-xl lg:text-2xl text-wood-600 leading-relaxed">
                  <strong className="font-semibold text-wood-800">Azucena Vidal Languret</strong> is a luxury interior designer and licensed general contractor with over <strong className="font-semibold text-wood-800">17+ years of experience</strong>. She holds a Bachelor of Science in Interior Design from Northern Arizona University and maintains two ROC licenses for both residential and commercial work.
                </p>

                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  Azucena is passionate about creating beautiful, functional, and truly livable homes, specializing in high-end, full-home remodels where thoughtful design and construction expertise come together seamlessly.
                </p>

                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  Originally from Mexico, her work is deeply influenced by her roots and a strong appreciation for craftsmanship, warmth, and intentional design. She believes every client and every home is unique, and she carries that philosophy into each space she creates. Azucena is known for making the design process enjoyable and collaborative—offering innovative ideas while ensuring clients feel supported, understood, and genuinely cared for throughout the journey.
                </p>

                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  Her dual expertise in both design and construction allows projects to move forward with clarity, precision, and efficiency. This integrated approach is highly valued by discerning homeowners, luxury real estate professionals, and trusted industry partners.
                </p>

                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  What began as a solo practice, Azucena has grown into a carefully curated studio of nine talented creative professionals, each selected for their skill, vision, and dedication to excellence. Together, the team manages every aspect of a project—from concept through completion—ensuring each home is not only visually striking, but also functional, cohesive, and designed to stand the test of time.
                </p>

                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  When she is not designing or building, Azucena is fully devoted to her family, creating beautiful memories with her husband, two daughters, and son.
                </p>
              </div>

              <div className="pt-8">
                <Link
                  href="/schedule"
                  className="inline-block font-sans text-[11px] sm:text-xs font-semibold tracking-[0.15em] uppercase text-white bg-wood-800 hover:bg-wood-900 px-6 sm:px-8 py-3 sm:py-4 transition-all duration-300"
                >
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 lg:py-24 bg-wood-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-16 sm:mb-20 lg:mb-24">
              <div className="lg:col-span-3">
                <p className="font-sans text-[11px] tracking-[0.2em] uppercase text-wood-400">
                  Our Team
                </p>
              </div>
              <div className="lg:col-span-9">
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-wood-800 leading-[1.15] max-w-2xl">
                  Meet the professionals behind{' '}
                  <span className="italic font-normal text-wood-600">VLanguret</span>.
                </h2>
              </div>
            </div>

            <div className="mb-16 sm:mb-20 lg:mb-24">
              <div className="relative aspect-[21/9] overflow-hidden">
                <Image
                  src="/images/team/team-group.jpg"
                  alt="VLanguret Design Build Team"
                  fill
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>

            <TeamGrid members={displayMembers} />
          </div>
        </section>

        <section className="py-24 sm:py-32 lg:py-40 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-wood-50">
                  <svg className="w-7 h-7 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-wood-800">
                  Woman-Owned Business
                </h3>
                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  VLanguret Design Build is proudly woman-owned and operated. We bring a unique perspective
                  to every project, combining creativity, attention to detail, and a commitment to excellence
                  that sets us apart in the industry.
                </p>
                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  Our leadership understands the importance of creating spaces that are not only beautiful
                  but also functional for the families and businesses that use them every day.
                </p>
              </div>

              <div className="space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-wood-50">
                  <svg className="w-7 h-7 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-wood-800">
                  Proud Mexican Roots
                </h3>
                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  Our founder, Azucena, brings the rich cultural heritage of Mexico to every design.
                  From warm color palettes to artisanal craftsmanship, our Mexican roots influence
                  our appreciation for beauty, quality, and meaningful spaces.
                </p>
                <p className="font-serif text-base sm:text-lg text-wood-500 leading-relaxed">
                  This heritage, combined with American education and over a decade of local experience,
                  creates a unique approach that bridges cultures and creates timeless designs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 lg:py-32 bg-wood-800">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-3 gap-8 lg:gap-12 text-center">
              <div>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                  17+
                </p>
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/50">
                  Years Experience
                </p>
              </div>
              <div>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                  100+
                </p>
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/50">
                  Projects
                </p>
              </div>
              <div>
                <p className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium text-white mb-2">
                  5.0
                </p>
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/50">
                  Google Rating
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
