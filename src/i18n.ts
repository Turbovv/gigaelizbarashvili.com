/* eslint-disable */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

const locales = ["en", "ka"] as const;
const defaultLocale = "en";
type ArrayToUnion<T extends readonly string[]> = T[number];

export type LocalesType = ArrayToUnion<typeof locales>;

export default getRequestConfig(async ({ locale, requestLocale }) => {
  const requestedLocale = locale ?? (await requestLocale);
  const finalLocale: LocalesType =
    requestedLocale != null && locales.includes(requestedLocale as LocalesType)
      ? (requestedLocale as LocalesType)
      : defaultLocale;

  try {
    return {
      locale: finalLocale,
      messages: (await import(`../messages/${finalLocale}.json`)).default,
    };
  } catch (error) {
    console.error(`Error loading locale messages for ${finalLocale}:`, error);
    return notFound();
  }
});
