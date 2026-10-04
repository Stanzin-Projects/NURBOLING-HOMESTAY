export function Marquee() {
  const text =
    "Views · Culture · Homemade Food · Extra Bed · Hot Water · Eco Friendly · Warm Hospitality · ";
  return (
    <div className="overflow-hidden bg-ink py-3.5 whitespace-nowrap">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="pr-4 text-xs font-bold tracking-[0.16em] text-gold-500 uppercase sm:text-sm"
          >
            {text.repeat(4)}
          </span>
        ))}
      </div>
    </div>
  );
}

const EXPERIENCES = [
  {
    icon: "🌄",
    title: "Stunning Views",
    body: "Sip butter tea on the terrace while the mountains glow at sunrise. Every window frames a postcard.",
  },
  {
    icon: "🎭",
    title: "Living Culture",
    body: "Join local festivals, try on traditional dress, and hear stories passed down through generations.",
  },
  {
    icon: "🍛",
    title: "Homemade Food",
    body: "Fresh, organic meals cooked by our family — nothing frozen, nothing store-bought, all heart.",
  },
  {
    icon: "🌱",
    title: "Eco Friendly",
    body: "Solar warm water, kitchen gardens, zero single-use plastic. Travel that gives back to the land.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="reveal text-center">
        <p className="text-xs font-bold tracking-[0.28em] text-ink/45 uppercase">
          The Nurboling Experience
        </p>
        <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
          More Than a Stay — <em className="text-gold-600 italic">A Way of Life</em>
        </h2>
        <div className="mx-auto mt-5 h-px w-24 bg-ink/20" />
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {EXPERIENCES.map((c) => (
          <article
            key={c.title}
            className="group rounded-2xl border border-ink/8 bg-panel p-7 transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_55px_-32px_rgba(13,21,18,0.45)]"
          >
            <div className="text-4xl transition group-hover:scale-110 group-hover:inline-block">
              {c.icon}
            </div>
            <h3 className="font-display mt-4 text-lg font-semibold text-ink">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/60">{c.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const FACILITIES = [
  {
    icon: "🛏️",
    title: "Extra Bed on Request",
    body: "Travelling as a family or group? Add an extra bed — no problem, just ask while booking.",
  },
  {
    icon: "🚿",
    title: "24/7 Hot Water",
    body: "Solar-heated hot water available round the clock for a warm, comfortable bath any time.",
  },
  {
    icon: "📶",
    title: "Free Wi-Fi",
    body: "Stay connected in the rooms and common areas — share those views instantly.",
  },
  {
    icon: "🍵",
    title: "Local Tea & Snacks",
    body: "Welcome drink on arrival and endless cups of authentic local tea.",
  },
  {
    icon: "🔥",
    title: "Indoor Heating",
    body: "Cozy heated lounges and blankets for chilly mountain evenings.",
  },
  {
    icon: "🅿️",
    title: "Safe Parking",
    body: "Free secure parking for cars and bikes right next to the homestay.",
  },
];

export function Facilities() {
  return (
    <section id="facilities" className="border-y border-ink/8 bg-cream-100 px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
      <div className="mx-auto w-full max-w-7xl">
        <div className="reveal text-center">
          <p className="text-xs font-bold tracking-[0.28em] text-ink/45 uppercase">
            Comfort Included
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
            Basic Facilities, <em className="text-gold-600 italic">Thoughtfully Done</em>
          </h2>
          <div className="mx-auto mt-5 h-px w-24 bg-ink/20" />
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACILITIES.map((f) => (
            <div
              key={f.title}
              className="flex gap-4 rounded-2xl border border-ink/8 border-l-2 border-l-gold-500/80 bg-white p-6 transition hover:-translate-y-1.5 hover:shadow-[0_24px_45px_-30px_rgba(13,21,18,0.4)]"
            >
              <span className="text-3xl">{f.icon}</span>
              <div>
                <h4 className="font-display text-base font-semibold text-ink">{f.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-ink/60">{f.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
