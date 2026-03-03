'use client';

import { useState } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs';

const faqs = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I begin working with VLanguret Design Build?',
        answer: 'Getting started is easy! Simply schedule a complimentary consultation through our website or give us a call. During this initial meeting, we\'ll discuss your project goals, timeline, and budget to determine if we\'re a good fit for each other.',
      },
      {
        question: 'What areas do you serve?',
        answer: 'We primarily serve the Phoenix metropolitan area and surrounding communities in Arizona. For larger projects, we may consider locations outside our typical service area. Contact us to discuss your specific location.',
      },
      {
        question: 'Do you offer virtual consultations?',
        answer: 'Yes! We offer virtual consultations for clients who prefer remote meetings or are located outside our immediate service area. We use video conferencing tools to discuss your project and can work with photos and measurements you provide.',
      },
    ],
  },
  {
    category: 'Design Process',
    questions: [
      {
        question: 'What is your design process like?',
        answer: 'Our design process typically includes four phases: Discovery & Consultation, Concept Development, Design Presentation, and Refinement & Approval. Each phase ensures we understand your vision and deliver a design that exceeds your expectations. Visit our Processes page for detailed information.',
      },
      {
        question: 'How long does the design phase take?',
        answer: 'The design phase duration varies based on project scope. A single room design might take 4-6 weeks, while a whole-home project could take 3-6 months. We\'ll provide a detailed timeline during your consultation.',
      },
      {
        question: 'Can I see 3D renderings of my project?',
        answer: 'Absolutely! We create detailed 2D and 3D renderings as part of our design presentation. These visualizations help you see exactly how your space will look before any construction begins.',
      },
      {
        question: 'What if I don\'t like the initial design?',
        answer: 'Your satisfaction is our priority. Our process includes revision rounds where we refine the design based on your feedback. We work collaboratively until you\'re completely happy with the result.',
      },
    ],
  },
  {
    category: 'Construction & Timeline',
    questions: [
      {
        question: 'Are you a licensed general contractor?',
        answer: 'Yes, VLanguret Design Build is a fully licensed and insured general contractor in Arizona. We hold all necessary licenses and certifications to perform residential and commercial construction work.',
      },
      {
        question: 'How long does a typical renovation take?',
        answer: 'Project timelines vary significantly based on scope. A bathroom renovation might take 4-8 weeks, a kitchen remodel 8-12 weeks, and a whole-home renovation 4-8 months. We\'ll provide a detailed schedule before work begins.',
      },
      {
        question: 'Do you handle permits and inspections?',
        answer: 'Yes, we handle all permit applications and coordinate inspections as part of our construction services. This ensures your project meets all local building codes and regulations.',
      },
      {
        question: 'Can I live in my home during renovation?',
        answer: 'In many cases, yes. We work with you to create a construction schedule that minimizes disruption to your daily life. For extensive whole-home renovations, temporary relocation might be recommended.',
      },
    ],
  },
  {
    category: 'Pricing & Payment',
    questions: [
      {
        question: 'How do you structure your fees?',
        answer: 'Our fee structure depends on the type and scope of service. Design services may be billed as a flat fee or hourly rate. Construction projects are typically bid as a fixed price with a detailed breakdown. We\'ll explain all costs clearly during your consultation.',
      },
      {
        question: 'Do you require a deposit?',
        answer: 'Yes, we typically require a deposit to begin work. For design services, this is usually 50% upfront. For construction projects, we establish a payment schedule tied to project milestones.',
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept checks, bank transfers, and major credit cards. For larger projects, we can discuss financing options or payment plans that work for your budget.',
      },
      {
        question: 'Are there any hidden fees?',
        answer: 'Never. We believe in complete transparency. All costs are outlined in our proposals, and any changes or additions are discussed and approved by you before proceeding.',
      },
    ],
  },
  {
    category: 'Working Together',
    questions: [
      {
        question: 'How involved will I be in the process?',
        answer: 'As involved as you\'d like to be! Some clients prefer to be hands-on with every decision, while others trust us to make selections on their behalf. We adapt to your preferences and communication style.',
      },
      {
        question: 'How do you communicate project updates?',
        answer: 'We provide regular updates through your preferred method - email, phone calls, or in-person meetings. During construction, we typically provide weekly progress reports with photos and next steps.',
      },
      {
        question: 'Can I purchase my own materials or furniture?',
        answer: 'While we recommend using our trade resources for consistency and warranty purposes, we\'re happy to incorporate pieces you\'ve purchased. Just let us know early in the process so we can plan accordingly.',
      },
      {
        question: 'What happens after the project is complete?',
        answer: 'We conduct a final walkthrough to ensure everything meets your expectations. For construction projects, we provide warranty information and are always available if any issues arise. Many of our clients become repeat customers!',
      },
    ],
  },
];

export default function FAQsPage() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'FAQs', href: '/faqs' },
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-wood-800 leading-[1.1] mb-4 sm:mb-6 mt-4 sm:mt-6">
              Frequently Asked Questions
            </h1>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-700 max-w-3xl leading-relaxed">
              Find answers to common questions about our design and construction services.
              Can&apos;t find what you&apos;re looking for? Contact us directly.
            </p>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16 sm:py-24 bg-wood-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-10 sm:mb-12 last:mb-0">
                {/* Category Header */}
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-wood-800 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-wood-200">
                  {category.category}
                </h2>

                {/* Questions */}
                <div className="space-y-3 sm:space-y-4">
                  {category.questions.map((faq, faqIndex) => {
                    const itemId = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openItems.includes(itemId);

                    return (
                      <div
                        key={faqIndex}
                        className="bg-white border border-wood-100 overflow-hidden transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-wood-50 transition-colors duration-200"
                        >
                          <span className="font-serif text-base sm:text-lg lg:text-xl font-medium text-wood-800 pr-3 sm:pr-4">
                            {faq.question}
                          </span>
                          <svg
                            className={`w-4 h-4 sm:w-5 sm:h-5 text-wood-600 flex-shrink-0 transition-transform duration-300 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? 'max-h-[500px]' : 'max-h-0'
                          }`}
                        >
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <p className="font-serif text-sm sm:text-base lg:text-lg text-wood-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-20 lg:py-28 bg-wood-800">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-[1.1] mb-4 sm:mb-6">
              Still Have Questions?
            </h2>
            <p className="font-serif text-base sm:text-lg lg:text-xl text-wood-200 mb-8 sm:mb-10 leading-relaxed">
              We&apos;re here to help. Schedule a consultation and let&apos;s discuss your project in detail.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/schedule"
                className="group relative bg-white hover:bg-wood-50 text-wood-800 px-6 sm:px-10 py-4 sm:py-5 font-serif text-sm sm:text-base font-semibold tracking-widest uppercase transition-all duration-500 inline-block overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-wood-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  Schedule Consultation
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
              <a
                href="tel:+14804664693"
                className="group relative bg-transparent border-2 border-white text-white hover:bg-white hover:text-wood-800 px-6 sm:px-10 py-4 sm:py-5 font-serif text-sm sm:text-base font-semibold tracking-widest uppercase transition-all duration-500 inline-block"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Us
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
