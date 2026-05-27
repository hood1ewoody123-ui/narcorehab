import ContactRow from "@/components/sections/ContactRow";
import Faq from "@/components/sections/Faq";
import SiteFooter from "@/components/sections/SiteFooter";

export default function SiteBottom() {
  return (
    <div className="relative bg-cream">
      <div
        className="pointer-events-none absolute inset-0 z-0 hidden bg-[url('/images/dandelion.png')] bg-[length:auto_min(885px,92vh)] bg-[position:center_bottom] bg-no-repeat opacity-100 md:block lg:bg-[position:34%_bottom]"
        aria-hidden
      />

      <div className="relative z-[1]">
        <Faq />
        <ContactRow />
        <SiteFooter />
      </div>
    </div>
  );
}
