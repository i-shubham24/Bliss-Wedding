import type { Ceremony } from "@/content/site";
import type { CeremonyPage } from "@/content/ceremony-pages";
import { Plus } from "@/components/icons";
import { shortName } from "./tone";

// Native <details>: closed by default, keyboard and screen reader friendly, no client code.
export function Faqs({ c, page }: { c: Ceremony; page: CeremonyPage }) {
  return (
    <section aria-labelledby="faq-title" className="bg-stone py-[14vh]">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <h2 id="faq-title" className="display text-[clamp(38px,4.4vw,68px)] lg:col-span-4">
          {shortName(c)} questions families ask
        </h2>
        <ul className="lg:col-span-7 lg:col-start-6">
          {page.faqs.map((f) => (
            <li key={f.q} data-rise>
              <details className="group transition-colors duration-500 open:bg-ground">
                <summary className="flex list-none items-center justify-between gap-6 px-5 py-6 text-left text-[clamp(19px,1.7vw,25px)] leading-snug lg:px-7 [&::-webkit-details-marker]:hidden">
                  <span className="transition-colors duration-300 group-hover:text-bliss">{f.q}</span>
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ground transition-all duration-500 ease-[var(--ease-expo)] group-open:rotate-45 group-open:bg-bliss group-open:text-ground"
                  >
                    <Plus />
                  </span>
                </summary>
                <p className="max-w-[62ch] px-5 pb-8 text-[17px] lg:px-7">{f.a}</p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
