import localFont from "next/font/local";

export const silka = localFont({
  src: [
    {
      path: "../../public/fonts/silka/silka-regular-webfont.woff2",
      style: "regular",
      weight: "400",
    },
    {
      path: "../../public/fonts/silka/silka-semibold-webfont.woff2",
      style: "regular",
      weight: "600",
    },
    {
      path: "../../public/fonts/silka/silka-semibold-webfont.woff2",
      style: "regular",
      weight: "700",
    },
  ],
  variable: "--font-silka",
});
