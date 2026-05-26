"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar({
  brand,
  hideCta = false,
}: {
  brand: { primary: string; dark: string };
  hideCta?: boolean;
}) {
  const [elevated, setElevated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 transition-shadow ${
        elevated ? "shadow-sm" : "shadow-none"
      }`}
      role="banner"
    >
      <nav
        aria-label="Huvud"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3"
      >
        <Link
          href="/"
          className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 rounded"
        >
          <span
            aria-hidden
            className="inline-block h-6 w-6 rounded-md"
            style={{ background: brand.primary }}
          />
          <span
            className="text-2xl font-extrabold"
            style={{ color: brand.primary }}
          >
            Vitteko
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink href="#services" label="Tjänster" />
          <NavLink href="#how" label="Så funkar det" />
          <NavLink href="#stats" label="Statistik" />
          <NavLink href="#faq" label="FAQ" />
          <NavLink href="#contact" label="Kontakt" />
          <Link
            href="/login"
            className="ml-2 rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Logga in
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {!hideCta && (
            <Link
              href="#contact"
              className="rounded-xl border border-emerald-300/60 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Boka demo
            </Link>
          )}

          <button
            type="button"
            aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden rounded-lg p-2 text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
              aria-hidden="true"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-emerald-100 bg-white/95 backdrop-blur px-6 pb-4 pt-2">
          <div className="flex flex-col gap-1">
            <MobileNavLink href="#services" label="Tjänster" onClick={() => setMenuOpen(false)} />
            <MobileNavLink href="#how" label="Så funkar det" onClick={() => setMenuOpen(false)} />
            <MobileNavLink href="#stats" label="Statistik" onClick={() => setMenuOpen(false)} />
            <MobileNavLink href="#faq" label="FAQ" onClick={() => setMenuOpen(false)} />
            <MobileNavLink href="#contact" label="Kontakt" onClick={() => setMenuOpen(false)} />
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Logga in
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-900/80 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {label}
    </a>
  );
}

function MobileNavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="rounded-lg px-3 py-2 text-sm font-medium text-emerald-900/80 hover:bg-emerald-50 hover:text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      {label}
    </a>
  );
}
