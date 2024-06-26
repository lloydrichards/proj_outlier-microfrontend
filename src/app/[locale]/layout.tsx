import { silka } from "@/styles/font";
import "@/styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata = {
  title: "Outlier App",
  description: "Conference schedule and more",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body className={`font-silka ${silka.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
