import { BrandLogo } from "@/components/brand-logo";
import { project } from "@/config/project";
import { channels, explorerHref, NAV_LINKS } from "@/lib/project";

export function SiteFooter() {
  const socials = channels();
  const explorer = explorerHref();
  const address = project.CONTRACT_ADDRESS?.trim() || null;

  return (
    <footer className="border-t border-white/10 bg-[#070914] px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo alt="" sizes="56px" className="size-14 rounded-full" />
            <div>
              <p className="font-display text-2xl leading-none font-bold text-silver">
                {project.PROJECT_NAME}
              </p>
              <p className="mt-1 font-mono text-sm text-cyan">{project.DISPLAY_TICKER}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
            An Ethereum meme token inspired by superintelligence, digital culture, and human–AI collaboration.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="Footer">
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-mist uppercase">Navigate</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={`#${link.id}`} className="focus-ring rounded-sm text-sm text-silver hover:text-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.18em] text-mist uppercase">Channels</p>
            {socials.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {socials.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="focus-ring rounded-sm text-sm text-silver hover:text-cyan"
                    >
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-3 text-sm text-mist">Not announced</p>
            )}
            {explorer ? (
              <p className="mt-4">
                <a
                  href={explorer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-sm text-cyan underline-offset-4 hover:underline"
                >
                  Contract on the block explorer
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            ) : address ? (
              <p className="mt-4 font-mono text-xs break-all text-mist">{address}</p>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
