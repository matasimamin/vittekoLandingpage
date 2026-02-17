"use client";

import { jsPDF } from "jspdf";

type ApiItem = {
  Name: string;
  Price: number;
  Quantity: number;
};

export default function DownloadReceiptButton({
  items,
  total,
  verificationCode,
}: {
  items: ApiItem[];
  total: number;
  verificationCode: string;
}) {
  const handleDownload = () => {
    const doc = new jsPDF();

    let y = 20;

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Vitteko – Digitalt kvitto", 20, y);

    y += 10;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`Verifieringskod: ${verificationCode}`, 20, y);

    y += 15;

    doc.setFontSize(12);

    // Items
    items.forEach((item) => {
      const rowTotal = item.Price * item.Quantity;

      doc.text(
        `${item.Name} (${item.Quantity} × ${item.Price.toFixed(2)} kr)`,
        20,
        y
      );

      doc.text(`${rowTotal.toFixed(2)} kr`, 170, y, {
        align: "right",
      });

      y += 8;

      // New page if needed
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });

    y += 10;

    // Divider
    doc.line(20, y, 190, y);
    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Totalt", 20, y);
    doc.text(`${total.toFixed(2)} kr`, 170, y, { align: "right" });

    y += 15;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Tack för ditt köp!", 20, y);

    doc.save(`Vitteko-kvitto-${verificationCode}.pdf`);
  };

  return (
    <button
      onClick={handleDownload}
      className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400"
    >
      Ladda ner som PDF
    </button>
  );
}
