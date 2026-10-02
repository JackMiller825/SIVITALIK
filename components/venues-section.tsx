import { confirmedVenues } from "@/lib/project";
import Image from "next/image";

export function VenuesSection() {
  const venues = confirmedVenues();
  if (venues.length === 0) return null;

  return (
    <section aria-label="Trading venues" className="bg-void px-5 py-8 sm:px-8">
      <div className="mx-auto flex max-w-[1160px] flex-wrap items-center justify-center gap-3">
        {venues.map((venue) => (
          <a
            key={venue.href}
            href={venue.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-ring inline-flex min-h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2 text-silver transition duration-200 hover:border-cyan/60 hover:bg-cyan/10"
          >
            {venue.logo ? (
              <Image src={venue.logo} alt="" width={28} height={28} className="size-7 rounded-full object-contain" />
            ) : null}
            <span className="text-sm font-semibold">{venue.name}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </section>
  );
}
