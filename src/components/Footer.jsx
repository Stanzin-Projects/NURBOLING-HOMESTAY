export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-cream-100/85">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <a href="#home" className="flex items-center gap-3">
            <img src="/assets/nono.svg" alt="Nurboling logo" className="h-14 w-14" />
            <span className="flex flex-col leading-tight">
              <strong className="font-display text-xl tracking-[0.1em] text-gold-500">
                NURBOLING
              </strong>
              <small className="text-[0.7rem] tracking-[0.14em] uppercase">
                Eco Friendly Homestay
              </small>
            </span>
          </a>
          <p className="mt-4 max-w-xs text-sm">
            Nature · Culture · Homemade Food — your home in the mountains.
          </p>
        </div>

        <div>
          <h4 className="font-display mb-3 text-sm tracking-[0.2em] text-gold-500 uppercase">
            Reach Us
          </h4>
          <p className="mb-1 text-sm">
            📞{" "}
            <a href="tel:+919015911617" className="transition hover:text-gold-300">
              +91 90159 11617
            </a>
          </p>
          <p className="mb-1 text-sm">
            ✉️{" "}
            <a href="mailto:thinlestanzin777@gmail.com" className="transition hover:text-gold-300">
              thinlestanzin777@gmail.com
            </a>
          </p>
          <p className="text-sm">📍 Add your homestay address here</p>
        </div>

        <div>
          <h4 className="font-display mb-3 text-sm tracking-[0.2em] text-gold-500 uppercase">
            Explore
          </h4>
          <p className="mb-1 text-sm">
            <a href="#experience" className="transition hover:text-gold-300">
              Experience
            </a>
          </p>
          <p className="mb-1 text-sm">
            <a href="#facilities" className="transition hover:text-gold-300">
              Facilities
            </a>
          </p>
          <p className="text-sm">
            <a href="#book" className="transition hover:text-gold-300">
              Book Now
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-5 py-4 text-center text-xs opacity-75 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} NURBOLING Eco Friendly Homestay. All rights reserved. 🌿
      </div>
    </footer>
  );
}
