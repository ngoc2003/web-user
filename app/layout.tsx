import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeProviderClient from "./providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

import "./globals.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import QueryProvider from "./providers/QueryProvider";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Pet Connect",
  description: "Generated by create next app",
  icons: {
    icon: "/noTextLogo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster />
          <ThemeProviderClient>{children}</ThemeProviderClient>
        </QueryProvider>
      </body>
    </html>
  );
}
