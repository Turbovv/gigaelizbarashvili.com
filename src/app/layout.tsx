import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";
import Home from "~/components/home";
import AnimatedCircles from "~/components/animated-circles";

export const metadata: Metadata = {
  title: "Giga Elizbarashvili",
  description: "Developer portfolio showcasing projects, skills, and creativity.",
  icons: [{ rel: "icon", url: "/terminal.png" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        style={{
          backgroundImage:
            "linear-gradient(90deg, #444 2px, transparent 0), linear-gradient(180deg, #444 2px, transparent 0)",
          backgroundSize: "5vh 5vh",
          backgroundColor: "rgb(61, 61, 61)",
        }}
        className="min-h-screen"
      >
        <div
          className="fixed h-[300%] w-[300%] bg-grain-noise opacity-5 animate-grain pointer-events-none top-0 max-lg:hidden"
          aria-hidden="true"
        ></div>
        <div className="max-lg:hidden">
        <AnimatedCircles />
        </div>
        <SessionProvider>
          <TRPCReactProvider>
            <div className="hidden max-lg:block">
              <Home>{children}</Home>
            </div>
            <div className="max-lg:hidden">
              <Home>{children}</Home>
            </div>
          </TRPCReactProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
