'use client';

import { useState, useEffect } from 'react';
import { connectData } from '@/data/connect';

interface BusinessHoursProps {
  lang?: 'en' | 'es';
  showFull?: boolean;
}

export function BusinessHours({ lang = 'en', showFull = false }: BusinessHoursProps) {
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const checkIfOpen = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: connectData.schedule.timezone,
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      };
      const dayOptions: Intl.DateTimeFormatOptions = {
        timeZone: connectData.schedule.timezone,
        weekday: 'long',
      };

      const timeString = now.toLocaleString('en-US', options);
      const dayString = now.toLocaleString('en-US', dayOptions);
      const [hours, minutes] = timeString.split(':').map(Number);
      const currentMinutes = hours * 60 + minutes;

      const todaySchedule = connectData.schedule.hours.find(
        (h) => h.day.toLowerCase() === dayString.toLowerCase()
      );

      if (!todaySchedule || !todaySchedule.isOpen) {
        setIsOpen(false);
        return;
      }

      const parseTime = (time: string) => {
        const match = time.match(/(\d+):(\d+)\s*(AM|PM)/i);
        if (!match) return 0;
        const [, h, m, period] = match;
        let hour = parseInt(h);
        if (period.toUpperCase() === 'PM' && hour !== 12) hour += 12;
        if (period.toUpperCase() === 'AM' && hour === 12) hour = 0;
        return hour * 60 + parseInt(m);
      };

      const openMinutes = parseTime(todaySchedule.open);
      const closeMinutes = parseTime(todaySchedule.close);

      setIsOpen(currentMinutes >= openMinutes && currentMinutes < closeMinutes);
    };

    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: connectData.schedule.timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      };
      setCurrentTime(now.toLocaleString('en-US', options));
    };

    checkIfOpen();
    updateTime();

    const interval = setInterval(() => {
      checkIfOpen();
      updateTime();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const t = connectData.translations[lang];

  if (showFull) {
    return (
      <div className="bg-wood-50 rounded-2xl p-6">
        <h3 className="font-display text-lg font-bold text-wood-800 mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-wood-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {t.businessHours}
        </h3>
        <div className="space-y-2">
          {connectData.schedule.hours.map((schedule) => (
            <div key={schedule.day} className="flex justify-between items-center text-sm">
              <span className="font-sans text-wood-700">{schedule.day}</span>
              <span className={`font-sans font-medium ${schedule.isOpen ? 'text-wood-800' : 'text-wood-500'}`}>
                {schedule.isOpen ? `${schedule.open} - ${schedule.close}` : t.closed}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 bg-wood-50 rounded-full">
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          isOpen === null
            ? 'bg-wood-400'
            : isOpen
            ? 'bg-green-500 animate-pulse'
            : 'bg-red-500'
        }`}
      />
      <span className="font-sans text-sm font-medium text-wood-700">
        {isOpen === null ? '...' : isOpen ? t.openNow : t.closedNow}
      </span>
      {currentTime && (
        <span className="font-sans text-sm text-wood-500">
          · {currentTime} MST
        </span>
      )}
    </div>
  );
}

export default BusinessHours;
