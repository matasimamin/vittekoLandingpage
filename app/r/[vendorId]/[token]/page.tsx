import NavBar from "@/components/NavBar";
import { brand } from "@/lib/constants";
import { notFound } from "next/navigation";
import ReceiptView from "@/components/receipt/ReceiptView";
import ReceiptEmptyState from "@/components/receipt/ReceiptEmptyState";

type ApiItem = {
  Name: string;
  UnitPrice: number;
  Quantity: number;
};

type ReceiptResponse = {
  Items: ApiItem[];
  Currency: string;
  PaymentMethod: string;
  Note?: string;
};

async function getReceipt(vendorId: string, token: string): Promise<ReceiptResponse | null> {
  try {
    const res = await fetch(
      `https://api.vitteko.se/r/${encodeURIComponent(vendorId)}/${encodeURIComponent(token)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Fetch failed:", res.status, res.statusText, text);
      return null;
    }

    return (await res.json()) as ReceiptResponse;
  } catch (err) {
    console.error("Fetch exception:", err);
    return null;
  }
}

export default async function ReceiptPage(props: {
  params: Promise<{ vendorId: string; token: string }>;
}) {
  const { vendorId, token } = await props.params;

  if (!vendorId || !token) {
    notFound();
  }

  const receipt = await getReceipt(vendorId, token);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <NavBar brand={brand} />
      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-10 lg:py-12">
        {receipt ? (
          <ReceiptView receipt={receipt} token={token} vendorId={vendorId} />
        ) : (
          <ReceiptEmptyState token={token} />
        )}
      </main>
    </div>
  );
}
