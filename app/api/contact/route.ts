// app/api/contact/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs"; // krävs för nodemailer (inte Edge)

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export async function POST(req: Request) {
  try {
    // 1) Parse + enkel validering
    const body = (await req.json().catch(() => null)) as {
      name?: string;
      email?: string;
      message?: string;
      phone?: string;
      hp?: string;
    } | null;

    if (!body) {
      return NextResponse.json({ error: "Ogiltig JSON" }, { status: 400 });
    }

    const { name, email, message, phone, hp } = body;

    // Honeypot: om ifyllt → avvisa tyst
    if (typeof hp === "string" && hp.trim() !== "") {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Namn, e-post och meddelande krävs" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Ogiltig e-postadress" },
        { status: 400 }
      );
    }

    // 2) SMTP-konto från miljövariabler
    const smtpUser = process.env.MAIL_USER;
    const smtpPass = process.env.MAIL_PASS;
    const smtpHost = process.env.MAIL_HOST ?? "smtp.purelymail.com";
    const smtpPort = Number(process.env.MAIL_PORT ?? 465);

    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        { error: "Saknar MAIL_USER / MAIL_PASS" },
        { status: 500 }
      );
    }

    // 3) Skapa transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true för 465, annars STARTTLS
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // 4) Skicka till er (inbox)
    await transporter.sendMail({
      from: `"Kontaktformulär" <${smtpUser}>`,
      to: smtpUser,
      subject: `Nytt meddelande från ${name}`,
      text: [
        `Namn: ${name}`,
        `E-post: ${email}`,
        `Telefon: ${phone || "Ej angivet"}`,
        "",
        "Meddelande:",
        message,
      ].join("\n"),
      replyTo: email, // så ni kan svara direkt
    });

    // 5) Bekräftelse till avsändaren (kund)
    await transporter.sendMail({
      from: `"Vitteko" <${smtpUser}>`,
      to: email,
      subject: "Vi har tagit emot ditt meddelande",
      text: `Hej ${name},

Tack för att du kontaktade oss. Vi har tagit emot ditt meddelande och återkommer så snart som möjligt.

Vänliga hälsningar,
Vitteko`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Kontakt-API fel:", error);
    return NextResponse.json({ error: "Internt serverfel" }, { status: 500 });
  }
}
