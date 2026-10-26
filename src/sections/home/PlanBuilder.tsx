"use client";

import { useId, useState } from "react";
import { planOptions, site } from "@/content/site";
import { whatsappLink } from "@/lib/site-events";
import { WhatsApp } from "@/components/icons";

const WHEN = ["Nov to Dec 2026", "Jan to Mar 2027", "Apr to Sep 2027", "Oct 2027 onwards", "Not decided yet"];
const WEDDINGS = new Set(["Wedding", "Destination wedding", "Pre-wedding functions"]);

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

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-9 first:mt-0">
      <legend className="text-[17px] font-medium">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </fieldset>
  );
}

export function PlanBuilder() {
  const id = useId();
  const [occasion, setOccasion] = useState(planOptions.occasions[0]);
  const [fns, setFns] = useState<string[]>(["Haldi", "Mehndi", "Anand Karaj", "Reception"]);
  const [guests, setGuests] = useState(400);
  const [when, setWhen] = useState(WHEN[1]);
  const [city, setCity] = useState(planOptions.cities[0]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [sent, setSent] = useState(false);

  const showFns = WEDDINGS.has(occasion);
  const chosenFns = showFns ? planOptions.functions.filter((f) => fns.includes(f)) : [];
  const toggleFn = (f: string) => setFns((v) => (v.includes(f) ? v.filter((x) => x !== f) : [...v, f]));

  const where = city === "Not sure yet" ? "with the place still open" : city === "Destination" ? "at a destination" : `in ${city}`;
  const whenText = when === "Not decided yet" ? "dates to be decided" : when;

  const message = [
    `Hi The Bliss! ${name ? `I'm ${name}. ` : ""}We're planning a ${occasion.toLowerCase()}.`,
    chosenFns.length ? `Functions: ${chosenFns.join(", ")}.` : "",
    `About ${guests} guests, ${where}, ${whenText}.`,
    phone ? `You can reach me on ${phone}.` : "",
  ]
    .filter(Boolean)
    .join("\n");

  // No backend yet: a valid enquiry opens WhatsApp with the plan written out
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!name.trim()) next.name = "Add your name so we know who to ask for.";
    if (phone.replace(/D/g, "").length < 10) next.phone = "Add a phone or WhatsApp number with at least 10 digits.";
    setErrors(next);
    if (next.name) document.getElementById(`${id}-name`)?.focus();
    else if (next.phone) document.getElementById(`${id}-phone`)?.focus();
    if (Object.keys(next).length) return;
    window.open(whatsappLink(site.whatsapp, message), "_blank", "noopener");
    setSent(true);
  };

  const list = (items: string[]) => (items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`);

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
                  className="h-2 flex-1 cursor-pointer"
                />
              </div>
            </fieldset>

            <Group title="When?">
              {WHEN.map((w) => (
                <Choice key={w} label={w} on={when === w} onClick={() => setWhen(w)} />
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
                  className="mt-2 h-12 w-full rounded-[2px] bg-ground px-4 text-[16px] outline-none focus-visible:outline-2 focus-visible:outline-bliss"
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
                  className="mt-2 h-12 w-full rounded-[2px] bg-ground px-4 text-[16px] outline-none focus-visible:outline-2 focus-visible:outline-bliss"
                />
                {errors.phone && <p id={`${id}-phone-err`} className="mt-2 text-[15px] text-bliss-deep">{errors.phone}</p>}
              </div>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="submit" className="btn btn-red !h-12 !px-6 !text-[15px]">
                <WhatsApp /> Send enquiry
              </button>
              <p className="text-[16px] text-muted">Opens WhatsApp with your plan filled in.</p>
            </div>
          </form>
        </div>

        <aside aria-label="Your wedding so far" className="lg:col-span-5">
          <div className="bg-bliss p-7 text-ground sm:p-9 lg:sticky lg:top-28">
            <p className="text-[17px]">{sent ? `Thank you${name ? `, ${name.split(" ")[0]}` : ""}` : "Your celebration"}</p>
            <p className="mt-5 text-[clamp(22px,2.05vw,29px)] font-light leading-[1.25] tracking-[-0.01em]" aria-live="polite">
              {sent ? (
                "WhatsApp has opened with your plan. Press send there and our team will reply, usually the same day."
              ) : (
                <>
                  A {occasion.toLowerCase()} for about {guests} guests, {where}, {whenText}.
                  {chosenFns.length > 0 && ` With ${list(chosenFns)}.`}
                </>
              )}
            </p>
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
