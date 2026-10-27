"use server";

import { BUDGETS, COUNTRIES, digits, type Enquiry, type EnquiryResult } from "@/lib/enquiry";
import { planOptions } from "@/content/site";

// Every enquiry is saved before WhatsApp opens, so a family that never presses send in
// WhatsApp still reaches the studio. Where it goes is set by environment variables
// (see .env.example and docs/ENQUIRIES.md):
//   ENQUIRY_SHEET_URL   a Google Apps Script web app that appends a row to the enquiries sheet
//   RESEND_API_KEY      sends the studio an email, and the family a confirmation if they gave an email
//   ENQUIRY_TO / ENQUIRY_FROM   addresses for those emails
// With none set (local development), enquiries are only written to the server log.

const clip = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function saveEnquiry(input: Enquiry): Promise<EnquiryResult> {
  const ref = crypto.randomUUID().slice(0, 8).toUpperCase();
  // Bots fill the hidden field; tell them it worked and keep nothing
  if (clip(input?.company, 200)) return { ok: true, saved: false, ref };

  const record = {
    ref,
    received: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    name: clip(input.name, 80),
    phone: clip(input.phone, 24),
    email: clip(input.email, 120),
    bride: clip(input.bride, 80),
    groom: clip(input.groom, 80),
    occasion: planOptions.occasions.includes(input.occasion) ? input.occasion : "Wedding",
    functions: Array.isArray(input.functions) ? input.functions.filter((f) => planOptions.functions.includes(f)) : [],
    guests: Math.min(5000, Math.max(10, Math.round(Number(input.guests) || 0))),
    when: clip(input.when, 40),
    date: /^\d{4}-\d{2}-\d{2}$/.test(input.date ?? "") ? input.date : "",
    budget: BUDGETS.includes(input.budget) ? input.budget : "",
    city: clip(input.city, 40),
    country: COUNTRIES.includes(input.country) ? input.country : "India",
    timeZone: clip(input.timeZone, 60),
    message: clip(input.message, 2000),
    page: clip(input.page, 200),
  };

  if (!record.name) return { ok: false, error: "Add your name so we know who to ask for." };
  if (digits(record.phone).length < 10 || digits(record.phone).length > 15)
    return { ok: false, error: "Add a phone or WhatsApp number with 10 to 15 digits." };
  if (record.email && !emailOk(record.email)) return { ok: false, error: "That email address does not look right." };

  const jobs: Promise<unknown>[] = [];
  const sheet = process.env.ENQUIRY_SHEET_URL;
  if (sheet) jobs.push(post(sheet, record));
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO;
  const from = process.env.ENQUIRY_FROM;
  if (key && to && from) {
    jobs.push(
      sendEmail(key, {
        from,
        to: [to],
        reply_to: record.email || undefined,
        subject: `New enquiry ${ref}: ${record.name}, ${record.occasion}, ${record.guests} guests`,
        text: studioEmail(record),
      }),
    );
    if (record.email)
      jobs.push(
        sendEmail(key, {
          from,
          to: [record.email],
          subject: "We have your wedding plan",
          text: familyEmail(record),
        }),
      );
  }

  if (!jobs.length) {
    console.info("[enquiry]", JSON.stringify(record));
    return { ok: true, saved: false, ref };
  }
  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error("[enquiry] delivery failed", ref, r.reason));
  return { ok: true, saved: results.some((r) => r.status === "fulfilled"), ref };
}

type Saved = Record<string, unknown>;

async function post(url: string, body: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`sheet ${res.status}`);
}

async function sendEmail(key: string, mail: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(mail),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`email ${res.status}: ${await res.text()}`);
}

function studioEmail(r: Saved) {
  const line = (label: string, value: unknown) => (value ? `${label}: ${Array.isArray(value) ? value.join(", ") : value}` : "");
  return [
    `Enquiry ${r.ref}, received ${r.received}`,
    "",
    line("Name", r.name),
    line("Phone", r.phone),
    line("Email", r.email),
    line("Bride", r.bride),
    line("Groom", r.groom),
    line("Lives in", r.country),
    line("Their time zone", r.timeZone),
    "",
    line("Occasion", r.occasion),
    line("Functions", r.functions),
    line("Guests", r.guests),
    line("When", r.when),
    line("Date", r.date),
    line("Budget", r.budget),
    line("Where", r.city),
    "",
    "Their message, as sent to WhatsApp:",
    String(r.message ?? ""),
    "",
    line("Sent from", r.page),
  ]
    .filter((l, i, all) => l !== "" || all[i - 1] !== "")
    .join("\n");
}

function familyEmail(r: Saved) {
  return [
    `Dear ${String(r.name).split(" ")[0]},`,
    "",
    "Thank you for telling us about your celebration. Our team has your plan and will call you, usually the same day.",
    "",
    String(r.message ?? ""),
    "",
    `Your reference is ${r.ref}. If you would rather talk now, call or WhatsApp us on +91 78888 54618, every day from 10 am to 7 pm.`,
    "",
    "With love,",
    "The Bliss, 30 Race Course Road, Amritsar",
  ].join("\n");
}
