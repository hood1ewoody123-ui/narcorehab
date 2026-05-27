import LandingCanvas from "@/components/layout/LandingCanvas";
import LandingCanvasRest from "@/components/layout/LandingCanvasRest";
import ConversationStart from "@/components/sections/ConversationStart";
import Hero from "@/components/sections/Hero";
import Pains from "@/components/sections/Pains";
import Programs from "@/components/sections/Programs";
import Safety from "@/components/sections/Safety";

export default function Home() {
  return (
    <main>
      <Hero />
      <LandingCanvas>
        <Pains />
        <Safety />
        <ConversationStart />
        <Programs />
      </LandingCanvas>
      <LandingCanvasRest>
        {/* Timeline, Family… — следующие секции на cream-фоне */}
        <div aria-hidden className="min-h-[40vh]" />
      </LandingCanvasRest>
    </main>
  );
}
