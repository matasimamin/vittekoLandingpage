"use client";

import { useState, FormEvent, ChangeEvent, useMemo } from "react";
import { isValidEmail, isFormValid as validateForm } from "@/lib/validation";

type FormState = { name: string; email: string; message: string; hp: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    hp: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isFormValid = useMemo(() => validateForm(form), [form]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isFormValid) {
      setErrorMsg("Kontrollera fälten och försök igen.");
      return;
    }

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setForm({ name: "", email: "", message: "", hp: "" });
    } catch (err) {
      setStatus("error");
      setErrorMsg("Kunde inte skicka just nu. Prova igen om en stund.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 grid gap-4 text-left"
      noValidate
    >
      {/* Honeypot (dold) */}
      <div className="hidden">
        <label>
          Lämna fältet tomt
          <input
            type="text"
            name="hp"
            autoComplete="off"
            tabIndex={-1}
            value={form.hp}
            onChange={handleChange}
          />
        </label>
      </div>

      <FormField
        label="Namn"
        name="name"
        type="text"
        value={form.name}
        onChange={handleChange}
        required
      />
      <FormField
        label="E-post"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        required
        invalid={form.email.length > 0 && !isValidEmail(form.email)}
        helpText={
          form.email.length > 0 && !isValidEmail(form.email)
            ? "Ange en giltig e-postadress."
            : undefined
        }
      />
      <FormTextArea
        label="Meddelande"
        name="message"
        value={form.message}
        onChange={handleChange}
        required
        minLength={6}
      />

      {errorMsg && (
        <p
          role="alert"
          className="rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-800"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !isFormValid}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-400 px-6 py-3 font-bold text-emerald-900 shadow-md transition enabled:hover:bg-emerald-300 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-emerald-200"
      >
        {status === "loading"
          ? "Skickar…"
          : status === "success"
          ? "Skickat ✅"
          : "Skicka"}
      </button>

      <p className="mt-2 text-xs text-emerald-800/80">
        Genom att skicka godkänner du vår hantering av uppgifter enligt vår
        integritetspolicy.
      </p>
    </form>
  );
}

/* Local presentational inputs (no helpers) */
function FormField({
  label,
  name,
  type,
  value,
  onChange,
  required,
  invalid,
  helpText,
}: {
  label: string;
  name: string;
  type: "text" | "email";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  invalid?: boolean;
  helpText?: string;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-emerald-900"
      >
        {label}{" "}
        {required && <span className="opacity-70">(obligatoriskt)</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        aria-invalid={invalid || false}
        aria-describedby={helpText ? `${id}-help` : undefined}
        className="mt-1 w-full rounded-lg border-0 bg-white px-3 py-3 text-gray-900 ring-1 ring-inset ring-emerald-300/60 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        placeholder={label}
      />
      {helpText && (
        <p id={`${id}-help`} className="mt-1 text-sm text-emerald-700">
          {helpText}
        </p>
      )}
    </div>
  );
}

function FormTextArea({
  label,
  name,
  value,
  onChange,
  required,
  minLength,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  minLength?: number;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-emerald-900"
      >
        {label}{" "}
        {required && <span className="opacity-70">(obligatoriskt)</span>}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        minLength={minLength}
        className="mt-1 h-32 w-full resize-y rounded-lg border-0 bg-white px-3 py-3 text-gray-900 ring-1 ring-inset ring-emerald-300/60 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        placeholder="Berätta gärna kort vad ni behöver…"
      />
    </div>
  );
}
