import { useReveal } from "./hooks.js";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import { Marquee, Experience, Facilities } from "./components/Sections.jsx";
import Gallery from "./components/Gallery.jsx";
import Booking from "./components/Booking.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef}>
      <Navbar />
      {/* Full-bleed hero — covers the whole first screen, no card margins */}
      <Hero />

      {/* Everything below runs edge-to-edge, covering all space */}
      <main>
        <Marquee />
        <Experience />
        <Facilities />
        <Gallery />
        <Booking />
        <Reviews />
      </main>
      <Footer />
    </div>
  );
}
