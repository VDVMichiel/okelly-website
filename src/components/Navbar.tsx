'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#nieuws', label: 'Nieuws' },
  { href: '#overons', label: 'Over ons' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname !== '/') {
      window.location.href = '/' + href;
      return;
    }

    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#F8F4EB] h-14 flex items-center shadow-md">
      <div className="mx-auto flex w-5/6 max-w-6xl items-center justify-between">
        <a href="/" className="flex items-center">
          <img src="/logo.png" alt="Schaakclub O'Kelly" className="h-9 w-auto md:h-10" />
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-bold text-[#5E0000] hover:text-[#A8312D]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="rounded-full bg-[#A8312D] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#8f2825]"
          >
            Word lid
          </a>
        </div>

        <button
          className="md:hidden rounded-full bg-[#A8312D] p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Menu sluiten' : 'Menu openen'}
        >
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 top-full w-full max-h-[calc(100dvh-3.5rem)] overflow-y-auto bg-[#F8F4EB] p-6 shadow-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-bold text-[#5E0000]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mt-2 rounded-full bg-[#A8312D] px-6 py-3 text-center text-base font-bold text-white"
            >
              Word lid
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
