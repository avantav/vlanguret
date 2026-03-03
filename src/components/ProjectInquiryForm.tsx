'use client';

import { useState } from 'react';
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

interface ProjectInquiryFormProps {
  onComplete: (data: FormData) => void;
}

const steps = [
  { number: 1, title: 'Contact', icon: 'user' },
  { number: 2, title: 'Project', icon: 'home' },
  { number: 3, title: 'Budget', icon: 'calendar' },
];

const services = [
  'Full Service Design',
  'Cabinets',
  'Countertops',
  'Flooring',
  'Construction',
];

const budgetRanges = [
  { value: '50k-100k', label: '$50,000 - $100,000' },
  { value: '100k-250k', label: '$100,000 - $250,000' },
  { value: '250k-500k', label: '$250,000 - $500,000' },
  { value: '500k-1m', label: '$500,000 - $1,000,000' },
  { value: 'over-1m', label: '$1,000,000+' },
];

const timelines = [
  { value: 'asap', label: 'As soon as possible' },
  { value: '1-3-months', label: '1-3 months' },
  { value: '3-6-months', label: '3-6 months' },
  { value: '6-plus-months', label: '6+ months' },
];

const StepIcon = ({ type, isActive, isCompleted }: { type: string; isActive: boolean; isCompleted: boolean }) => {
  const color = isCompleted ? 'text-white' : isActive ? 'text-wood-800' : 'text-wood-300';

  if (type === 'user') {
    return (
      <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    );
  }
  if (type === 'home') {
    return (
      <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    );
  }
  return (
    <svg className={`w-4 h-4 ${color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
};

const ProjectInquiryForm = ({ onComplete }: ProjectInquiryFormProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    services: [],
    description: '',
    budget: '',
    timeline: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const validateStep1 = () => {
    if (!formData.fullName.trim()) return 'Please enter your full name';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email';
    if (!formData.phone.trim()) return 'Please enter your phone number';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.projectType) return 'Please select a project type';
    if (formData.services.length === 0) return 'Please select at least one service';
    return null;
  };

  const handleNext = () => {
    setError('');

    if (step === 1) {
      const validationError = validateStep1();
      if (validationError) {
        setError(validationError);
        return;
      }
    } else if (step === 2) {
      const validationError = validateStep2();
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setError('');
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (step !== 3) {
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Try to get error details, but handle non-JSON responses
        try {
          const errorData = await response.json();
          console.error('API Error:', errorData);
        } catch {
          console.error('API Error: Status', response.status);
        }
        // Continue anyway - Calendly will capture basic info
      } else {
        console.log('Form submitted successfully');
      }

      onComplete(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      // Still proceed to Calendly even if email fails
      onComplete(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepVariants = {
    enter: { opacity: 0, x: 20 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="bg-white p-8 sm:p-10 shadow-sm border border-wood-100">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-wood-400 mb-2">
          Step {step} of 3
        </p>
        <h2 className="font-display text-2xl font-medium text-wood-800">
          {step === 1 && 'Tell Us About Yourself'}
          {step === 2 && 'Your Project Vision'}
          {step === 3 && 'Budget & Timeline'}
        </h2>
      </div>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  backgroundColor: s.number < step ? '#292524' : s.number === step ? '#faf9f7' : '#faf9f7',
                  borderColor: s.number <= step ? '#292524' : '#d6d3d1',
                }}
                transition={{ duration: 0.3 }}
                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                  s.number < step ? 'bg-wood-800' : ''
                }`}
              >
                {s.number < step ? (
                  <motion.svg
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </motion.svg>
                ) : (
                  <StepIcon type={s.icon} isActive={s.number === step} isCompleted={s.number < step} />
                )}
              </motion.div>
              <span className={`mt-2 font-sans text-[10px] tracking-wider uppercase ${
                s.number <= step ? 'text-wood-800' : 'text-wood-300'
              }`}>
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="w-16 sm:w-24 h-0.5 mx-2 mb-6 relative overflow-hidden bg-wood-100">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: step > s.number ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="absolute inset-y-0 left-0 bg-wood-800"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error Message */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-serif"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={(e) => e.preventDefault()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
            e.preventDefault();
            if (step < 3) {
              handleNext();
            }
          }
        }}
      >
        <AnimatePresence mode="wait">
          {/* Step 1: Contact Information */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="group">
                <label htmlFor="fullName" className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-wood-200 focus:border-wood-800 focus:outline-none focus:ring-0 transition-colors font-serif text-wood-800 placeholder:text-wood-300"
                  placeholder="John Smith"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-wood-200 focus:border-wood-800 focus:outline-none focus:ring-0 transition-colors font-serif text-wood-800 placeholder:text-wood-300"
                  placeholder="john@example.com"
                />
              </div>

              <div className="group">
                <label htmlFor="phone" className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-wood-200 focus:border-wood-800 focus:outline-none focus:ring-0 transition-colors font-serif text-wood-800 placeholder:text-wood-300"
                  placeholder="(480) 555-0123"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Project Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <label htmlFor="projectType" className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-3">
                  Project Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['residential', 'commercial'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, projectType: type }))}
                      className={`px-6 py-4 border-2 text-sm font-sans tracking-wide uppercase transition-all ${
                        formData.projectType === type
                          ? 'border-wood-800 bg-wood-800 text-white'
                          : 'border-wood-200 text-wood-600 hover:border-wood-400'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-3">
                  Services of Interest
                </label>
                <div className="flex flex-wrap gap-2">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceToggle(service)}
                      className={`px-4 py-2 border text-sm font-serif transition-all ${
                        formData.services.includes(service)
                          ? 'border-wood-800 bg-wood-800 text-white'
                          : 'border-wood-200 text-wood-600 hover:border-wood-400'
                      }`}
                    >
                      {service}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-3">
                  Tell Us About Your Vision
                  <span className="normal-case tracking-normal text-wood-400 ml-2">(Optional)</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-wood-50 border-2 border-wood-100 focus:border-wood-800 focus:bg-white focus:outline-none focus:ring-0 transition-all font-serif text-wood-800 placeholder:text-wood-300 resize-none"
                  placeholder="Describe your dream space..."
                />
              </div>
            </motion.div>
          )}

          {/* Step 3: Budget & Timeline */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <label className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-3">
                  Estimated Budget Range
                </label>
                <div className="space-y-2">
                  {budgetRanges.map((range) => (
                    <label
                      key={range.value}
                      className={`flex items-center px-4 py-3 border-2 cursor-pointer transition-all ${
                        formData.budget === range.value
                          ? 'border-wood-800 bg-wood-50'
                          : 'border-wood-100 hover:border-wood-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={range.value}
                        checked={formData.budget === range.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                          formData.budget === range.value
                            ? 'border-wood-800 bg-wood-800'
                            : 'border-wood-300'
                        }`}
                      >
                        {formData.budget === range.value && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                          />
                        )}
                      </span>
                      <span className="font-serif text-sm text-wood-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-sans text-[11px] tracking-wider uppercase text-wood-500 mb-3">
                  Desired Timeline
                </label>
                <div className="space-y-2">
                  {timelines.map((t) => (
                    <label
                      key={t.value}
                      className={`flex items-center px-4 py-3 border-2 cursor-pointer transition-all ${
                        formData.timeline === t.value
                          ? 'border-wood-800 bg-wood-50'
                          : 'border-wood-100 hover:border-wood-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="timeline"
                        value={t.value}
                        checked={formData.timeline === t.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded-full border-2 mr-4 flex items-center justify-center transition-colors ${
                          formData.timeline === t.value
                            ? 'border-wood-800 bg-wood-800'
                            : 'border-wood-300'
                        }`}
                      >
                        {formData.timeline === t.value && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                          />
                        )}
                      </span>
                      <span className="font-serif text-sm text-wood-700">{t.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-10 pt-8 border-t border-wood-100">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="group inline-flex items-center gap-2 font-sans text-[11px] tracking-wider uppercase text-wood-500 hover:text-wood-800 transition-colors"
            >
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
          ) : (
            <div />
          )}

          {step === 1 && (
            <button
              type="button"
              onClick={handleNext}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-wood-800 hover:bg-wood-900 text-white font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-all"
            >
              Continue
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {step === 2 && (
            <button
              type="button"
              onClick={handleNext}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-wood-800 hover:bg-wood-900 text-white font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-all"
            >
              Continue
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {step === 3 && (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-wood-800 hover:bg-wood-900 disabled:bg-wood-400 text-white font-sans text-[11px] font-medium tracking-[0.15em] uppercase transition-all"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Schedule Consultation
                  <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProjectInquiryForm;
