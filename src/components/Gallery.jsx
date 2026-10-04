const ITEMS = [
  { icon: "🌄", caption: "Sunrise over the valley", cls: "sm:row-span-2" },
  { icon: "🍲", caption: "Family-style homemade dinner", cls: "" },
  { icon: "🏡", caption: "Our eco cottage", cls: "" },
  { icon: "🎭", caption: "Cultural evenings", cls: "" },
  { icon: "🌿", caption: "Kitchen garden & orchards", cls: "sm:col-span-2" },
  { icon: "🛏️", caption: "Warm, clean rooms", cls: "" },
];

export default function Gallery() {
  return (
    <section
      id="gallery"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="reveal text-center">
        <p className="text-xs font-bold tracking-[0.28em] text-ink/45 uppercase">
          Moments at Nurboling
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
          A Glimpse of <em className="text-gold-600 italic">Your Next Memory</em>
        </h2>
        <div className="mx-auto mt-5 h-px w-24 bg-ink/20" />
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 [&_figure]:h-48 sm:[&_figure]:h-52">
        {ITEMS.map((it) => (
          <figure
            key={it.caption}
            className={`relative flex items-center justify-center overflow-hidden rounded-2xl border border-ink/8 bg-gradient-to-br from-cream-100 to-[#e7e5df] transition hover:scale-[1.02] hover:shadow-[0_24px_45px_-28px_rgba(13,21,18,0.45)] ${it.cls}`}
          >
            <span className="text-5xl opacity-70">{it.icon}</span>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent px-4 pt-10 pb-3 text-xs font-semibold text-white sm:text-sm">
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-ink/45 italic">
        Photos from your actual property can be dropped in here — replace the
        placeholders anytime.
      </p>
    </section>
  );
}
