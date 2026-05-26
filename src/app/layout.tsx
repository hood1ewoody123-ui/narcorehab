import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ЦМПП «Здравница» — психиатрия, наркология, восстановление",
  description:
    "Комплексная медицинская и психологическая помощь при зависимостях, тревоге, депрессии и кризисных состояниях. Анонимно. Деликатно. Москва.",
  keywords: [
    "наркология Москва",
    "психиатрия анонимно",
    "лечение зависимостей",
    "вывод из запоя",
    "кодирование",
    "реабилитация",
  ],
  openGraph: {
    title: "ЦМПП «Здравница»",
    description: "Анонимная наркологическая и психиатрическая помощь в Москве",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
