'use client';

import { useState, useEffect } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  startOfWeek,
  endOfWeek,
} from 'date-fns';
import { nl } from 'date-fns/locale';
import { Event } from '@/lib/googleSheets';

const weekdays = ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'];

const typeColors = {
  club: { bg: 'bg-[#A8312D]', text: 'text-white', dot: 'bg-[#A8312D]' },
  lic: { bg: 'bg-blue-600', text: 'text-white', dot: 'bg-blue-600' },
  lik: { bg: 'bg-green-600', text: 'text-white', dot: 'bg-green-600' },
  nic: { bg: 'bg-purple-600', text: 'text-white', dot: 'bg-purple-600' },
  other: { bg: 'bg-[#5E0000]', text: 'text-white', dot: 'bg-[#5E0000]' },
};

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const selectedEvents = events.filter((e) =>
    selectedDate && isSameDay(new Date(e.date), selectedDate)
  );

  const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl text-center py-12">
        <p className="text-[#5E0000]/60 text-lg">Kalender laden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl text-center py-12">
        <p className="text-[#5E0000]/60 text-lg">Kon de kalender niet laden. Probeer later opnieuw.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="md:grid md:grid-cols-2 md:gap-12">
        <div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-[#F8F4EB] rounded-lg transition"
              >
                <svg className="w-5 h-5 text-[#A8312D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h3 className="text-xl font-bold text-[#A8312D] capitalize">
                {format(currentMonth, 'MMMM yyyy', { locale: nl })}
              </h3>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-[#F8F4EB] rounded-lg transition"
              >
                <svg className="w-5 h-5 text-[#A8312D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <button
              onClick={goToToday}
              className="text-sm text-[#A8312D] underline mb-4 hover:font-bold block"
            >
              Vandaag
            </button>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {weekdays.map((day) => (
                <div key={day} className="text-center text-sm font-bold text-[#5E0000]/60 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((day) => {
                const dayEvents = events.filter((e) => isSameDay(new Date(e.date), day));
                const isSelected = selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    style={{
                      backgroundColor: isSelected ? '#A8312D' : 'transparent',
                      color: isSelected ? 'white' : (!isToday(day) && isCurrentMonth ? '#5E0000' : isToday(day) ? '#A8312D' : 'rgba(94, 0, 0, 0.3)'),
                    }}
                    className={`
                      h-10 w-10 rounded-full flex flex-col items-center justify-center mx-auto text-sm transition relative border-2
                      ${isToday(day) && !isSelected ? 'border-[#A8312D]' : 'border-transparent'}
                      ${!isSelected && isCurrentMonth ? 'hover:bg-[#F8F4EB]' : ''}
                    `}
                  >
                    <span className={isSelected ? 'font-bold' : ''}>{format(day, 'd')}</span>
                    {dayEvents.length > 0 && (
                      <span 
                        className="absolute bottom-1 w-1.5 h-1.5 rounded-full" 
                        style={{ backgroundColor: isSelected ? 'white' : (
                          dayEvents[0].type === 'lic' ? '#2563eb' :
                          dayEvents[0].type === 'lik' ? '#16a34a' :
                          dayEvents[0].type === 'nic' ? '#9333ea' :
                          '#A8312D'
                        )}}
                      ></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 bg-white rounded-lg p-4 shadow-md">
            <p className="text-xs font-bold text-[#5E0000] mb-2">Legende:</p>
            <div className="flex flex-wrap gap-4">
              <span className="flex items-center gap-2 text-sm text-[#5E0000]">
                <span className="w-3 h-3 rounded-full bg-[#A8312D]"></span> Clubavond
              </span>
              <span className="flex items-center gap-2 text-sm text-[#5E0000]">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span> LIC
              </span>
              <span className="flex items-center gap-2 text-sm text-[#5E0000]">
                <span className="w-3 h-3 rounded-full bg-green-600"></span> LIK
              </span>
              <span className="flex items-center gap-2 text-sm text-[#5E0000]">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span> NIC
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-0">
          <h3 className="text-xl font-bold text-[#A8312D] mb-4 capitalize">
            {selectedDate
              ? format(selectedDate, 'EEEE d MMMM', { locale: nl })
              : 'Selecteer een datum'}
          </h3>

          {selectedEvents.length > 0 ? (
            <div className="space-y-3">
              {selectedEvents.map((event) => (
                <div
                  key={event.id}
                  className={`rounded-lg p-4 shadow-md ${typeColors[event.type].bg} ${typeColors[event.type].text}`}
                >
                  <h4 className="font-bold text-lg">{event.title}</h4>
                  <p className="text-sm opacity-90 mt-1">
                    {event.time} - {event.endTime}
                  </p>
                  <p className="text-sm opacity-90">{event.location}</p>
                  <p className="text-sm mt-2 opacity-80">{event.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-[#5E0000]/60">Geen activiteiten op deze datum.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
