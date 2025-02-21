import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Gear | GigaElizbarashvili",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function GearLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}