import { useEffect, useRef, useState } from "react";

/** Adds `.visible` to elements with the `reveal` class as they scroll into view. */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current ?? document;
    const els = root.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return ref;
}

/** Simple mobile-menu-aware sticky state helper could go here; kept minimal. */
export function useScrolled(offset = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);
  return scrolled;
}
