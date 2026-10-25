'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import type { CSSProperties } from 'react';
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

const typeColor: Record<Event['type'], string> = {
  clubkampioenschap: '#A8312D',
  lic: '#2563eb',
  lik: '#16a34a',
  nic: '#9333ea',
  lessen: '#EA580C',
  vrijschaken: '#0891B2',
  other: '#5E0000',
};

const typeLabel: Record<Event['type'], string> = {
  clubkampioenschap: 'Clubkampioenschap',
  lic: 'LIC',
  lik: 'LIK',
  nic: 'NIC',
  lessen: 'Lessen',
  vrijschaken: 'Vrij schaken',
  other: 'Overig',
};

const capitalizeFirst = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const detailRef = useRef<HTMLDivElement>(null);
  const mounted = useRef(false);

  useEffect(() => {
    fetch('/api/events/')
      .then((res) => res.json())
      .then((data: Event[]) => setEvents(data.filter((event) => event.date)))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const eventsFor = (day: Date) => events.filter((event) => isSameDay(new Date(event.date), day));
  const selectedEvents = selectedDate ? eventsFor(selectedDate) : [];

  const nextEvent = useMemo(() => {
    const startOfToday = new Date(new Date().toDateString());
    return (
      [...events]
        .filter((event) => new Date(event.date) >= startOfToday)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0] || null
    );
  }, [events]);

  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  };

  // On phones the day details sit under the calendar, so bring them into view
  // after a date is chosen instead of making the visitor scroll down manually.
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    if (window.matchMedia('(max-width: 767px)').matches) {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedDate]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center">
        <p className="text-lg text-[#5E0000]/60">Kalender laden...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-4xl py-12 text-center">
        <p className="text-lg text-[#5E0000]/60">Kon de kalender niet laden. Probeer later opnieuw.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid gap-5 md:grid-cols-[1.15fr_1fr] md:gap-8">
        <div className="md:row-start-1">
          <div className="rounded-lg border border-[#5E0000]/10 bg-white p-3 shadow-md sm:p-4 md:p-5">
            <div className="mb-2 flex items-center justify-between">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                aria-label="Vorige maand"
                className="p-1.5 text-[#A8312D] transition hover:bg-[#F8F4EB]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="text-center">
                <h3 className="font-serif text-lg font-bold capitalize text-[#A8312D] md:text-xl">
                  {format(currentMonth, 'MMMM yyyy', { locale: nl })}
                </h3>
                <button
                  onClick={goToToday}
                  className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65 underline-offset-4 hover:underline"
                >
                  Vandaag
                </button>
              </div>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                aria-label="Volgende maand"
                className="p-1.5 text-[#A8312D] transition hover:bg-[#F8F4EB]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7">
              {weekdays.map((day) => (
                <div
                  key={day}
                  className="py-1.5 text-center text-[11px] font-semibold uppercase tracking-wide text-[#5E0000]/65"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1">
              {days.map((day) => {
                const dayEvents = eventsFor(day);
                const isSelected = !!selectedDate && isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const eventColour = dayEvents.length > 0 ? typeColor[dayEvents[0].type] : null;
                const today = isToday(day);

                let style: CSSProperties = {};
                let extra = 'border-2 ';

                if (eventColour && isCurrentMonth) {
                  style = { backgroundColor: eventColour, color: '#fff' };
                  extra += 'border-transparent' + (isSelected ? ' font-bold' : '');
                } else if (!isCurrentMonth) {
                  style = { color: 'rgba(94,0,0,0.28)' };
                  extra += 'border-transparent' + (isSelected ? ' font-bold' : '');
                } else {
                  extra += 'border-transparent' + (isSelected || today ? ' font-bold' : ' hover:bg-[#F8F4EB]');
                }

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => setSelectedDate(day)}
                    aria-pressed={isSelected}
                    style={style}
                    className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-[13px] transition md:h-9 md:w-9 md:text-sm ${extra}`}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4 md:col-start-2 md:row-span-2 md:row-start-1">
          <div
            className={`rounded-lg border-l-4 border-[#A8312D] bg-white px-4 py-3 shadow-md md:block md:px-5 md:py-4 ${
              selectedEvents.length > 0 ? 'hidden' : ''
            }`}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65">
              Eerstvolgende activiteit
            </p>
            {nextEvent ? (
              <>
                <p className="mt-1 font-serif text-base font-bold leading-snug text-[#5E0000] md:text-lg">
                  {nextEvent.title}
                </p>
                <p className="text-sm text-[#5E0000]/70">
                  {capitalizeFirst(format(new Date(nextEvent.date), 'EEEE d MMMM', { locale: nl }))}
                  {nextEvent.time && `, ${nextEvent.time}${nextEvent.endTime ? ` tot ${nextEvent.endTime}` : ''}`}
                </p>
              </>
            ) : (
              <p className="mt-1 text-sm text-[#5E0000]/60">Nog niets gepland.</p>
            )}
          </div>

          <div
            ref={detailRef}
            className="scroll-mt-20 rounded-lg border border-[#5E0000]/10 bg-white p-4 shadow-md md:p-6"
          >
            <h3 className="font-serif text-lg font-bold text-[#A8312D] md:text-xl">
              {selectedDate
                ? capitalizeFirst(format(selectedDate, 'EEEE d MMMM', { locale: nl }))
                : 'Selecteer een datum'}
            </h3>

            <div className="mt-3 space-y-4 md:mt-4">
              {selectedEvents.length > 0 ? (
                selectedEvents.map((event) => (
                  <div
                    key={event.id}
                    className="border-l-2 pl-3"
                    style={{ borderColor: typeColor[event.type] }}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                      <h4 className="text-sm font-bold text-[#5E0000]">{event.title}</h4>
                      {event.time && (
                        <span className="text-xs text-[#5E0000]/65">
                          {event.time}
                          {event.endTime ? ` tot ${event.endTime}` : ''}
                        </span>
                      )}
                    </div>
                    {event.location && (
                      <p className="mt-0.5 text-xs leading-relaxed text-[#5E0000]/70">{event.location}</p>
                    )}
                    {event.description && (
                      <p className="mt-1 hidden text-xs leading-relaxed text-[#5E0000]/70 md:block">
                        {event.description}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-[#5E0000]/60">Geen activiteit op deze dag.</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 md:col-start-1 md:row-start-2">
          {(Object.keys(typeLabel) as Event['type'][]).map((type) => (
            <span key={type} className="flex items-center gap-1.5 text-[11px] text-[#5E0000]/80 md:text-xs">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: typeColor[type] }} />
              {typeLabel[type]}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
