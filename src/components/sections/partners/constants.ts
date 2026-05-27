export const PARTNERS_TITLE = "Нам доверяют партнёры и сообщества";

export const PARTNERS_ALL_HREF = "#";

export const PARTNERS_ALL_LABEL = "Все письма (6)";

export type PartnerLetter = {
  id: string;
  imageSrc: string;
  alt: string;
  rotate: string;
  className: string;
};

export const PARTNER_LETTERS: PartnerLetter[] = [
  {
    id: "b1",
    imageSrc: "/images/partners/1.jpg",
    alt: "Письмо благодарности 1",
    rotate: "-5deg",
    className:
      "left-1/2 top-[6%] -translate-x-[calc(50%+54px)] md:left-[4%] md:top-[6%] md:translate-x-0",
  },
  {
    id: "b2",
    imageSrc: "/images/partners/2.jpg",
    alt: "Письмо благодарности 2",
    rotate: "2deg",
    className: "left-1/2 top-0 -translate-x-1/2 md:left-[30%] md:top-0 md:translate-x-0",
  },
  {
    id: "b3",
    imageSrc: "/images/partners/3.jpg",
    alt: "Письмо благодарности 3",
    rotate: "4deg",
    className:
      "left-1/2 top-[4%] -translate-x-[calc(50%-54px)] md:left-[56%] md:top-[2%] md:translate-x-0",
  },
  {
    id: "b4",
    imageSrc: "/images/partners/4.jpg",
    alt: "Письмо благодарности 4",
    rotate: "-3deg",
    className:
      "left-1/2 top-[38%] -translate-x-[calc(50%+40px)] md:left-[14%] md:top-[42%] md:translate-x-0",
  },
  {
    id: "b5",
    imageSrc: "/images/partners/5.jpg",
    alt: "Письмо благодарности 5",
    rotate: "5deg",
    className: "left-1/2 top-[36%] -translate-x-1/2 md:left-[42%] md:top-[40%] md:translate-x-0",
  },
  {
    id: "b6",
    imageSrc: "/images/partners/6.jpg",
    alt: "Письмо благодарности 6",
    rotate: "-4deg",
    className:
      "left-1/2 top-[40%] -translate-x-[calc(50%-40px)] md:left-[68%] md:top-[38%] md:translate-x-0",
  },
];
