'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Bedankt voor je bericht! We nemen snel contact op.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="mx-auto grid w-5/6 gap-12 md:grid-cols-2">
        <div>
          <h1 className="mb-8 text-4xl font-bold text-[#1e293b]">Contact</h1>
          
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-[#1e293b]">Locatie</h2>
            <p className="text-gray-600">
              Hasseltsestraat 123<br />
              3500 Hasselt, België
            </p>
          </div>

          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-[#1e293b]">Contactgegevens</h2>
            <p className="text-gray-600">
              Email: schaakclubokelly@gmail.com<br />
              Telefoon: +32 12 34 56 78
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-[#1e293b]">Openingsuren</h2>
            <p className="text-gray-600">
              Dinsdag: 19:00 - 23:00<br />
              (Wekelijkse clubavond)
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-6 text-2xl font-bold text-[#1e293b]">Neem contact op</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">Naam</label>
              <input
                type="text"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#c4a77d] focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">Email</label>
              <input
                type="email"
                required
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#c4a77d] focus:outline-none"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-bold text-gray-700">Bericht</label>
              <textarea
                required
                rows={5}
                className="w-full rounded-lg border border-gray-300 p-3 focus:border-[#c4a77d] focus:outline-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-[#1e293b] py-3 font-bold text-white transition hover:bg-[#c4a77d]"
            >
              Verzenden
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}