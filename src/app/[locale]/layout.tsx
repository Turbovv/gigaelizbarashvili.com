import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import type { PropsWithChildren } from "react";

type LocaleLayoutProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren<LocaleLayoutProps>) {
  const { locale } = await params;

  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    notFound();
  }

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="mt-10">{children}</div>
    </NextIntlClientProvider>
  );
}
