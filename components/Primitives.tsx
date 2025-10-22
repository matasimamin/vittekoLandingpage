"use client";

import { motion } from "framer-motion";
import { JSX } from "react";

export function Feature({
  title,
  body,
  icon: Icon,
}: {
  title: string;
  body: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}) {
  return (
    <motion.div
      className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:shadow-md"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-xl p-3 ring-1 ring-gray-950/5 group-hover:ring-emerald-300/50">
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-emerald-900">{title}</h3>
          <p className="mt-1 text-gray-600">{body}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <motion.div
      className="mx-auto max-w-xs"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <div className="text-5xl font-extrabold text-emerald-400">{value}</div>
      <p className="mt-2 text-gray-600">{label}</p>
    </motion.div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.li
      className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
    >
      <div className="absolute -top-3 left-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 font-bold text-emerald-900 ring-2 ring-white">
        {number}
      </div>
      <h3 className="mt-2 text-lg font-semibold text-emerald-900">{title}</h3>
      <p className="mt-1 text-gray-600">{children}</p>
    </motion.li>
  );
}
