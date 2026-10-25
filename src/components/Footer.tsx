import Link from 'next/link';

const footerLinks = [
  { href: '/#nieuws', label: 'Nieuws' },
  { href: '/#overons', label: 'Over ons' },
  { href: '/#agenda', label: 'Agenda' },
  { href: '/#contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer role="contentinfo" className="shrink-0 bg-[#5E0000] text-white">
      <div className="mx-auto flex w-5/6 max-w-6xl flex-col gap-2 py-4 text-xs text-white/70 md:flex-row md:items-center md:justify-between">
        <p className="font-bold text-white">
          &copy; {new Date().getFullYear()} Schaakclub O&apos;Kelly
        </p>

        <p>
          De Kermeta · Diestersteenweg 204 · 3510 Kermt (Hasselt)
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <a href="mailto:schaakclubokelly@gmail.com" className="hover:text-white">
            schaakclubokelly@gmail.com
          </a>
          <span className="hidden text-white/25 md:inline">|</span>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
