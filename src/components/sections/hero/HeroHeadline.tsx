import { HEADLINE_POSITIONING, HERO_EYEBROW } from "./constants";

export function HeroHeadline() {
  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-section-label text-white/80">{HERO_EYEBROW}</p>
      <h1 className="mt-4 font-display text-display-md text-white md:text-display-lg">
        {HEADLINE_POSITIONING}
      </h1>
    </div>
  );
}

export default HeroHeadline;
