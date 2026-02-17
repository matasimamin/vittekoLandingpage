import NavBar from "@/components/NavBar";
import { brand } from "@/lib/constants";
import { notFound } from "next/navigation";
import DownloadReceiptButton from "@/components/DownloadReceiptButton";

type ApiItem = {
  Name: string;
  Price: number;
  Quantity: number;
};

async function getReceipt(e: string): Promise<ApiItem[] | null> {
  try {
    const res = await fetch(`https://localhost:7130/api/nfc/verify?e=${e}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch {
    return null;
  }
}

export default async function VerifyPage(props: {
  searchParams: Promise<{ e?: string }>;
}) {
  const searchParams = await props.searchParams;
  const encryptedValue = searchParams.e;

  if (!encryptedValue) {
    notFound();
  }

  const items = await getReceipt(encryptedValue);

  if (!items) {
    return (
      <div className="min-h-screen bg-white text-gray-800 font-sans">
        <NavBar brand={brand} />
        <main className="mx-auto max-w-3xl px-6 py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center shadow-sm">
            <h1 className="text-2xl font-bold text-red-700">
              Kvitto kunde inte verifieras
            </h1>
          </div>
        </main>
      </div>
    );
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
          {/* Header */}
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

          {/* Items */}
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

          {/* Total */}
          <div className="mt-8 border-t border-gray-200 pt-6 text-right">
            <p className="text-sm text-gray-500">Totalt</p>
            <p className="text-2xl font-bold text-emerald-700">
              {total.toFixed(2)} kr
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center text-xs text-gray-400">
            Verifieringskod: {encryptedValue}
          </div>

<DownloadReceiptButton
  items={items}
  total={total}
  verificationCode={encryptedValue}
/>

        </div>
      </main>
    </div>
  );
}
