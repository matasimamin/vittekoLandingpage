import Link from "next/link";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import { brand } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen font-sans bg-white text-gray-800 selection:bg-emerald-200/60">
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:m-3 focus:rounded-md focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:text-gray-900 shadow"
      >
        Hoppa till innehåll
      </a>

      <NavBar brand={brand} />

      <main id="main">
        <Hero brand={brand} />

        <section className="mx-auto max-w-5xl px-6 py-16 text-center md:py-20">
          <h2 className="text-3xl font-bold text-emerald-800">Om Vitteko</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            Vitteko grundades med en enkel vision – att digitalisera kvitton på
            ett sätt som är <strong>enklare, smartare och mer hållbart</strong>{" "}
            än dagens lösningar. Digitalisering är bara värdefull när den
            förenklar vardagen för både företag och kunder.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-gray-700">
            Vår mission är att eliminera papperskvitton helt, minska kostnader
            och ge varje kund möjlighet att få sitt kvitto direkt i mobilen –
            oavsett betalningsmetod, utan app, konto eller medlemskap.
            Framtidens kvitto är <strong>universellt</strong>,{" "}
            <strong>miljövänligt</strong> och <strong>bara ett tap bort</strong>
            .
          </p>
        </section>

        <Services />

        <Stats />

        <FAQ />

        <section
          id="contact"
          className="bg-emerald-50 py-16 px-6 text-emerald-900 md:py-20"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto max-w-xl">
            <h2 id="contact-title" className="text-3xl font-bold">
              Kontakta oss
            </h2>
            <p className="mt-2 text-emerald-800/80">
              Vill du veta mer om hur Vitteko kan integreras i ert system? Fyll
              i formuläret så hör vi av oss.
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white py-8 text-gray-600">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
          <p>
            © {new Date().getFullYear()} Vitteko. Alla rättigheter förbehållna.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#faq" className="hover:text-gray-900">
              Integritet
            </a>
            <a href="#contact" className="hover:text-gray-900">
              Kontakt
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
