// The shape of a wedding enquiry, shared by the plan builder and the server action that saves it.

export type Enquiry = {
  occasion: string;
  functions: string[];
  guests: number;
  when: string;
  date: string;
  budget: string;
  city: string;
  name: string;
  phone: string;
  email: string;
  bride: string;
  groom: string;
  country: string;
  timeZone: string;
  message: string;
  page: string;
  // Honeypot: a field people never see. Anything typed here came from a bot.
  company: string;
};

export type EnquiryResult = { ok: true; saved: boolean; ref: string } | { ok: false; error: string };

export const BUDGETS = [
  "Up to ₹15 lakh",
  "₹15 to 30 lakh",
  "₹30 to 60 lakh",
  "₹60 lakh to 1 crore",
  "Above ₹1 crore",
  "Rather discuss it",
];

export const COUNTRIES = ["India", "USA", "Canada", "UK", "Australia", "UAE", "Elsewhere abroad"];

export const digits = (phone: string) => phone.replace(/\D/g, "");
