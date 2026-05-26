"use client";

import Link from "next/link";

export default function ReceiptSentState({ token }: { token: string }) {
  return (
    <div className="mx-auto mt-12 flex max-w-[520px] flex-col items-center gap-3.5 rounded-[20px] border border-gray-200 bg-white p-6 text-center shadow-sm sm:p-8">
      <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-emerald-200 bg-emerald-50 text-emerald-600">
        <svg
          viewBox="0 0 80 80"
          width="64"
          height="64"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="40" cy="40" r="34" />
          <polyline points="26 42 36 52 56 30" />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
        Kvitto skickat
      </h2>

      <p className="max-w-[380px] text-sm leading-relaxed text-gray-600">
        Vi har skickat kvittot till <strong className="font-semibold text-gray-900">du@example.se</strong>.
        Det dyker upp inom någon minut.
      </p>

      <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3.5 text-left">
        <div className="flex items-baseline justify-between text-sm">
          <span className="text-gray-700">Demo-handlare</span>
          <strong className="font-mono font-semibold text-gray-900">319,00 kr</strong>
        </div>
        <div className="mt-1 flex items-baseline justify-between text-xs text-gray-500">
          <span>#{token.slice(0, 8)}… · 2026-05-26</span>
          <span>Visa Debit</span>
        </div>
      </div>

      <div className="mt-1 flex flex-wrap justify-center gap-2">
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-[18px] py-[11px] text-sm font-semibold text-emerald-900 shadow-sm transition-all hover:-translate-y-px hover:border-emerald-200 hover:bg-emerald-50 active:translate-y-0"
        >
          Skicka till en annan
        </button>
        <Link
          href={`/r/demo/${token}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#00e58e] px-[18px] py-[11px] text-sm font-bold text-emerald-900 shadow-[0_4px_10px_rgba(0,229,142,0.25),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-px hover:bg-emerald-300 hover:shadow-[0_6px_14px_rgba(0,229,142,0.32)] active:translate-y-0"
        >
          Visa kvittot
        </Link>
      </div>
    </div>
  );
}
