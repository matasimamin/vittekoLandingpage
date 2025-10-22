"use client";

import { motion } from "framer-motion";
import SectionFade from "./SectionFade";
import { Stat } from "./Primitives";

export default function Stats() {
  return (
    <SectionFade>
      <section id="stats" className="bg-gray-50 py-16 px-2 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-emerald-800">
            Varför Vitteko?
          </h2>

          {/* Goal chip */}

          {/* Environment chip */}
          <motion.div
            className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-900 ring-1 ring-emerald-200/60"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <span aria-hidden>🌱</span>
            <span>
              Vi skyddar miljön: kvittopapper i Sverige ≈
              <span className="font-semibold"> 14–19 kt CO₂e/år</span>.
              Riktning: <span className="font-semibold">0 papperskvitton</span>.
            </span>
          </motion.div>

          {/* KPIs */}
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <Stat
              value="54,75 M"
              label="Antal rullar per år i Sverige (uppskattning)"
            />
            <Stat value="0" label="Behov av papper, appar eller registrering" />
            <Stat value="100%" label="Funkar med alla betalningsmetoder" />
          </div>

          {/* If you later want calculator, just import and render it here */}
          {/* <StatsCalculator /> */}
        </div>
      </section>
    </SectionFade>
  );
}
