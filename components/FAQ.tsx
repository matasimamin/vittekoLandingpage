export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <h2 className="text-center text-3xl font-bold text-emerald-800">
        Vanliga frågor
      </h2>
      <div className="mt-8 space-y-3">
        <details className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50">
          <summary className="cursor-pointer list-none text-left font-semibold">
            <span className="mr-2 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
              ?
            </span>
            Behövs en app för att få kvitto?
          </summary>
          <p className="mt-2 text-gray-700">
            Nej. Kunden får en säker kvittolänk i webbläsaren via NFC – helt
            utan app, konto eller medlemskap.
          </p>
        </details>
        <details className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50">
          <summary className="cursor-pointer list-none text-left font-semibold">
            <span className="mr-2 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
              ?
            </span>
            Hur integrerar vi med vårt kassasystem?
          </summary>
          <p className="mt-2 text-gray-700">
            Via vårt API eller webhook. Vi stödjer även CSV/JSON-export om ni
            vill börja enkelt.
          </p>
        </details>
        <details className="group rounded-xl border border-gray-200 p-4 open:bg-gray-50">
          <summary className="cursor-pointer list-none text-left font-semibold">
            <span className="mr-2 inline-block rounded-md bg-emerald-100 px-2 py-0.5 text-emerald-800">
              ?
            </span>
            Hur hanterar ni personuppgifter?
          </summary>
          <p className="mt-2 text-gray-700">
            Vi designar för dataminimering och kan driftsätta i EU. Ni väljer
            vilka fält som skickas. Kontakta oss för DPIA-underlag.
          </p>
        </details>
      </div>
    </section>
  );
}
