'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xpqyelpv', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  if (formStatus === 'success') {
    return (
      <div className="text-center py-8">
        <p className="text-xl font-bold mb-2">Bedankt!</p>
        <p>Je bericht is verzonden. We nemen snel contact met je op.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-white">
          Naam
        </label>
        <input
          type="text"
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-white">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          name="email"
          autoComplete="email"
          required
          className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-white">
          Bericht
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={formStatus === 'submitting'}
        className="w-full rounded-full bg-[#F8F4EB] py-3 font-bold text-[#A8312D] transition hover:bg-white disabled:opacity-50"
      >
        {formStatus === 'submitting' ? 'Verzenden...' : 'Verzenden'}
      </button>
      {formStatus === 'error' && (
        <p className="text-white text-sm">Er ging iets mis. Probeer opnieuw.</p>
      )}
    </form>
  );
}
