import { HEADLINE_POSITIONING } from "./constants";

export function HeroHeadline() {
  return (
    <h1 className="max-w-4xl font-display text-display-md text-white">
      {HEADLINE_POSITIONING}
    </h1>
  );
}

export default HeroHeadline;
