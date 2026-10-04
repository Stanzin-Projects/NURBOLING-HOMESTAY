import { useMemo, useState } from "react";

const EXTRA_BED_RATE = 300;
const STORAGE_KEY = "nurboling_bookings";

const ROOMS = {
  standard: { label: "Standard Room", rate: 1200, capacity: 2 },
  family: { label: "Family Room", rate: 1800, capacity: 4 },
};

const PERKS = [
  "✅ Instant on-screen confirmation",
  "✅ Free cancellation up to 48 hours before check-in",
  "✅ Best rate guaranteed — book direct only",
  "✅ Extra bed & dietary requests noted automatically",
];

function isoPlus(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatDate(str) {
  return new Date(str + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function nightsBetween(a, b) {
  if (!a || !b) return 0;
  const n = Math.round(
    (new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000
  );
  return n > 0 ? n : 0;
}

function isoPlusN(dateStr, days) {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

export default function Booking() {
  const today = isoPlus(0);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    checkin: isoPlus(1),
    checkout: isoPlus(2),
    guests: "2",
    room: "standard",
    extraBed: false,
    notes: "",
  });
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const quote = useMemo(() => {
    const nights = nightsBetween(form.checkin, form.checkout);
    if (!nights) return null;
    const room = ROOMS[form.room];
    const roomTotal = room.rate * nights;
    const bedTotal = form.extraBed ? EXTRA_BED_RATE * nights : 0;
    return { nights, roomTotal, bedTotal, total: roomTotal + bedTotal, rate: room.rate };
  }, [form.checkin, form.checkout, form.room, form.extraBed]);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) return setError("Please enter your full name.");
    if (!/^[+\d][\d\s\-()]{7,}$/.test(form.phone.trim()))
      return setError("Please enter a valid phone number.");
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      return setError("Please enter a valid email address.");
    if (!quote) return setError("Please select a valid check-in and check-out date.");
    if (quote.nights > 30)
      return setError("For stays longer than 30 nights, please call us directly.");

    const guests = form.guests === "6+" ? 6 : Number(form.guests);
    const room = ROOMS[form.room];
    if (guests > room.capacity + 1)
      return setError(
        "Too many guests for one room — please call us to arrange multiple rooms."
      );

    const record = {
      id: "NUR-" + Date.now().toString(36).toUpperCase().slice(-6),
      ...form,
      guests,
      nights: quote.nights,
      total: quote.total,
      createdAt: new Date().toISOString(),
    };

    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      all.push(record);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      /* storage unavailable — still confirm */
    }

    setBooking(record);
    setForm({
      name: "",
      phone: "",
      email: "",
      checkin: isoPlus(1),
      checkout: isoPlus(2),
      guests: "2",
      room: "standard",
      extraBed: false,
      notes: "",
    });
  }

  const inputCls =
    "w-full rounded-xl border border-ink/12 bg-white px-4 py-3 text-ink placeholder:text-ink/35 outline-none transition focus:border-ink/45 focus:ring-4 focus:ring-ink/5";
  const labelCls = "text-[0.7rem] font-bold tracking-[0.16em] text-ink/50 uppercase";

  return (
    <section
      id="book"
      className="relative overflow-hidden border-t border-ink/8 bg-cream-100 px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        {/* Left column */}
        <div className="reveal">
          <p className="text-xs font-bold tracking-[0.28em] text-ink/45 uppercase">
            Reserve Your Stay
          </p>
          <h2 className="font-display mt-3 text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-4xl lg:text-5xl">
            Book in <em className="text-gold-600 italic">30 Seconds</em>
          </h2>
          <div className="mt-5 h-px w-24 bg-ink/20" />

          <p className="mt-6 text-ink/70">
            Fill the form, get an instant booking confirmation on screen, and we'll
            call you to finalise the details. No prepayment needed to reserve.
          </p>

          <ul className="mt-6 grid gap-2.5 text-sm font-medium text-ink/75">
            {PERKS.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>

          <div className="mt-8 grid gap-4 rounded-2xl border border-ink/10 bg-white p-5 sm:grid-cols-2">
            {Object.entries(ROOMS).map(([key, r]) => (
              <div key={key} className="flex flex-col">
                <span className="text-[0.68rem] tracking-[0.18em] text-ink/50 uppercase">
                  {r.label}
                </span>
                <strong className="font-display text-3xl text-ink">
                  ₹{r.rate.toLocaleString("en-IN")}
                </strong>
                <small className="text-ink/50">
                  per night / {r.capacity} guests
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          noValidate
          className="reveal grid gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-[0_30px_60px_-35px_rgba(13,21,18,0.35)] sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className={labelCls}>Full name *</span>
              <input
                className={inputCls}
                placeholder="Your name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Phone / WhatsApp *</span>
              <input
                className={inputCls}
                type="tel"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
              />
            </label>
          </div>

          <label className="grid gap-1.5">
            <span className={labelCls}>Email</span>
            <input
              className={inputCls}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className={labelCls}>Check-in *</span>
              <input
                className={`${inputCls} [color-scheme:light]`}
                type="date"
                min={today}
                value={form.checkin}
                onChange={(e) => {
                  const v = e.target.value;
                  const next = { checkin: v };
                  if (v && form.checkout <= v) {
                    next.checkout = isoPlusN(v, 1);
                  }
                  setForm((f) => ({ ...f, ...next }));
                }}
                required
              />
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Check-out *</span>
              <input
                className={`${inputCls} [color-scheme:light]`}
                type="date"
                min={form.checkin ? isoPlusN(form.checkin, 1) : today}
                value={form.checkout}
                onChange={(e) => set("checkout", e.target.value)}
                required
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-1.5">
              <span className={labelCls}>Guests *</span>
              <select
                className={inputCls}
                value={form.guests}
                onChange={(e) => set("guests", e.target.value)}
              >
                {["1", "2", "3", "4", "5", "6+"].map((g) => (
                  <option key={g} value={g} className="bg-white text-ink">
                    {g === "6+" ? "6+ guests" : `${g} guest${g === "1" ? "" : "s"}`}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span className={labelCls}>Room type *</span>
              <select
                className={inputCls}
                value={form.room}
                onChange={(e) => set("room", e.target.value)}
              >
                <option value="standard" className="bg-white text-ink">
                  Standard Room — ₹1,200/night
                </option>
                <option value="family" className="bg-white text-ink">
                  Family Room — ₹1,800/night
                </option>
              </select>
            </label>
          </div>

          <label className="grid gap-1.5">
            <span className={labelCls}>Requests</span>
            <textarea
              className={`${inputCls} resize-y`}
              rows={3}
              placeholder="Extra bed, hot water timing, food preferences, arrival time…"
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </label>

          <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-ink">
            <input
              type="checkbox"
              className="h-5 w-5 accent-forest-700"
              checked={form.extraBed}
              onChange={(e) => set("extraBed", e.target.checked)}
            />
            I need an <strong className="text-forest-700">extra bed</strong> (₹
            {EXTRA_BED_RATE} / night)
          </label>

          {/* Live quote */}
          <div className="grid gap-1 rounded-xl border border-ink/10 bg-panel px-4 py-3">
            <div className="flex justify-between text-sm text-ink/70">
              <span>
                {quote
                  ? `${quote.nights} night${quote.nights > 1 ? "s" : ""} × ₹${quote.rate.toLocaleString("en-IN")}${
                      quote.bedTotal
                        ? ` + extra bed ₹${quote.bedTotal.toLocaleString("en-IN")}`
                        : ""
                    }  ·  ${form.guests} guest${form.guests === "1" ? "" : "s"}`
                  : "Select dates to see price"}
              </span>
            </div>
            <div className="font-display text-xl font-bold text-ink sm:text-2xl">
              {quote ? `Total  ₹${quote.total.toLocaleString("en-IN")}` : ""}
            </div>
          </div>

          <button
            type="submit"
            className="rounded-full bg-ink px-6 py-4 text-sm font-bold tracking-[0.14em] text-white uppercase transition hover:-translate-y-0.5 hover:bg-forest-950"
          >
            Confirm Booking
          </button>
          <p role="alert" className="min-h-5 text-sm font-semibold text-clay-600">
            {error}
          </p>
        </form>
      </div>

      {/* Confirmation modal */}
      {booking && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setBooking(null)}
        >
          <div className="animate-pop w-full max-w-md rounded-3xl border border-black/10 bg-white p-8 text-center text-ink shadow-2xl">
            <div className="text-5xl">🎉</div>
            <h3 className="font-display mt-2 text-2xl font-semibold text-ink">
              Booking Confirmed!
            </h3>
            <p className="mt-1 text-sm text-ink/65">
              {booking.name}, your stay at NURBOLING is reserved for{" "}
              {booking.nights} night{booking.nights > 1 ? "s" : ""}.
            </p>

            <div className="my-5 rounded-xl border border-dashed border-gold-500/70 bg-panel px-4 py-4 font-display text-base leading-relaxed font-semibold text-forest-950">
              <strong>{booking.id}</strong>
              <br />
              {formatDate(booking.checkin)} → {formatDate(booking.checkout)}
              <br />
              {booking.guests} guest{booking.guests > 1 ? "s" : ""} ·{" "}
              {ROOMS[booking.room].label}
              {booking.extraBed ? " + extra bed" : ""}
              <br />
              Total ₹{booking.total.toLocaleString("en-IN")}
            </div>

            <p className="mb-4 text-xs text-ink/55">
              We'll contact you on your phone within a few hours to confirm
              availability. Please save your booking ID.
            </p>
            <button
              onClick={() => setBooking(null)}
              className="w-full rounded-full bg-ink px-6 py-3.5 text-sm font-bold tracking-[0.14em] text-white uppercase transition hover:-translate-y-0.5 hover:bg-forest-950"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
