import Calendar from '@/components/Calendar';
import ContactForm from '@/components/ContactForm';
import NieuwsSection from '@/components/NieuwsSection';

const MAPS_URL =
  'https://www.google.com/maps/place/Kermeta/@50.9473594,5.2548192,106m/data=!3m1!1e3!4m6!3m5!1s0x47c1233cbacacadd:0xd72ce91c6b91fb09!8m2!3d50.9473393!4d5.2551022!16s%2Fg%2F1thw5wlj';

export default function Home() {
  return (
    <>
      <section id="home" className="bg-[#F8F4EB] pt-14">
        <div className="mx-auto flex w-5/6 max-w-6xl flex-col items-center gap-10 py-12 md:min-h-[calc(100svh-15rem)] md:flex-row md:items-center md:gap-16 md:py-16">
          <div className="text-center md:basis-1/2 md:text-left lg:basis-3/5">
            <h1 className="font-serif text-4xl font-bold text-[#5E0000] sm:text-5xl md:text-6xl lg:text-7xl">
              Schaakclub<br className="hidden sm:inline" /> O&apos;Kelly
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base text-[#5E0000] md:mx-0 md:mt-8 md:text-lg">
              Welkom bij Schaakclub O&apos;Kelly! Of je nu net begint of al jaren speelt,
              bij ons vind je een gezellige groep schakers om mee te spelen en van te leren.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
              <a
                href="#contact"
                className="rounded-full bg-[#A8312D] px-8 py-3 font-bold text-white transition hover:bg-[#8f2825]"
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

          <div className="flex w-2/3 max-w-sm justify-center md:w-auto md:max-w-none md:basis-2/5 md:justify-end lg:basis-2/5">
            <img
              src="/splash.png"
              alt="Leden van schaakclub O'Kelly tijdens een clubavond"
              width={570}
              height={438}
              decoding="async"
              className="max-w-full rounded-lg"
            />
          </div>
        </div>

        <div className="flex items-center bg-[#A8312D] py-6 md:py-10">
          <div className="mx-auto flex w-5/6 max-w-6xl flex-wrap items-center justify-center gap-6 md:justify-between md:gap-8">
            <img
              src="/sponsors/limburg.gif"
              alt="Provincie Limburg"
              width={98}
              height={94}
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-16"
            />
            <img
              src="/sponsors/kbs.svg"
              alt="Koninklijke Belgische Schaakbond"
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-16"
            />
            <img
              src="/sponsors/hasselt.png"
              alt="Stad Hasselt"
              width={313}
              height={312}
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-14"
            />
          </div>
        </div>
      </section>

      <section id="nieuws" className="bg-[#F8F4EB] py-16 md:py-24">
        <NieuwsSection />
      </section>

      <section id="overons" className="bg-[#A8312D] py-16 text-white md:py-24">
        <div className="mx-auto w-5/6 max-w-6xl">
          <h2 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Over Ons</h2>

          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="rounded-lg bg-white p-6 text-[#5E0000] shadow-md border-t-4 border-[#A8312D] md:p-8">
              <h3 className="mb-4 text-xl font-bold underline decoration-2 underline-offset-4 md:text-2xl">
                Onze Oorsprong
              </h3>
              <p className="text-[#5E0000]">
                Officieel gesticht op <strong>15 februari 1947</strong> onder de benaming Cercle Hasselteois d&apos;Echecs.
                Na sterke internationale resultaten van de Belgische speler <strong>Albéric O´Kelly de Galway</strong>, werd de clubnaam gewijzigd naar Hasseltse Schaakclub O&apos;Kelly.
                In 2005 werd de naam veranderd in <strong>Koninklijke Hasseltse Schaakclub O&apos;Kelly</strong>.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-[#5E0000] shadow-md border-t-4 border-[#A8312D] md:p-8">
              <h3 className="mb-4 text-xl font-bold underline decoration-2 underline-offset-4 md:text-2xl">
                Onze Club
              </h3>
              <p className="text-[#5E0000]">
                Met <strong>meer dan 70 leden</strong> hoort de club bij de grootste van België.
                Van <strong>jong tot oud</strong>, van beginners tot ervaren schakers - iedereen is welkom.
                Elke <strong>vrijdag van 19:00 tot 24:00</strong> is er clubavond in De Kermeta
                (Diestersteenweg 204, Kermt), met wekelijkse clubavonden en toernooien.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 text-[#5E0000] shadow-md border-t-4 border-[#A8312D] md:p-8">
              <h3 className="mb-4 text-xl font-bold underline decoration-2 underline-offset-4 md:text-2xl">
                Onze Activiteiten
              </h3>
              <ul className="space-y-2 text-[#5E0000]">
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

      <section id="agenda" className="bg-[#F8F4EB] py-16 md:py-24">
        <div className="mx-auto w-5/6 max-w-6xl">
          <h2 className="mb-6 font-serif text-3xl font-bold text-[#A8312D] md:text-4xl">
            Agenda
          </h2>
          <p className="mb-8 text-base text-[#5E0000] md:text-lg">
            Bekijk onze kalender voor clubavonden en evenementen.
          </p>

          <Calendar />
        </div>
      </section>

      <section id="contact" className="bg-[#A8312D] py-16 text-white md:py-24">
        <div className="mx-auto w-5/6 max-w-6xl">
          <h2 className="mb-8 font-serif text-3xl font-bold md:text-4xl">Contact</h2>

          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <div className="space-y-6">
              <div className="rounded-lg bg-white/10 p-5 shadow-md md:p-6">
                <h3 className="mb-3 text-lg font-bold md:text-xl">Locatie</h3>
                <p className="text-white/90">
                  De Kermeta<br />
                  Diestersteenweg 204<br />
                  3510 Kermt (Hasselt)
                </p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block font-bold text-white underline"
                >
                  Bekijk op Google Maps →
                </a>
              </div>

              <div className="rounded-lg bg-white/10 p-5 shadow-md md:p-6">
                <h3 className="mb-3 text-lg font-bold md:text-xl">Openingsuren</h3>
                <p className="text-white/90">
                  Vrijdag: 19:00 - 24:00<br />
                  (Wekelijkse clubavond)
                </p>
              </div>

              <div className="rounded-lg bg-white/10 p-5 shadow-md md:p-6">
                <h3 className="mb-3 text-lg font-bold md:text-xl">Email</h3>
                <p className="text-white/90">
                  <a href="mailto:schaakclubokelly@gmail.com" className="underline">
                    schaakclubokelly@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-white/10 p-5 shadow-md md:p-8">
              <h3 className="mb-6 text-xl font-bold md:text-2xl">Neem contact op</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
