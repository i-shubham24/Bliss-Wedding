"use client";

import { openReel } from "@/lib/site-events";

// Opens one of The Bliss's films in the shared player. Lets server-rendered pages
// offer a film without becoming client components themselves.
export function FilmButton({
  id,
  title,
  className,
  children,
}: {
  id: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button type="button" data-cursor="Play" onClick={() => openReel({ id, title })} className={className}>
      {children}
    </button>
  );
}
