"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar({
  brand,
}: {
  brand: { primary: string; dark: string };
}) {
  const [elevated, setElevated] = useState(false);
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

        <div className="hidden gap-1 md:flex">
          <NavLink href="#services" label="Tjänster" />
          <NavLink href="#how" label="Så funkar det" />
          <NavLink href="#stats" label="Statistik" />
          <NavLink href="#faq" label="FAQ" />
          <NavLink href="#contact" label="Kontakt" />
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="#contact"
            className="rounded-xl border border-emerald-300/60 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            Boka demo
          </Link>
        </div>
      </nav>
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
