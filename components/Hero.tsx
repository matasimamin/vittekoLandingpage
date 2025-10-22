"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Hero({
  brand,
}: {
  brand: { primary: string; dark: string };
}) {
  const reduce = useReducedMotion();
  const fadeInUp = {
    hidden: { opacity: 0, y: reduce ? 0 : 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
  };

  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(1200px 600px at 10% 10%, rgba(0,229,142,0.18), transparent 60%), radial-gradient(1000px 600px at 90% 10%, rgba(0,126,108,0.14), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6 py-20 text-center md:py-28">
        <motion.h1
          id="hero-title"
          className="mx-auto max-w-4xl text-balance text-4xl font-black tracking-tight md:text-6xl"
          variants={fadeInUp}
          initial="hidden"
          animate="show"
        >
          Digitala kvitton.{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-700">
            Enkelt. Säkert. Hållbart.
          </span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-gray-600"
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.08 }}
        >
          Vitteko gör kvittohantering enkel och miljövänlig med NFC-teknik. Ett
          enda “tap” – inget papper, inga appar, inga problem.
        </motion.p>

        <motion.div
          className="mt-8 flex items-center justify-center gap-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.a
            href="#services"
            className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-900 shadow-md ring-1 ring-black/5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            whileHover={{ y: reduce ? 0 : -2 }}
            whileTap={{ scale: reduce ? 1 : 0.98 }}
          >
            Läs mer
          </motion.a>
          <motion.a
            href="#contact"
            className="rounded-xl bg-emerald-400 px-6 py-3 font-bold text-emerald-900 shadow-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            whileHover={{ y: reduce ? 0 : -2 }}
            whileTap={{ scale: reduce ? 1 : 0.98 }}
          >
            Kom igång
          </motion.a>
        </motion.div>

        <motion.div
          className="mx-auto mt-10 grid max-w-4xl grid-cols-2 items-center gap-6 opacity-80 md:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ staggerChildren: 0.08 }}
        >
          {["Retail", "Café", "Gym", "Event"].map((tag) => (
            <motion.div
              key={tag}
              className="rounded-lg border border-gray-200/70 p-3 text-sm"
              variants={fadeInUp}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
