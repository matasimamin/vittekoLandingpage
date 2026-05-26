"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { jsPDF } from "jspdf";

type ApiItem = {
  Name: string;
  UnitPrice: number;
  Quantity: number;
};

type ReceiptData = {
  Items: ApiItem[];
  Currency: string;
  PaymentMethod: string;
  Note?: string;
};

interface ReceiptViewProps {
  receipt: ReceiptData;
  token: string;
  vendorId: string;
}

// ── Hardcoded demo data ────────────────────────────────────────────

const MOMS_RATE = 0.25;

const MERCHANT = {
  name: "ICA Maxi Lindhagen",
  orgNr: "556123-4567",
  address: "Lindhagensgatan 76, 112 18 Stockholm",
  phone: "08-123 45 67",
};

const PAYMENT_INFO = {
  method: "Kontaktlös betalning",
  cardType: "Visa Debit",
  cardNumber: "**** **** **** 4829",
  reference: "TXN-20260526-00142",
  authCode: "A7B3F2",
};

const TECHNICAL_INFO: Record<string, string> = {
  AID: "A0000000031010",
  ATC: "002F",
  ARC: "00",
  TSI: "E800",
  TVR: "0000008000",
  "Terminal-ID": "VTK-T1-0042",
  UUID: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
};

// ── Icons ──────────────────────────────────────────────────────────

function IconDownload() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function IconChevron() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconCard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="6" width="20" height="13" rx="2" />
      <line x1="2" y1="11" x2="22" y2="11" />
    </svg>
  );
}

function IconCopy() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconStore() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l1-5h16l1 5" />
      <path d="M4 9v11h16V9" />
      <path d="M9 20v-6h6v6" />
    </svg>
  );
}

// ── Toast ───────────────────────────────────────────────────────────

function Toast({ message, visible }: { message: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="fixed inset-x-0 top-4 z-[100] flex justify-center animate-[toast-in_0.3s_cubic-bezier(0.16,1,0.3,1)]">
      <div className="inline-flex items-center gap-2.5 rounded-full bg-gray-900 px-4 py-2.5 text-[13.5px] font-medium text-white shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-[#00e58e] shadow-[0_0_0_3px_rgba(0,229,142,0.25)]" />
        {message}
      </div>
    </div>
  );
}

// ── Copy Button ─────────────────────────────────────────────────────

function CopyButton({
  value,
  onToast,
}: {
  value: string;
  onToast: (msg: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      onToast(`${value} kopierat`);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      onToast("Kunde inte kopiera");
    }
  };
  return (
    <button
      className={`inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md border transition-colors ${
        copied
          ? "border-emerald-300 bg-emerald-100 text-emerald-700"
          : "border-gray-200 bg-white text-gray-500 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
      }`}
      onClick={onClick}
      aria-label="Kopiera"
    >
      {copied ? <IconCheck /> : <IconCopy />}
    </button>
  );
}

// ── Accordion ───────────────────────────────────────────────────────

function Accordion({
  title,
  badge,
  defaultOpen = false,
  children,
}: {
  title: string;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-200 first:border-t">
      <button
        className="group flex w-full items-center gap-3 px-1 py-[18px] text-left text-emerald-900 hover:text-gray-900"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="min-w-0 flex-1 text-[14.5px] font-semibold leading-snug">
          {title}
        </span>
        {badge}
        <span
          className={`inline-flex shrink-0 text-gray-400 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-emerald-700 ${
            open ? "rotate-180 text-emerald-700" : ""
          }`}
        >
          <IconChevron />
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <div className={open ? "px-1 pb-5 pt-1" : "px-1"}>{children}</div>
        </div>
      </div>
    </div>
  );
}

// ── Barcode ─────────────────────────────────────────────────────────

