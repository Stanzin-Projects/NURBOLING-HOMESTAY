import { useEffect, useRef } from "react";

const STRIP = [
  { icon: "👥", label: "Stay With a Local Family" },
  { icon: "🍛", label: "Homemade Food, Fresh Daily" },
  { icon: "🚿", label: "24/7 Hot Water & Extra Beds" },
  { icon: "🌄", label: "Breathtaking Mountain Views" },
];

/* Wordmark sized against its band (container query units) so it always fills
   edge-to-edge without ever overflowing the card at small widths. */
const WORDMARK =
  "font-display block whitespace-nowrap text-center text-[16.4cqw] leading-[0.86] font-normal tracking-[-0.02em] lg:text-[17.5cqw]";

/**
 * LUMINARA-style hero:
 *  — light panel left with serif headline + black pill CTAs
 *  — YOUR drone video right (spans both grid rows on lg)
 *  — giant NURBOLING wordmark band in a black→red gradient (ink → clay-600),
 *    running from the white band across the video on lg
 *  — light benefits strip below
 */
export default function Hero() {
  const videoRef = useRef(null);

  /* Resume the video when the tab/preview becomes visible again
     (browsers pause media in hidden pages). */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => {
      if (document.visibilityState !== "hidden") v.play().catch(() => {});
    };
    tryPlay();
    document.addEventListener("visibilitychange", tryPlay);
    window.addEventListener("focus", tryPlay);
    return () => {
      document.removeEventListener("visibilitychange", tryPlay);
      window.removeEventListener("focus", tryPlay);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div className="grid flex-1 lg:grid-cols-2 lg:grid-rows-[1fr_auto]">
        {/* ===== Light content panel ===== */}
        <div className="flex flex-col justify-center bg-panel px-6 pt-28 pb-12 sm:px-10 sm:pt-32 lg:col-start-1 lg:row-start-1 lg:min-h-[68vh] lg:px-14 lg:pt-40 lg:pb-16">
          <h1 className="font-display bg-gradient-to-r from-ink via-clay-600 to-clay-600 bg-clip-text text-[clamp(2.3rem,4.8vw,4.3rem)] leading-[1.05] font-normal tracking-[-0.015em] text-transparent">
            Where Nature
            <br />
            Meets Home
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#book"
              className="rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-clay-600"
            >
              Book Now
            </a>
            <a
              href="#experience"
              className="rounded-full border border-ink/25 px-7 py-3.5 text-sm font-semibold text-ink transition hover:border-clay-600 hover:bg-clay-600 hover:text-white"
            >
              Discover More
            </a>
          </div>
        </div>

        {/* ===== Your video — unchanged, spans both rows on lg ===== */}
        <div className="relative min-h-[46vh] bg-forest-950 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={`/${encodeURIComponent("Norbuling drone.mp4")}`} type="video/mp4" />
          </video>
          {/* bottom scrim so the white half of the wordmark stays readable */}
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
        </div>

        {/* ===== White band holding the giant wordmark ===== */}
        <div className="bg-white pt-2 pb-5 lg:col-start-1 lg:row-start-2 lg:pt-3 lg:pb-6">
          <div className="relative w-full [container-type:inline-size] lg:w-[200%]">
            <span
              aria-hidden="true"
              className={`${WORDMARK} bg-gradient-to-r from-ink via-clay-600 to-clay-600 bg-clip-text text-transparent`}
            >
              NURBOLING
            </span>
            <span className="sr-only">NURBOLING Eco Friendly Homestay</span>
          </div>
        </div>
      </div>

      {/* ===== Benefits strip ===== */}
      <div className="border-t border-ink/10 bg-white px-6 py-5 sm:px-10 lg:px-14">
        <div className="grid items-center gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[1.05fr_repeat(4,1fr)]">
          <p className="text-xs leading-snug text-ink/50 lg:text-sm">
            Experience the benefits of staying with us
          </p>
          {STRIP.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/12 bg-panel text-base">
                {s.icon}
              </span>
              <span className="text-xs leading-snug font-medium text-ink/80 lg:text-[0.8rem]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
