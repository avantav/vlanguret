'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProjectInquiryForm from '@/components/ProjectInquiryForm';
import Script from 'next/script';
import { motion, AnimatePresence } from 'framer-motion';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
}

const benefits = [
  { icon: '🕐', title: '30-Min Consultation' },
  { icon: '✓', title: 'No Obligation' },
  { icon: '★', title: '13+ Years Experience' },
];

export default function SchedulePage() {
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);
  const [appointmentScheduled, setAppointmentScheduled] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);

  const handleFormComplete = (data: FormData) => {
    setFormData(data);
    setShowCalendlyModal(true);
  };

  const handleCloseAttempt = () => {
    setShowCloseConfirm(true);
  };

  const handleConfirmClose = (scheduled: boolean) => {
    setShowCloseConfirm(false);
    if (scheduled) {
      setAppointmentScheduled(true);
    }
    setShowCalendlyModal(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCalendlyModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCalendlyModal]);

  // Listen for Calendly event when meeting is scheduled
  useEffect(() => {
    const handleCalendlyEvent = (e: MessageEvent) => {
      if (e.data.event === 'calendly.event_scheduled') {
        // Mark as scheduled and close modal
        setAppointmentScheduled(true);
        setShowCalendlyModal(false);
      }
    };

    window.addEventListener('message', handleCalendlyEvent);
    return () => window.removeEventListener('message', handleCalendlyEvent);
  }, []);

  const getCalendlyUrl = () => {
    const baseUrl = 'https://calendly.com/vlanguret-info/30min';
    const params = new URLSearchParams({
      text_color: '292524',
      primary_color: '292524',
    });

    if (formData) {
      params.append('name', formData.fullName);
      params.append('email', formData.email);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-wood-50">
        {/* Header Section */}
        <section className="pt-24 sm:pt-28 lg:pt-32 pb-8 sm:pb-12 bg-white border-b border-wood-100">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-wood-400 mb-3 sm:mb-4">
                Start Your Project
              </p>
              <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-medium text-wood-800 mb-4 sm:mb-6 leading-tight">
                Let&apos;s Bring Your <span className="italic font-normal text-wood-600">Vision to Life</span>
              </h1>
              <p className="font-serif text-base sm:text-lg text-wood-500 max-w-xl mx-auto">
                Tell us about your project and schedule a complimentary consultation with our design team.
              </p>
            </motion.div>

            {/* Benefits Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-6 sm:mt-8"
            >
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-wood-50 border border-wood-100 text-wood-600"
                >
                  <span className="text-xs sm:text-sm">{benefit.icon}</span>
                  <span className="font-sans text-[9px] sm:text-[11px] tracking-wider uppercase">{benefit.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-10 sm:py-16 lg:py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProjectInquiryForm onComplete={handleFormComplete} />
          </div>
        </section>

        {/* Contact Alternative Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white border-t border-wood-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-wood-400 mb-3 sm:mb-4">
              Prefer to Talk Now?
            </p>
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-wood-800 mb-3 sm:mb-4">
              We&apos;re Here to Help
            </h2>
            <p className="font-serif text-base sm:text-lg text-wood-500 mb-6 sm:mb-8 max-w-xl mx-auto">
              Have questions before scheduling? Reach out directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:+14804664693"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-wood-800 hover:bg-wood-900 text-white font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (480) 466-4693
              </a>
              <a
                href="https://wa.me/14804664693?text=Hello%2C%20I%20would%20like%20information%20about%20your%20design%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-wood-300 text-wood-800 hover:bg-wood-50 hover:border-wood-400 font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.15em] uppercase transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Uncloseable Calendly Modal */}
      <AnimatePresence>
        {showCalendlyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            {/* Backdrop - no click to close */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-3xl max-h-[95vh] mx-4 bg-white shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseAttempt}
                className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 hover:bg-wood-100 rounded-full transition-colors shadow-md"
                aria-label="Close"
              >
                <svg className="w-5 h-5 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Header - Thank You */}
              <div className="flex-shrink-0 px-6 sm:px-8 pt-6 sm:pt-8 pb-4 text-center border-b border-wood-100 bg-wood-50">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", delay: 0.2 }}
                  className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h3 className="font-display text-xl sm:text-2xl font-medium text-wood-800 mb-1">
                  Thank You!
                </h3>
                <p className="font-serif text-sm sm:text-base text-wood-500 mb-3">
                  Your information has been received.
                </p>
                <div className="bg-white border border-wood-200 px-4 py-3 rounded-lg inline-block">
                  <p className="font-sans text-[10px] sm:text-[11px] tracking-wider uppercase text-wood-600 mb-0.5">
                    One Last Step
                  </p>
                  <p className="font-serif text-base sm:text-lg text-wood-800 font-medium">
                    Please schedule your 15-minute Discovery Call
                  </p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto">
                {/* Project Summary */}
                {formData && (
                  <div className="px-6 sm:px-8 py-4 bg-white border-b border-wood-100">
                    <h4 className="font-display text-sm sm:text-base font-medium text-wood-800 mb-3">
                      Project Summary
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="font-sans text-[9px] sm:text-[10px] tracking-wider uppercase text-wood-400 block">Name</span>
                        <p className="font-serif text-xs sm:text-sm text-wood-700 mt-0.5 truncate">{formData.fullName}</p>
                      </div>
                      <div>
                        <span className="font-sans text-[9px] sm:text-[10px] tracking-wider uppercase text-wood-400 block">Project Type</span>
                        <p className="font-serif text-xs sm:text-sm text-wood-700 mt-0.5 capitalize truncate">{formData.projectType}</p>
                      </div>
                      {formData.budget && (
                        <div>
                          <span className="font-sans text-[9px] sm:text-[10px] tracking-wider uppercase text-wood-400 block">Budget</span>
                          <p className="font-serif text-xs sm:text-sm text-wood-700 mt-0.5">
                            {formData.budget.replace(/-/g, ' ').replace(/k/g, ',000')}
                          </p>
                        </div>
                      )}
                      {formData.timeline && (
                        <div>
                          <span className="font-sans text-[9px] sm:text-[10px] tracking-wider uppercase text-wood-400 block">Timeline</span>
                          <p className="font-serif text-xs sm:text-sm text-wood-700 mt-0.5 capitalize">
                            {formData.timeline.replace(/-/g, ' ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Calendly Widget */}
                <div className="bg-white">
                  <div
                    className="calendly-inline-widget"
                    data-url={getCalendlyUrl()}
                    style={{ minWidth: '320px', height: '580px' }}
                  />
                  <Script
                    src="https://assets.calendly.com/assets/external/widget.js"
                    strategy="lazyOnload"
                  />
                </div>
              </div>
            </motion.div>

              {/* Close Confirmation Dialog */}
              <AnimatePresence>
                {showCloseConfirm && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-30 flex items-center justify-center bg-black/50"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white p-6 sm:p-8 mx-4 max-w-md shadow-xl rounded-lg"
                    >
                      <h4 className="font-display text-lg sm:text-xl font-medium text-wood-800 mb-3 text-center">
                        Before you go...
                      </h4>
                      <p className="font-serif text-base text-wood-600 mb-6 text-center">
                        Did you already schedule your consultation?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleConfirmClose(true)}
                          className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-sans text-[11px] tracking-wider uppercase transition-colors"
                        >
                          Yes, I scheduled
                        </button>
                        <button
                          onClick={() => handleConfirmClose(false)}
                          className="flex-1 px-4 py-3 bg-wood-200 hover:bg-wood-300 text-wood-800 font-sans text-[11px] tracking-wider uppercase transition-colors"
                        >
                          No, close anyway
                        </button>
                      </div>
                      <button
                        onClick={() => setShowCloseConfirm(false)}
                        className="w-full mt-3 px-4 py-2 text-wood-500 hover:text-wood-700 font-sans text-[11px] tracking-wider uppercase transition-colors"
                      >
                        Go back to calendar
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