function Barcode({ w = 240, h = 44, label }: { w?: number; h?: number; label?: string }) {
  const bars = useMemo(() => {
    const arr: { x: number; bw: number }[] = [];
    let x = 4;
    const seq = [3, 1, 2, 1, 4, 2, 1, 3, 2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 3, 2, 1, 4, 1, 2, 3, 1, 2, 1];
    let i = 0;
    while (x < w - 4) {
      const bw = seq[i % seq.length];
      const gap = (seq[(i + 5) % seq.length] % 3) + 1;
      arr.push({ x, bw });
      x += bw + gap;
      i++;
    }
    return arr;
  }, [w]);

  return (
    <div className="flex flex-col items-center gap-1.5 text-gray-900">
      <svg width={w} height={h} aria-hidden="true">
        {bars.map((b, i) => (
          <rect key={i} x={b.x} y={2} width={b.bw} height={h - 14} fill="currentColor" />
        ))}
      </svg>
      {label && (
        <span className="font-mono text-[11px] tracking-[0.15em] text-gray-500">
          {label}
        </span>
      )}
    </div>
  );
}

// ── Info Row ────────────────────────────────────────────────────────

function InfoRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-gray-100 py-2.5 last:border-b-0">
      <dt className="text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500">
        {label}
      </dt>
      <dd className={`text-sm text-gray-900 ${mono ? "font-mono" : ""}`}>
        {value}
      </dd>
    </div>
  );
}

// ── Main Component ──────────────────────────────────────────────────

