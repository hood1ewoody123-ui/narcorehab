"use client";

import PainsContent from "./pains/PainsContent";
import SubtractCurtainTop from "./pains/SubtractCurtainTop";

export function Pains() {
  return (
    <section id="pains" className="relative z-10 flex flex-col">
      <SubtractCurtainTop className="relative shrink-0" />
      <div className="relative bg-cream">
        <PainsContent linesScale={1} />
      </div>
    </section>
  );
}

export default Pains;
