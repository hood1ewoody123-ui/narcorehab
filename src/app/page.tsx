import LandingCanvas from "@/components/layout/LandingCanvas";
import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Safety from "@/components/sections/Safety";

export default function Home() {
  return (
    <main>
      <Hero />
      <LandingCanvas>
        <Pains />
        <Safety />
        {/* Programs, Timeline, Family… — следующие секции сюда же */}
      </LandingCanvas>
    </main>
  );
}
