"use client";

import { motion } from "framer-motion";
import SectionFade from "./SectionFade";
import { Feature } from "./Primitives";
import { NfcIcon, PlugIcon, LeafIcon } from "./Icons";

export default function Services() {
  return (
    <section
      id="services"
      className="mx-auto max-w-6xl px-6 py-16 text-center md:py-20"
    >
      <h2 className="text-3xl font-bold text-emerald-800">Våra tjänster</h2>
      <motion.div
        className="mt-10 grid gap-6 md:grid-cols-3"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <Feature
          title="Digitalt kvitto via NFC"
          body="Med ett enkelt tap får kunden sitt kvitto direkt i mobilen – utan app eller registrering."
          icon={NfcIcon}
        />
        <Feature
          title="Sömlös kassaintegration"
          body="Koppla på via API/Webhook eller exporter – snabbt att komma igång."
          icon={PlugIcon}
        />
        <Feature
          title="Miljö & effektivitet"
          body="Minska pappersanvändning, spara kostnader och gör kunderna nöjdare."
          icon={LeafIcon}
        />
      </motion.div>
    </section>
  );
}
