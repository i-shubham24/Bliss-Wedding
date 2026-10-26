"use client";

import Image from "next/image";
import { useState } from "react";
import { services } from "@/content/site";
import { Plus } from "@/components/icons";

export function Services() {
  const [open, setOpen] = useState(-1);

  return (
    <section id="services" aria-labelledby="services-title" className="relative bg-ground py-[16vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h2 id="services-title" className="display text-[clamp(40px,4.8vw,76px)]">
              Everything under one roof
            </h2>
            <p className="mt-6 max-w-[36ch] text-[17px]">
              Book the whole wedding or a single service. One team handles it all.
            </p>
            <a href="#plan" className="btn btn-red mt-10">
              Get an estimate
            </a>
          </div>
        </div>

        <ul className="lg:col-span-7">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <li key={s.title} className={`transition-colors duration-500 ${isOpen ? "bg-blush" : ""}`}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`svc-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-start justify-between gap-6 px-5 py-5 text-left lg:px-7 lg:py-6"
                >
                  <span>
                    <span className="display block text-[clamp(26px,2.6vw,40px)] transition-colors duration-300 group-hover:text-bliss">
                      {s.title}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-[16px] text-muted">{s.line}</span>
                  </span>
                  <span
                    className={`mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-expo)] ${
                      isOpen ? "rotate-45 bg-bliss text-ground" : "bg-blush text-ink group-hover:bg-bliss group-hover:text-ground"
                    }`}
                  >
                    <Plus />
                  </span>
                </button>
                <div
                  id={`svc-${i}`}
                  className={`grid transition-[grid-template-rows] duration-700 ease-[var(--ease-expo)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col gap-6 px-5 pb-7 sm:flex-row lg:px-7">
                      <div className="relative aspect-[4/3] w-full overflow-hidden sm:w-60 lg:w-64">
                        <Image src={s.img} alt={s.title} fill sizes="(min-width: 640px) 256px, 92vw" className="object-cover" />
                      </div>
                      <ul className="grid flex-1 gap-x-8 gap-y-2 text-[16px] sm:grid-cols-2">
                        {s.points.map((p) => (
                          <li key={p} className="flex gap-3">
                            <span aria-hidden className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-bliss" />
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
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
