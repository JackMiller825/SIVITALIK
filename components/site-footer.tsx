import { BrandLogo } from "@/components/brand-logo";
import { project } from "@/config/project";
import { NAV_LINKS, socialLinks } from "@/lib/project";

export function SiteFooter() {
  const socials = socialLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[#070914] px-5 py-14 sm:px-8">
      <div className="mx-auto grid max-w-[1160px] gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div>
          <div className="flex items-center gap-3">
            <BrandLogo alt="" sizes="56px" className="size-14 rounded-full" />
            <div>
              <p className="font-display text-2xl leading-none font-bold text-silver">{project.PROJECT_NAME}</p>
              <p className="mt-1 font-mono text-sm text-cyan">{project.DISPLAY_TICKER}</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
            Superintelligent Vitalik is an independent, fictional meme project inspired by Ethereum culture.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          <nav aria-label="Footer">
            <p className="text-sm text-mist">On this page</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a href={link.id === "top" ? "#top" : `#${link.id}`} className="focus-ring rounded-sm text-sm text-silver hover:text-cyan">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {socials.length > 0 ? (
            <div>
              <p className="text-sm text-mist">Community</p>
              <ul className="mt-3 space-y-2">
                {socials.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="focus-ring rounded-sm text-sm text-silver hover:text-cyan">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-[1160px] text-sm text-mist">© {year} {project.PROJECT_NAME}</p>
    </footer>
  );
}
