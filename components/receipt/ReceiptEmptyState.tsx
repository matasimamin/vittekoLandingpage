"use client";

import Link from "next/link";

export default function ReceiptEmptyState({ token }: { token?: string }) {
  return (
    <div className="mx-auto mt-12 flex max-w-[520px] flex-col items-center gap-3.5 rounded-[20px] border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-gray-200 bg-gray-50 text-gray-400">
        <svg
          viewBox="0 0 80 80"
          width="80"
          height="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 8h36v60l-9-5-9 5-9-5-9 5z" />
          <line x1="30" y1="22" x2="50" y2="22" />
          <line x1="30" y1="32" x2="50" y2="32" />
          <line x1="30" y1="42" x2="42" y2="42" />
          <circle cx="62" cy="62" r="11" />
          <line x1="56" y1="62" x2="68" y2="62" />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Inget kvitto hittades
      </h2>

      <p className="max-w-[380px] text-sm leading-relaxed text-gray-600">
        Länken kan ha gått ut eller raderats. Kontrollera att du följt länken
        från ditt senaste tap, eller kontakta handlaren för en ny kopia.
      </p>

      <div className="mt-1 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-[18px] py-[11px] text-sm font-semibold text-emerald-900 shadow-sm transition-all hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 active:translate-y-0"
        >
          Försök igen
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00e58e] px-[18px] py-[11px] text-sm font-bold text-emerald-900 shadow-[0_4px_10px_rgba(0,229,142,0.25),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-px hover:bg-emerald-300 hover:shadow-[0_6px_14px_rgba(0,229,142,0.32)] active:translate-y-0"
        >
          Tillbaka till startsidan
        </Link>
      </div>

      {token && (
        <span className="font-mono text-xs text-gray-500">
          Sökt verifieringskod · {token}
        </span>
      )}
    </div>
  );
}
