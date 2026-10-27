"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

// Section links ("#story", "#plan") point at the home page from every other page.
// "#top" always means the top of the current page.
export function useSiteHref() {
  const home = usePathname() === "/";
  return (hash: string) => (home || hash === "#top" ? hash : `/${hash}`);
}

// On the home page a plain anchor, so the smooth-scroll handler can land it (some sections
// end inside a pinned scene); elsewhere a client-side link to the home page section.
export function SectionLink({ hash, ...props }: Omit<ComponentProps<"a">, "href"> & { hash: string }) {
  const home = usePathname() === "/";
  if (home || hash === "#top") return <a href={hash} {...props} />;
  return <Link href={`/${hash}`} {...props} />;
}
