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

const DEV_DEMO_RECEIPT: ReceiptResponse = {
  Items: [
    { Name: "Cappuccino, stor", UnitPrice: 49, Quantity: 2 },
    { Name: "Kanelbulle", UnitPrice: 39, Quantity: 2 },
    { Name: "Smörgås, lax & avokado", UnitPrice: 89, Quantity: 1 },
    { Name: "Mineralvatten 33 cl", UnitPrice: 29, Quantity: 1 },
    { Name: "Tygkasse — återbruk", UnitPrice: 25, Quantity: 1 },
  ],
  Currency: "SEK",
  PaymentMethod: "Kontaktlös betalning",
  Note: "Du har 6 stämplar kvar till en gratis kaffe. Visa kvittot i kassan för att samla.",
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

  const apiReceipt = await getReceipt(vendorId, token);
  const receipt = apiReceipt ?? (process.env.NODE_ENV === "development" ? DEV_DEMO_RECEIPT : null);

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
