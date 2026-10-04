const REVIEWS = [
  {
    quote:
      "The views from the terrace left us speechless, and the homemade food was the best we had on the whole trip. Family, not hotel.",
    name: "— Tenzin, Delhi",
  },
  {
    quote:
      "Hot water any time, extra bed ready for our son, and they explained every bit of the local culture to us. Truly eco and truly warm.",
    name: "— Sarah & Mark, UK",
  },
  {
    quote:
      "Woke up to mountains, ate grandma's recipes, joined a festival. Nurboling made our trip unforgettable.",
    name: "— Ananya, Bengaluru",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="border-t border-ink/8 bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="reveal text-center">
          <p className="text-xs font-bold tracking-[0.28em] text-ink/45 uppercase">
            Guest Love
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
            Rated <em className="text-gold-600 italic">4.9 / 5</em> by Travelers
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-ink/20" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <article
              key={r.name}
              className="rounded-2xl border border-ink/8 bg-panel p-7 transition hover:-translate-y-2 hover:shadow-[0_28px_55px_-32px_rgba(13,21,18,0.4)]"
            >
              <div className="mb-3 tracking-[0.2em] text-gold-600">★★★★★</div>
              <p className="text-ink/80 italic leading-relaxed">"{r.quote}"</p>
              <strong className="mt-4 block text-sm font-semibold text-ink/70">
                {r.name}
              </strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
