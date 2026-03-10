import NavBar from "@/components/NavBar";
import { brand } from "@/lib/constants";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <NavBar brand={brand} />

      <main className="mx-auto max-w-3xl px-6 py-24 md:py-32 text-center">
        <p
          className="text-8xl font-black text-transparent bg-clip-text"
          style={{
            backgroundImage: `linear-gradient(90deg, ${brand.primary}, ${brand.dark})`,
          }}
        >
          404
        </p>

        <h1 className="mt-4 text-2xl font-bold text-emerald-900">
          Sidan kunde inte hittas
        </h1>

        <p className="mt-2 text-gray-600">
          Länken du följde verkar inte leda någonstans längre.
        </p>

        <Link
          href="/"
          className="mt-8 inline-block rounded-xl bg-emerald-400 px-6 py-3 font-bold text-emerald-900 shadow-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          Tillbaka till startsidan
        </Link>
      </main>
    </div>
  );
}
