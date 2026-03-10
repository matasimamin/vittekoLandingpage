import NavBar from "@/components/NavBar";
import { brand } from "@/lib/constants";
import { notFound } from "next/navigation";
import DownloadReceiptButton from "@/components/DownloadReceiptButton";

type ApiItem = {
  Name: string;
  Price: number;
  Quantity: number;
};

async function getReceipt(id: string): Promise<ApiItem[] | null> {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    const res = await fetch(
      `https://api.vitteko.se/r/${encodeURIComponent(id)}`,
      { cache: "no-store" }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Fetch failed:", res.status, res.statusText, text);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Fetch exception:", err);
    return null;
  }
}

export default async function ReceiptPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const items = await getReceipt(id);

  if (!items) {
    notFound();
  }

  const total = items.reduce(
    (sum, item) => sum + item.Price * item.Quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 selection:bg-emerald-200/60 font-sans">
      <NavBar brand={brand} />

      <main className="mx-auto max-w-3xl px-6 py-16 md:py-20">
        <div className="rounded-3xl border border-emerald-100 bg-white p-8 shadow-sm">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
              <span className="text-xl text-emerald-700">✓</span>
            </div>

            <h1 className="text-3xl font-bold text-emerald-800">
              Kvitto verifierat
            </h1>

            <p className="mt-2 text-gray-600">
              Detta kvitto är registrerat via Vitteko.
            </p>
          </div>

          <div className="mt-10 border-t border-gray-200 pt-6 space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div>
                  <p className="font-medium">{item.Name}</p>
                  <p className="text-gray-500">
                    {item.Quantity} × {item.Price.toFixed(2)} kr
                  </p>
                </div>

                <div className="font-semibold">
                  {(item.Price * item.Quantity).toFixed(2)} kr
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-6 text-right">
            <p className="text-sm text-gray-500">Totalt</p>
            <p className="text-2xl font-bold text-emerald-700">
              {total.toFixed(2)} kr
            </p>
          </div>

          <div className="mt-6 text-center text-xs text-gray-400">
            Verifieringskod: {id}
          </div>

          <DownloadReceiptButton
            items={items}
            total={total}
            verificationCode={id}
          />
        </div>
      </main>
    </div>
  );
}