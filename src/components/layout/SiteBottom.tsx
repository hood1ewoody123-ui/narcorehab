import Image from "next/image";
import ContactRow from "@/components/sections/ContactRow";
import Faq from "@/components/sections/Faq";
import SiteFooter from "@/components/sections/SiteFooter";

export default function SiteBottom() {
  return (
    <div className="relative overflow-x-clip bg-cream">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[min(42vw,408px)] md:flex md:items-end md:justify-end"
        aria-hidden
      >
        <Image
          src="/images/dandelion.png"
          alt=""
          width={408}
          height={885}
          className="h-full max-h-[min(885px,95vh)] w-auto object-contain object-right-bottom"
          sizes="(max-width: 768px) 0px, 408px"
        />
      </div>

      <div className="relative z-10">
        <Faq />
        <ContactRow />
        <SiteFooter />
      </div>
    </div>
  );
}
