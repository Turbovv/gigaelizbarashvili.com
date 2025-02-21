import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "GuestBook | GigaElizbarashvili",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function GuestBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}