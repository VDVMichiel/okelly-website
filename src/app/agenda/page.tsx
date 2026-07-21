'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/lib/googleSheets';

export default function Agenda() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then(setEvents)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto w-5/6">
        <h1 className="mb-8 text-4xl font-bold text-[#1e293b]">Agenda</h1>

        {loading && (
          <p className="text-gray-500 text-lg">Agenda laden...</p>
        )}

        {error && (
          <p className="text-gray-500 text-lg">Kon de agenda niet laden. Probeer later opnieuw.</p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="text-gray-500 text-lg">Geen activiteiten gevonden.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="space-y-6">
            {events
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((event) => (
                <div key={event.id} className="rounded-lg bg-white p-6 shadow-md">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="mb-2 text-2xl font-bold text-[#1e293b]">{event.title}</h2>
                      <p className="mb-2 text-gray-600">{event.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-8 md:min-w-[200px]">
                      <p className="font-bold text-[#c4a77d]">{event.date}</p>
                      <p className="text-sm text-gray-600">{event.time} - {event.endTime}</p>
                      <p className="text-sm text-gray-600">{event.location}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
