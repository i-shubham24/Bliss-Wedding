"use client";

import { useState } from "react";
import { faqs } from "@/content/site";
import { Plus } from "@/components/icons";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="faq-title" className="bg-ground py-[16vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <h2 id="faq-title" className="display text-[clamp(42px,4.8vw,76px)] lg:col-span-4">
          Questions families ask
        </h2>
        <ul className="lg:col-span-7 lg:col-start-6">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className={`transition-colors duration-500 ${isOpen ? "bg-stone" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="group flex w-full items-center justify-between gap-6 px-5 py-6 text-left text-[clamp(19px,1.7vw,25px)] lg:px-7"
                  >
                    <span className="transition-colors duration-300 group-hover:text-bliss">{f.q}</span>
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-expo)] ${
                        isOpen ? "rotate-45 bg-bliss text-ground" : "bg-stone"
                      }`}
                    >
                      <Plus />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[62ch] px-5 pb-8 text-[17px] lg:px-7">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
