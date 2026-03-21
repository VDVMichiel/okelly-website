'use client';

import { useState } from 'react';
import Link from 'next/link';
import Calendar from '@/components/Calendar';
import NieuwsSection from '@/components/NieuwsSection';

export default function Home() {
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

  return (
    <>
      <section id="home" className="bg-[#F8F4EB] pt-14">
        <div className="mx-auto flex h-[calc(100vh-175px)] w-5/6 items-center justify-center">
          <div className="z-10 md:basis-3/5">
            <div className="relative">
              <h1 className="text-5xl font-bold text-[#5E0000] md:text-7xl">
                Schaakclub<br />O'Kelly
              </h1>
            </div>
            <p className="mt-8 text-lg text-[#5E0000]">
              Welkom bij Schaakclub O'Kelly! Of je nu net begint of al jaren speelt, 
              bij ons vind je een gezellige groep schakers om mee te spelen en van te leren.
            </p>
            <div className="mt-8 flex items-center gap-8">
              <a
                href="#contact"
                className="rounded-full bg-[#A8312D] px-8 py-3 font-bold text-white transition hover:font-bold"
              >
                Word Lid
              </a>
              <a
                href="#overons"
                className="text-sm font-bold text-[#5E0000] underline"
              >
                Meer informatie
              </a>
            </div>
          </div>

          <div className="hidden basis-3/5 justify-center md:flex md:ml-40 md:justify-end">
            <img
              src="/splash.png"
              alt="Schakers"
              className="max-w-full rounded-lg"
            />
          </div>
        </div>

        <div className="flex h-[120px] shrink-0 items-center justify-center bg-[#A8312D]">
          <div className="mx-auto flex w-5/6 items-center justify-between gap-8">
            <img
              src="/sponsors/limburg.gif"
              alt="LimLIGA"
              className="max-h-[80px] w-auto object-contain"
            />
            <img
              src="/sponsors/kbs.svg"
              alt="KBS"
              className="max-h-[80px] w-auto object-contain"
            />
            <img
              src="/sponsors/hasselt.png"
              alt="Hasselt"
              className="max-h-[60px] w-auto object-contain"
            />
          </div>
        </div>
      </section>

      <section id="nieuws" className="min-h-screen bg-[#F8F4EB] py-20">
        <NieuwsSection />
      </section>

      <section id="overons" className="min-h-screen bg-[#A8312D] py-20 text-white">
        <div className="mx-auto w-5/6">
          <h2 className="mb-8 text-4xl font-bold">Over Ons</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-10 text-[#5E0000] shadow-md min-h-[350px] border-t-4 border-[#A8312D]">
              <h3 className="mb-4 text-2xl font-bold underline decoration-2 underline-offset-4">Onze Oorsprong</h3>
              <p className="text-[#5E0000]">
                Officieel gesticht op <strong>15 februari 1947</strong> onder de benaming Cercle Hasselteois d'Echecs. 
                Na sterke internationale resultaten van de Belgische speler <strong>Albéric O´Kelly de Galway</strong>, werd de clubnaam gewijzigd naar Hasseltse Schaakclub O'Kelly. 
                In 2005 werd de naam veranderd in <strong>Koninklijke Hasseltse Schaakclub O'Kelly</strong>.
              </p>
            </div>

            <div className="rounded-lg bg-white p-10 text-[#5E0000] shadow-md min-h-[350px] border-t-4 border-[#A8312D]">
              <h3 className="mb-4 text-2xl font-bold underline decoration-2 underline-offset-4">Onze Club</h3>
              <p className="text-[#5E0000]">
                Met <strong>meer dan 70 leden</strong> hoort de club bij de grootste van België. 
                Van <strong>jong tot oud</strong>, van beginners tot ervaren schakers - iedereen is welkom. 
                We organiseren wekelijkse clubavonden en toernooien.
              </p>
            </div>

            <div className="rounded-lg bg-white p-10 text-[#5E0000] shadow-md min-h-[350px] border-t-4 border-[#A8312D]">
              <h3 className="mb-4 text-2xl font-bold underline decoration-2 underline-offset-4">Onze Activiteiten</h3>
              <ul className="text-[#5E0000] space-y-2">
                <li><strong>LIC</strong> (Limburgse Interclub Competitie)</li>
                <li><strong>NIC</strong> (Nationale Interclub Competitie)</li>
                <li><strong>LIK</strong> (Limburgs Individueel Kampioenschap)</li>
                <li><strong>Clubkampioenschap</strong></li>
                <li><strong>Interne toernooien</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="min-h-screen bg-[#F8F4EB] py-20">
        <div className="mx-auto w-5/6">
          <h2 className="mb-8 text-4xl font-bold text-[#A8312D]">Agenda</h2>
          <p className="mb-8 text-lg text-[#5E0000]">
            Bekijk onze kalender voor clubavonden en evenementen.
          </p>
          
          <Calendar />
        </div>
      </section>

      <section id="contact" className="min-h-screen bg-[#A8312D] py-20 text-white">
        <div className="mx-auto w-5/6">
          <h2 className="mb-8 text-4xl font-bold">Contact</h2>
          
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-lg bg-white/10 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold">Locatie</h3>
                <p className="text-white/90">
                  De Kermeta<br />
                  Diestersteenweg 204<br />
                  3510 Kermt (Hasselt)
                </p>
                <a 
                  href="https://www.google.com/maps/place/Kermeta/@50.9473594,5.2548192,106m/data=!3m1!1e3!4m6!3m5!1s0x47c1233cbacacadd:0xd72ce91c6b91fb09!8m2!3d50.9473393!4d5.2551022!16s%2Fg%2F1thw5wlj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white font-bold underline hover:font-bold mt-2 inline-block"
                >
                  Bekijk op Google Maps →
                </a>
              </div>

              <div className="rounded-lg bg-white/10 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold">Openingsuren</h3>
                <p className="text-white/90">
                  Vrijdag: 19:00 - 24:00<br />
                  (Wekelijkse clubavond)
                </p>
              </div>

              <div className="rounded-lg bg-white/10 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold">Email</h3>
                <p className="text-white/90">
                  info@schaakclubokelly.be
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white/10 p-8 shadow-md">
              <h3 className="mb-6 text-2xl font-bold">Neem contact op</h3>
              {formStatus === 'success' ? (
                <div className="text-center py-8">
                  <p className="text-xl font-bold mb-2">Bedankt!</p>
                  <p>Je bericht is verzonden. We nemen snel contact met je op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">Naam</label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-bold text-white">Bericht</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-lg border border-white/20 bg-white/90 p-3 text-[#5E0000] focus:border-[#F8F4EB] focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full rounded-full bg-[#F8F4EB] py-3 font-bold text-[#A8312D] transition hover:font-bold disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'Verzenden...' : 'Verzenden'}
                  </button>
                  {formStatus === 'error' && (
                    <p className="text-white text-sm">Er ging iets mis. Probeer opnieuw.</p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
