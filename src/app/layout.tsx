import { silka } from "@/styles/font";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Outlier App",
  description: "Conference schedule and more",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-silka ${silka.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