export default function ReceiptView({ receipt, token }: ReceiptViewProps) {
  const [toastMsg, setToastMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMsg(msg);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2600);
  }, []);

  const [timestamp, setTimestamp] = useState({ date: "", time: "" });
  useEffect(() => {
    const now = new Date();
    setTimestamp({
      date: now.toLocaleDateString("sv-SE"),
      time: now.toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    });
  }, []);

  const currencyLabel = receipt.Currency === "SEK" ? "kr" : receipt.Currency;

  const fmt = (n: number) =>
    (Math.round(n * 100) / 100).toFixed(2).replace(".", ",") + ` ${currencyLabel}`;

  const momsPercent = (MOMS_RATE * 100).toFixed(0);

  const totals = useMemo(() => {
    const gross = receipt.Items.reduce(
      (sum, item) => sum + item.UnitPrice * item.Quantity,
      0
    );
    const netto = gross / (1 + MOMS_RATE);
    const moms = gross - netto;
    return { gross, netto, moms };
  }, [receipt.Items]);

  const handlePdfDownload = useCallback(() => {
    const label = receipt.Currency === "SEK" ? "kr" : receipt.Currency;
    const f = (n: number) =>
      (Math.round(n * 100) / 100).toFixed(2).replace(".", ",") + ` ${label}`;
    const mp = (MOMS_RATE * 100).toFixed(0);

    const doc = new jsPDF();
    const right = doc.internal.pageSize.getWidth() - 20;
    let y = 20;

    const drawLine = () => {
      doc.setLineWidth(0.3);
      doc.line(20, y, right, y);
      y += 8;
    };
    const checkPage = () => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("VITTEKO – DIGITALT KVITTO", 20, y);
    y += 14;

    // Merchant
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Handlare", 20, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(MERCHANT.name, 20, y); y += 5;
    doc.text(`Org.nr: ${MERCHANT.orgNr}`, 20, y); y += 5;
    doc.text(MERCHANT.address, 20, y); y += 5;
    doc.text(`Tel: ${MERCHANT.phone}`, 20, y); y += 10;

    // Timestamp
    doc.text(`Datum: ${timestamp.date}    Tid: ${timestamp.time}`, 20, y);
    y += 10;
    drawLine();

    // Items
    doc.setFont("helvetica", "bold");
    doc.text("Varor", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");

    receipt.Items.forEach((item) => {
      const lineTotal = item.UnitPrice * item.Quantity;
      doc.text(item.Name, 20, y);
      doc.text(`${item.Quantity} × ${f(item.UnitPrice)}`, 90, y);
      doc.text(`${mp}%`, 145, y);
      doc.text(f(lineTotal), right, y, { align: "right" });
      y += 7;
      checkPage();
    });

    y += 3;
    drawLine();

    // Summary
    doc.text("Netto", 20, y);
    doc.text(f(totals.netto), right, y, { align: "right" });
    y += 6;
    doc.text(`Moms (${mp}%)`, 20, y);
    doc.text(f(totals.moms), right, y, { align: "right" });
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Att betala", 20, y);
    doc.text(f(totals.gross), right, y, { align: "right" });
    y += 10;
    drawLine();

    // Payment
    doc.setFont("helvetica", "bold");
    doc.text("Betalning", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Betalningsform: ${PAYMENT_INFO.method}`, 20, y); y += 5;
    doc.text(`Kort: ${PAYMENT_INFO.cardType}`, 20, y); y += 5;
    doc.text(`Kortnummer: ${PAYMENT_INFO.cardNumber}`, 20, y); y += 5;
    doc.text(`Referens: ${PAYMENT_INFO.reference}`, 20, y); y += 5;
    doc.text(`Auth-kod: ${PAYMENT_INFO.authCode}`, 20, y); y += 10;
    drawLine();

    // Technical
    doc.setFont("helvetica", "bold");
    doc.text("Teknisk information", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    Object.entries(TECHNICAL_INFO).forEach(([key, val]) => {
      doc.text(`${key}: ${val}`, 20, y);
      y += 5;
      checkPage();
    });
    y += 5;
    drawLine();

    // Footer
    doc.text(`Verifieringskod: ${token}`, 20, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.text("Verifierat via Vitteko", 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.text("Tack för ditt köp!", 20, y);

    doc.save(`Vitteko-kvitto-${token}.pdf`);
    showToast("Kvitto laddat ner som PDF");
  }, [receipt, token, totals, timestamp, showToast]);

  return (
    <>
      <Toast message={toastMsg} visible={toastVisible} />

      <div className="mx-auto flex max-w-[560px] flex-col gap-7 lg:max-w-[640px] lg:gap-9">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section
          className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-gray-200 p-7 text-center shadow-sm sm:p-9 lg:rounded-[28px] lg:p-11"
          style={{
            background: `
              radial-gradient(540px 280px at 50% 0%, rgba(0,229,142,0.22), transparent 60%),
              radial-gradient(420px 240px at 100% 90%, rgba(0,126,108,0.14), transparent 60%),
              #fff
            `,
          }}
        >
          <div className="mb-3.5 inline-flex h-16 w-16 items-center justify-center rounded-[18px] border border-emerald-200 bg-white text-emerald-700 shadow-sm">
            <IconStore />
          </div>

          <h1 className="text-[clamp(22px,5vw,30px)] font-extrabold leading-tight tracking-tight text-gray-900">
            Digitalt kvitto
          </h1>

          <p className="mt-1 text-[13.5px] font-medium text-gray-700">
            {MERCHANT.name}
          </p>
          <p className="mt-0.5 text-[12px] text-gray-500">
            {timestamp.date} &middot; {timestamp.time}
          </p>

          {/* Total */}
          <div className="mt-5 flex w-full flex-col items-center gap-0.5 border-y border-dashed border-gray-200 py-4">
            <span className="text-[10.5px] font-bold uppercase tracking-[0.1em] text-gray-500">
              Att betala
            </span>
            <span className="font-mono text-[clamp(40px,9vw,54px)] font-bold leading-none tracking-tight text-gray-900">
              {fmt(totals.gross)}
            </span>
          </div>

          {/* Payment method */}
          <p className="mt-3 inline-flex items-center gap-2 text-[13px] text-gray-600">
            <IconCard />
            {PAYMENT_INFO.method}
          </p>

          {/* Actions */}
          <div className="mt-[18px] grid w-full grid-cols-1 gap-2">
            <button
              onClick={handlePdfDownload}
              className="inline-flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#00e58e] px-2 py-3 text-[13px] font-bold text-emerald-900 shadow-[0_4px_10px_rgba(0,229,142,0.28),0_1px_2px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-px hover:bg-emerald-300 hover:shadow-[0_6px_14px_rgba(0,229,142,0.32)] active:translate-y-0"
            >
              <IconDownload />
              <span>Ladda ner som PDF</span>
            </button>
          </div>

          {/* Verification badge */}
          <span className="mt-4 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-emerald-700">
            <IconLock />
            Verifierat via Vitteko
          </span>
        </section>

        {/* ── Accordion sections ─────────────────────────────── */}
        <div className="flex flex-col">
          {/* Items (dynamic) */}
          <Accordion
            title={`Varor · ${receipt.Items.length} st · ${fmt(totals.gross)}`}
            defaultOpen
          >
            <ul className="flex flex-col">
              {receipt.Items.map((item, i) => {
                const lineTotal = item.UnitPrice * item.Quantity;
                return (
                  <li
                    key={i}
                    className="flex items-start justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[14.5px] font-medium leading-snug text-gray-900">
                        {item.Name}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {item.Quantity} &times; {fmt(item.UnitPrice)} &middot;{" "}
                        {momsPercent}% moms
                      </div>
                    </div>
                    <div className="shrink-0 whitespace-nowrap font-mono text-sm font-semibold text-gray-900">
                      {fmt(lineTotal)}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Totals summary */}
            <div className="mt-3.5 flex flex-col gap-1.5 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-baseline justify-between gap-4 text-sm text-gray-600">
                <span>Netto</span>
                <span className="font-mono">{fmt(totals.netto)}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 text-sm text-gray-600">
                <span>Moms ({momsPercent}%)</span>
                <span className="font-mono">{fmt(totals.moms)}</span>
              </div>
              <div className="flex items-baseline justify-between gap-4 border-t border-gray-200 pt-2.5 text-base font-bold text-gray-900">
                <span>Att betala</span>
                <span className="font-mono">{fmt(totals.gross)}</span>
              </div>
            </div>
          </Accordion>

          {/* Merchant (hardcoded) */}
          <Accordion title="Handlare">
            <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-6">
              <InfoRow label="Namn" value={MERCHANT.name} />
              <InfoRow label="Org.nr" value={MERCHANT.orgNr} mono />
              <InfoRow label="Adress" value={MERCHANT.address} />
              <InfoRow label="Telefon" value={MERCHANT.phone} />
            </dl>
          </Accordion>

          {/* Payment (hardcoded) */}
          <Accordion title={`Betalning · ${PAYMENT_INFO.method}`}>
            <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-6">
              <InfoRow label="Betalningsform" value={PAYMENT_INFO.method} />
              <InfoRow label="Kort" value={PAYMENT_INFO.cardType} />
              <InfoRow label="Kortnummer" value={PAYMENT_INFO.cardNumber} mono />
              <InfoRow label="Referens" value={PAYMENT_INFO.reference} mono />
              <InfoRow label="Auth-kod" value={PAYMENT_INFO.authCode} mono />
            </dl>
          </Accordion>

          {/* Technical info (hardcoded) */}
          <Accordion title="Teknisk information">
            <dl className="grid grid-cols-1 gap-0 sm:grid-cols-2 sm:gap-x-6">
              {Object.entries(TECHNICAL_INFO).map(([key, val]) => (
                <InfoRow key={key} label={key} value={val} mono />
              ))}
            </dl>
          </Accordion>

          {/* Note from merchant */}
          {receipt.Note && (
            <Accordion title="Meddelande från handlaren">
              <p className="text-sm leading-relaxed text-gray-700">
                {receipt.Note}
              </p>
            </Accordion>
          )}
        </div>

        {/* ── Barcode / verification ─────────────────────────── */}
        <div className="mt-3 flex flex-col items-center gap-3 rounded-[20px] border border-gray-200 bg-white p-6 shadow-sm">
          <Barcode w={280} h={56} label={token} />
          <p className="inline-flex items-center gap-1.5 text-[12.5px] text-gray-500">
            <IconLock />
            <span>
              Verifierat via{" "}
              <span className="font-semibold text-emerald-800">Vitteko</span>
            </span>
          </p>
          <div className="inline-flex items-center gap-2 font-mono text-xs text-gray-500">
            <span className="break-all">{token}</span>
            <CopyButton value={token} onToast={showToast} />
          </div>
        </div>
      </div>
    </>
  );
}
