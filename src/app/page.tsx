import Calendar from '@/components/Calendar';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import NieuwsSection from '@/components/NieuwsSection';

const MAPS_URL =
  'https://www.google.com/maps/place/Kermeta/@50.9473594,5.2548192,106m/data=!3m1!1e3!4m6!3m5!1s0x47c1233cbacacadd:0xd72ce91c6b91fb09!8m2!3d50.9473393!4d5.2551022!16s%2Fg%2F1thw5wlj';

// Every section fills exactly one window. The navbar is fixed (3.5rem), so the
// lower sections are one window minus the bar and anchors land just below it,
// keeping the section boundary visible while scrolling.
export default function Home() {
  return (
    <>
      <section id="home" className="flex min-h-[100svh] flex-col bg-[#F8F4EB] pt-14">
        <div className="mx-auto flex w-5/6 max-w-6xl flex-1 flex-col items-center justify-center gap-8 py-8 md:flex-row md:gap-16 md:py-10">
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
                Word lid
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

        <div className="flex shrink-0 items-center bg-[#A8312D] py-5 md:py-8">
          <div className="mx-auto flex w-5/6 max-w-6xl flex-wrap items-center justify-center gap-6 md:justify-between md:gap-8">
            <img
              src="/sponsors/limburg.gif"
              alt="Provincie Limburg"
              width={98}
              height={94}
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-14"
            />
            <img
              src="/sponsors/kbs.svg"
              alt="Koninklijke Belgische Schaakbond"
              width={98}
              height={150}
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-14"
            />
            <img
              src="/sponsors/hasselt.png"
              alt="Stad Hasselt"
              width={313}
              height={312}
              loading="lazy"
              className="max-h-10 w-auto object-contain md:max-h-12"
            />
          </div>
        </div>
      </section>

      <section id="nieuws" className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-[#F8F4EB]">
        <div className="mx-auto flex min-h-0 w-5/6 max-w-6xl flex-1 flex-col pb-8 pt-4 md:pb-10 md:pt-8">
          <NieuwsSection />
        </div>
      </section>

      <section id="overons" className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-[#A8312D] text-white">
        <div className="mx-auto flex w-5/6 max-w-6xl flex-1 flex-col pb-8 pt-4 md:pb-10 md:pt-8">
          <h2 className="shrink-0 font-serif text-3xl font-bold md:text-4xl">Over ons</h2>

          <div className="mt-3 grid gap-2 md:my-auto md:grid-cols-3 md:gap-4 lg:h-[clamp(25rem,50vh,28rem)]">
            <div className="flex flex-col rounded-2xl bg-[#F8F4EB] p-3 text-[#5E0000] shadow-md md:justify-between md:p-7">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65">
                Geschiedenis
              </h3>
              <div className="mt-1.5 md:mt-0">
                <p className="text-sm leading-relaxed">
                  Officieel gesticht op <strong>15 februari 1947</strong> onder de benaming
                  Cercle Hasselteois d&apos;Echecs. Na sterke internationale resultaten van
                  de Belgische speler <strong>Albéric O&apos;Kelly de Galway</strong> werd de
                  clubnaam gewijzigd naar Hasseltse Schaakclub O&apos;Kelly. In 2005 werd dat
                  de <strong>Koninklijke Hasseltse Schaakclub O&apos;Kelly</strong>.
                </p>
              </div>
              <div className="mt-3 hidden h-20 items-baseline gap-3 border-t border-[#5E0000]/15 pt-4 md:flex">
                <span className="font-serif text-5xl font-bold text-[#A8312D]">1947</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65">
                  Opgericht
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-white/10 p-3 shadow-md backdrop-blur md:justify-between md:p-7">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                De club
              </h3>
              <div className="mt-1.5 md:mt-0">
                <p className="text-sm leading-relaxed text-white/90">
                  Met <strong>meer dan 70 leden</strong> hoort de club bij de grootste van
                  België. Van <strong>jong tot oud</strong>, van beginners tot ervaren
                  schakers: iedereen is welkom. Elke vrijdag is er clubavond in De Kermeta,
                  met wekelijkse clubavonden en toernooien.
                </p>
              </div>
              <div className="mt-3 hidden h-20 items-baseline gap-3 border-t border-white/20 pt-4 md:flex">
                <span className="font-serif text-5xl font-bold">70+</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
                  Leden
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-2xl bg-[#F8F4EB] p-3 text-[#5E0000] shadow-md md:justify-between md:p-7">
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65">
                Competitie
              </h3>
              <div className="mt-1.5 md:mt-0">
                <ul className="space-y-1 text-sm leading-relaxed">
                  <li>
                    <a
                      href="https://limliga.be/lic-lik-50/lic-stand"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#A8312D]/40 underline-offset-2 hover:decoration-[#A8312D]"
                    >
                      <strong>LIC</strong> (Limburgse Interclub)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://blog.frbe-kbsb-ksb.be/nl/interclubs-2024-25-openbare-weergave/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#A8312D]/40 underline-offset-2 hover:decoration-[#A8312D]"
                    >
                      <strong>NIC</strong> (Nationale Interclub)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://limliga.be/lic-lik-50/lik-swarresults"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#A8312D]/40 underline-offset-2 hover:decoration-[#A8312D]"
                    >
                      <strong>LIK</strong> (Limburgs Individueel)
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://limliga.be/lic-lik-50/lik-50-swarresults"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-[#A8312D]/40 underline-offset-2 hover:decoration-[#A8312D]"
                    >
                      <strong>LIK 50+</strong> (Limburgs Individueel 50 plussers)
                    </a>
                  </li>
                  <li><strong>Clubkampioenschap</strong></li>
                  <li><strong>Interne toernooien</strong></li>
                </ul>
              </div>
              <div className="mt-3 hidden h-20 items-baseline gap-3 border-t border-[#5E0000]/15 pt-4 md:flex">
                <span className="font-serif text-5xl font-bold text-[#A8312D]">6</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5E0000]/65">
                  Reeksen &amp; toernooien
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-[#F8F4EB]">
        <div className="mx-auto flex w-5/6 max-w-6xl flex-1 flex-col pb-8 pt-4 md:pb-10 md:pt-8">
          <h2 className="mb-4 font-serif text-3xl font-bold text-[#A8312D] md:mb-2 md:text-4xl">
            Agenda
          </h2>
          <p className="mb-6 hidden text-base text-[#5E0000] md:block md:text-lg">
            Bekijk onze kalender voor clubavonden en evenementen.
          </p>

          <div className="flex flex-1 items-center">
            <div className="w-full">
              <Calendar />
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="flex min-h-[calc(100svh-3.5rem)] flex-col bg-[#A8312D] text-white">
        <div className="mx-auto flex w-5/6 max-w-6xl flex-1 flex-col pb-4 pt-4 md:pb-8 md:pt-8">
          <h2 className="mb-3 shrink-0 font-serif text-3xl font-bold md:mb-4 md:text-4xl">Contact</h2>

          <div className="flex flex-1 items-center">
            <div className="grid w-full gap-3 md:grid-cols-2 md:gap-10">
              <div className="space-y-2 md:space-y-4">
                <div className="rounded-lg bg-white/10 p-3 shadow-md md:p-5">
                  <h3 className="mb-1 text-sm font-bold md:mb-2 md:text-lg">Locatie</h3>
                  <p className="text-xs text-white/90 md:text-base">
                    De Kermeta<br />
                    Diestersteenweg 204<br />
                    3510 Kermt (Hasselt)
                  </p>
                  <a
                    href={MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-xs font-bold text-white underline md:text-sm"
                  >
                    Bekijk op Google Maps →
                  </a>
                </div>

                <div className="rounded-lg bg-white/10 p-3 shadow-md md:p-5">
                  <h3 className="mb-1 text-sm font-bold md:mb-2 md:text-lg">Openingsuren</h3>
                  <p className="text-xs text-white/90 md:text-base">
                    Vrijdag: 19:00 - 24:00<br />
                    (Wekelijkse clubavond)
                  </p>
                </div>

                <div className="rounded-lg bg-white/10 p-3 shadow-md md:p-5">
                  <h3 className="mb-1 text-sm font-bold md:mb-2 md:text-lg">E-mail</h3>
                  <p className="text-xs text-white/90 md:text-base">
                    <a href="mailto:schaakclubokelly@gmail.com" className="underline">
                      schaakclubokelly@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-white/10 p-3 shadow-md md:p-6">
                <h3 className="mb-2 text-base font-bold md:mb-3 md:text-lg">Neem contact op</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </section>
    </>
  );
}
