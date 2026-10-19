import Link from 'next/link';

const MAPS_URL =
  'https://www.google.com/maps/place/Kermeta/@50.9473594,5.2548192,106m/data=!3m1!1e3!4m6!3m5!1s0x47c1233cbacacadd:0xd72ce91c6b91fb09!8m2!3d50.9473393!4d5.2551022!16s%2Fg%2F1thw5wlj';

const footerLinks = [
  { href: '/#nieuws', label: 'Nieuws' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#overons', label: 'Over Ons' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="bg-[#5E0000] py-10 text-white">
      <div className="mx-auto grid w-5/6 max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Schaakclub O&apos;Kelly</h3>
          <p className="text-sm text-white/75">
            Kom gezellig schaken bij onze club in Kermt (Hasselt).<br />
            Beginners en gevorderden zijn welkom!
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Contact</h3>
          <p className="text-sm text-white/75">
            De Kermeta<br />
            Diestersteenweg 204<br />
            3510 Kermt (Hasselt)<br />
            <a href="mailto:schaakclubokelly@gmail.com" className="hover:text-white">schaakclubokelly@gmail.com</a>
          </p>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm text-white/75 hover:text-white"
          >
            Bekijk op Google Maps →
          </a>
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-left">Links</h3>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-8 w-5/6 max-w-6xl border-t border-white/20 pt-8 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Schaakclub O&apos;Kelly. Alle rechten voorbehouden.
      </div>
    </footer>
  );
}
