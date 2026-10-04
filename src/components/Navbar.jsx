import { useState } from "react";

const LINKS = [
  ["Experience", "#experience"],
  ["Facilities", "#facilities"],
  ["Gallery", "#gallery"],
  ["Reviews", "#reviews"],
  ["Contact", "#contact"],
];

/**
 * Minimal navbar — text and links only, no glassmorphism, no pill container.
 * Mobile gets a plain white drawer with the same links.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto w-full max-w-[1600px] px-3 pt-3 sm:px-5 sm:pt-5 lg:px-8 lg:pt-6">
        <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
          {/* Logo — image only, brand text removed per request */}
          <a href="#home" className="flex items-center">
            <img
              src="/assets/nono.svg"
              alt="Nurboling logo"
              className="h-10 w-10 sm:h-11 sm:w-11"
            />
          </a>

          {/* Links only — no border, background or blur */}
          <nav className="ml-6 hidden items-center gap-5 min-[600px]:flex sm:gap-6 md:gap-7 lg:gap-8 xl:gap-9">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-base font-medium text-clay-600 transition hover:text-ink lg:text-[1.05rem]"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Hamburger (mobile only) */}
          <div className="ml-auto">
            <button
              aria-label="Menu"
              onClick={() => setOpen(!open)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg min-[600px]:hidden"
            >
              <span
                className={`h-0.5 w-6 bg-ink ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span className={`h-0.5 w-6 bg-ink ${open ? "opacity-0" : ""}`} />
              <span
                className={`h-0.5 w-6 bg-ink ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile drawer — plain white, just the links */}
        <div
          className={`overflow-hidden min-[600px]:hidden ${
            open ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="mt-2 flex flex-col gap-1 bg-white px-4 py-4">
            {LINKS.map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold tracking-[0.1em] text-clay-600 uppercase transition hover:bg-black/5 hover:text-ink"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
