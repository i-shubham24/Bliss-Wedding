"use client";

import { useId, useState } from "react";
import { planOptions, site } from "@/content/site";
import { whatsappLink } from "@/lib/site-events";
import { BUDGETS, COUNTRIES, digits, type Enquiry, type EnquiryResult } from "@/lib/enquiry";
import { saveEnquiry } from "@/app/actions";
import { WhatsApp } from "@/components/icons";

const WHEN = ["Nov to Dec 2026", "Jan to Mar 2027", "Apr to Sep 2027", "Oct 2027 onwards", "Not decided yet"];
const WEDDINGS = new Set(["Wedding", "Destination wedding", "Pre-wedding functions"]);
const THE = new Set(["USA", "UK", "UAE"]);

// Odometer digits: each column slides to its number
function Rolling({ value }: { value: number }) {
  const digits = String(value).split("");
  return (
    <span className="inline-flex tabular-nums" aria-hidden>
      {digits.map((d, i) => (
        <span key={digits.length - i} className="relative inline-block h-[1em] overflow-hidden leading-none">
          <span className="block transition-transform duration-700 ease-[var(--ease-expo)]" style={{ transform: `translateY(-${Number(d) * 10}%)` }}>
            {"0123456789".split("").map((n) => (
              <span key={n} className="block h-[1em]">
                {n}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

function Choice({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`h-11 rounded-[2px] px-4 text-[15px] transition-colors duration-300 ${
        on ? "bg-ink text-ground" : "bg-ground text-ink hover:bg-bliss hover:text-ground"
      }`}
    >
      {label}
    </button>
  );
}

function Group({ title, children, after }: { title: string; children: React.ReactNode; after?: React.ReactNode }) {
  return (
    <fieldset className="mt-9 first:mt-0">
      <legend className="text-[17px] font-medium">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
      {after}
    </fieldset>
  );
}

const field = "mt-2 h-12 w-full rounded-[2px] bg-ground px-4 text-[16px] outline-none focus-visible:outline-2 focus-visible:outline-bliss";

const longDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

export function PlanBuilder() {
  const id = useId();
  const [occasion, setOccasion] = useState(planOptions.occasions[0]);
  const [fns, setFns] = useState<string[]>(["Haldi", "Mehndi", "Anand Karaj", "Reception"]);
  const [guests, setGuests] = useState(400);
  const [when, setWhen] = useState(WHEN[1]);
  const [date, setDate] = useState("");
  const [budget, setBudget] = useState("");
  const [city, setCity] = useState(planOptions.cities[0]);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bride, setBride] = useState("");
  const [groom, setGroom] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string; form?: string }>({});
  const [sent, setSent] = useState<null | "saving" | EnquiryResult>(null);

  const showFns = WEDDINGS.has(occasion);
  const chosenFns = showFns ? planOptions.functions.filter((f) => fns.includes(f)) : [];
  const toggleFn = (f: string) => setFns((v) => (v.includes(f) ? v.filter((x) => x !== f) : [...v, f]));
  const abroad = country !== "India";

  const where = city === "Not sure yet" ? "with the place still open" : city === "Destination" ? "at a destination" : `in ${city}`;
  const whenText = date ? `on ${longDate(date)}` : when === "Not decided yet" ? "dates to be decided" : when;
  const couple = bride && groom ? `${bride} and ${groom}` : bride || groom;

  const message = [
    `Hi The Bliss! ${name ? `I'm ${name}. ` : ""}We're planning a ${occasion.toLowerCase()}${couple ? ` for ${couple}` : ""}.`,
    chosenFns.length ? `Functions: ${chosenFns.join(", ")}.` : "",
    `About ${guests} guests, ${where}, ${whenText}.`,
    budget ? `Budget: ${budget === BUDGETS.at(-1) ? "we would rather discuss it" : budget}.` : "",
    abroad ? `We live in ${country === "Elsewhere abroad" ? "another country" : THE.has(country) ? `the ${country}` : country}.` : "",
    phone ? `You can reach me on ${phone}.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // Validate, save the enquiry on the server, and open WhatsApp with the plan written out.
  // WhatsApp opens straight away, inside the click, so browsers never block it as a popup.
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Add your name so we know who to ask for.";
    if (digits(phone).length < 10) next.phone = "Add a phone or WhatsApp number with at least 10 digits.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = "That email address does not look right.";
    setErrors(next);
    const first = (["name", "phone", "email"] as const).find((k) => next[k]);
    if (first) {
      document.getElementById(`${id}-${first}`)?.focus();
      return;
    }
    const enquiry: Enquiry = {
      occasion,
      functions: chosenFns,
      guests,
      when,
      date,
      budget,
      city,
      name,
      phone,
      email,
      bride,
      groom,
      country,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      message,
      page: window.location.pathname,
      company,
    };
    setSent("saving");
    const saving = saveEnquiry(enquiry).catch((): EnquiryResult => ({ ok: true, saved: false, ref: "" }));
    window.open(whatsappLink(site.whatsapp, message), "_blank", "noopener");
    saving.then((result) => {
      if (!result.ok) setErrors({ form: result.error });
      setSent(result.ok ? result : null);
    });
  };

  const list = (items: string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`);
  const done = sent && sent !== "saving" && sent.ok ? sent : null;

  return (
    <section id="plan" aria-labelledby="plan-title" className="bg-blush py-[14vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h2 id="plan-title" className="display text-[clamp(38px,4.8vw,76px)]">
            Tell us about your wedding
          </h2>
          <p className="mt-6 max-w-[44ch] text-[16px]">
            Choose what you are planning. We reply with ideas and an estimate, usually the same day.
          </p>

          <form className="mt-11" onSubmit={submit} noValidate>
            <Group title="What are we celebrating?">
              {planOptions.occasions.map((o) => (
                <Choice key={o} label={o} on={occasion === o} onClick={() => setOccasion(o)} />
              ))}
            </Group>

            {showFns && (
              <Group title="Which functions?">
                {planOptions.functions.map((f) => (
                  <Choice key={f} label={f} on={fns.includes(f)} onClick={() => toggleFn(f)} />
                ))}
              </Group>
            )}

            <fieldset className="mt-9">
              <legend className="text-[17px] font-medium">How many guests?</legend>
              <div className="mt-4 flex items-center gap-6">
                <span className="w-[4.2ch] text-[38px] font-light tracking-[-0.03em]">
                  <Rolling value={guests} />
                </span>
                <label htmlFor={`${id}-guests`} className="sr-only">
                  Guests
                </label>
                <input
                  id={`${id}-guests`}
                  type="range"
                  min={50}
                  max={1500}
                  step={25}
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="h-10 flex-1 cursor-pointer"
                />
              </div>
            </fieldset>

            <Group
              title="When?"
              after={
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <label htmlFor={`${id}-date`} className="text-[16px] text-muted">
                    Already have a date?
                  </label>
                  <input
                    id={`${id}-date`}
                    type="date"
                    value={date}
                    // today, set on first focus (never during the prerender)
                    onFocus={(e) => (e.currentTarget.min ||= new Date().toLocaleDateString("en-CA"))}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-11 rounded-[2px] bg-ground px-3 text-[15px] outline-none focus-visible:outline-2 focus-visible:outline-bliss"
                  />
                  {date && (
                    <button type="button" onClick={() => setDate("")} className="link-u text-[15px]">
                      Clear
                    </button>
                  )}
                </div>
              }
            >
              {WHEN.map((w) => (
                <Choice
                  key={w}
                  label={w}
                  on={!date && when === w}
                  onClick={() => {
                    setWhen(w);
                    setDate("");
                  }}
                />
              ))}
            </Group>

            <Group title="Rough budget for the whole wedding">
              {BUDGETS.map((b) => (
                <Choice key={b} label={b} on={budget === b} onClick={() => setBudget(budget === b ? "" : b)} />
              ))}
            </Group>

            <Group title="Where?">
              {planOptions.cities.map((c) => (
                <Choice key={c} label={c} on={city === c} onClick={() => setCity(c)} />
              ))}
            </Group>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className="text-[16px] text-muted">
                  Your name
                </label>
                <input
                  id={`${id}-name`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? `${id}-name-err` : undefined}
                  className={field}
                />
                {errors.name && <p id={`${id}-name-err`} className="mt-2 text-[15px] text-bliss-deep">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-phone`} className="text-[16px] text-muted">
                  Phone or WhatsApp
                </label>
                <input
                  id={`${id}-phone`}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                  className={field}
                />
                {errors.phone && <p id={`${id}-phone-err`} className="mt-2 text-[15px] text-bliss-deep">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-email`} className="text-[16px] text-muted">
                  Email, if you would like a copy
                </label>
                <input
                  id={`${id}-email`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? `${id}-email-err` : undefined}
                  className={field}
                />
                {errors.email && <p id={`${id}-email-err`} className="mt-2 text-[15px] text-bliss-deep">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor={`${id}-country`} className="text-[16px] text-muted">
                  The family lives in
                </label>
                <select id={`${id}-country`} value={country} onChange={(e) => setCountry(e.target.value)} className={`${field} appearance-none`}>
                  {COUNTRIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor={`${id}-bride`} className="text-[16px] text-muted">
                  Bride&apos;s name <span className="text-[15px]">(optional)</span>
                </label>
                <input id={`${id}-bride`} value={bride} onChange={(e) => setBride(e.target.value)} className={field} />
              </div>
              <div>
                <label htmlFor={`${id}-groom`} className="text-[16px] text-muted">
                  Groom&apos;s name <span className="text-[15px]">(optional)</span>
                </label>
                <input id={`${id}-groom`} value={groom} onChange={(e) => setGroom(e.target.value)} className={field} />
              </div>
              {/* Hidden from people; bots fill it in */}
              <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label htmlFor={`${id}-company`}>Company</label>
                <input id={`${id}-company`} tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
            </div>
            {abroad && (
              <p className="mt-4 text-[16px] text-muted">
                We plan for families abroad over video calls, and we will call at a time that suits you.
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" disabled={sent === "saving"} className="btn btn-red !h-12 !px-6 !text-[15px] disabled:opacity-70">
                <WhatsApp /> Send enquiry
              </button>
              <p className="text-[16px] text-muted">We save your plan and open WhatsApp with it filled in.</p>
            </div>
            {errors.form && (
              <p role="alert" className="mt-4 text-[15px] text-bliss-deep">
                {errors.form}
              </p>
            )}
          </form>
        </div>

        <aside aria-label="Your wedding so far" className="lg:col-span-5">
          <div className="bg-bliss p-7 text-ground sm:p-9 lg:sticky lg:top-28">
            <p className="text-[17px]">{done ? `Thank you${name ? `, ${name.split(" ")[0]}` : ""}` : "Your celebration"}</p>
            <p className="mt-5 text-[clamp(22px,2.05vw,29px)] font-light leading-[1.25] tracking-[-0.01em]" aria-live="polite">
              {done ? (
                <>
                  {done.saved ? "We have your plan. " : ""}
                  WhatsApp has opened with it written out. Press send there and our team will reply, usually the same day.
                </>
              ) : (
                <>
                  A {occasion.toLowerCase()}
                  {couple ? ` for ${couple}` : ""} for about {guests} guests, {where}, {whenText}.
                  {chosenFns.length > 0 && ` With ${list(chosenFns)}.`}
                  {budget && budget !== BUDGETS.at(-1) && ` Budget ${budget.replace("Up to", "up to").replace("Above", "above")}.`}
                </>
              )}
            </p>
            {done?.saved && done.ref && <p className="mt-4 text-[16px]">Your reference: {done.ref}</p>}
            <div className="mt-8 flex flex-col gap-3">
              <a href={whatsappLink(site.whatsapp, message)} target="_blank" rel="noreferrer" className="btn btn-white w-full !h-12 !text-[15px]">
                <WhatsApp /> Send this on WhatsApp
              </a>
              <a
                href={`mailto:${site.email}?subject=${encodeURIComponent(`Wedding enquiry: ${occasion}`)}&body=${encodeURIComponent(message)}`}
                className="link-u self-center text-[16px]"
              >
                Or email it to us
              </a>
            </div>
            <p className="mt-10 text-[16px]">
              Prefer to talk? Call{" "}
              <a href={site.phoneHref} className="link-u font-medium">
                {site.phone}
              </a>
              , every day from 10 am to 7 pm.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
