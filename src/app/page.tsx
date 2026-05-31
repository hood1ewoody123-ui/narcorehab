import LandingCanvas from "@/components/layout/LandingCanvas";
import StickySiteHeader from "@/components/layout/StickySiteHeader";
import LandingCanvasRest from "@/components/layout/LandingCanvasRest";
import ConversationStart from "@/components/sections/ConversationStart";
import Hero from "@/components/sections/Hero";
import Positioning from "@/components/sections/Positioning";
import Pains from "@/components/sections/Pains";
import Programs from "@/components/sections/Programs";
import Safety from "@/components/sections/Safety";
import Timeline from "@/components/sections/Timeline";
import WhyUs from "@/components/sections/WhyUs";
import Doctors from "@/components/sections/Doctors";
import FinalCta from "@/components/sections/FinalCta";
import ServiceCatalog from "@/components/sections/ServiceCatalog";
import Testimonials from "@/components/sections/Testimonials";
import ContactForm from "@/components/sections/ContactForm";
import Family from "@/components/sections/Family";
import MethodologyMap from "@/components/sections/MethodologyMap";
import RehabCenter from "@/components/sections/RehabCenter";
import TopicArticles from "@/components/sections/TopicArticles";
import EventsExpertise from "@/components/sections/EventsExpertise";
import LicensesSection from "@/components/sections/LicensesSection";
import PartnersCommunity from "@/components/sections/PartnersCommunity";
import HomeShell from "@/components/layout/HomeShell";
import SiteBottom from "@/components/layout/SiteBottom";

export default function Home() {
  return (
    <main>
      <HomeShell>
      <StickySiteHeader />
      <Hero />
      <LandingCanvas>
        <Positioning />
        <Pains />
        <Safety />
        <ConversationStart />
        <Programs />
      </LandingCanvas>
      <LandingCanvasRest>
        <Timeline />
        <WhyUs />
        <Doctors />
        <FinalCta />
        <ServiceCatalog />
        <Testimonials />
        <ContactForm />
        <Family />
        <MethodologyMap />
        <RehabCenter />
        <TopicArticles />
        <EventsExpertise />
        <LicensesSection />
        <PartnersCommunity />
      </LandingCanvasRest>
      <SiteBottom />
      </HomeShell>
    </main>
  );
}
