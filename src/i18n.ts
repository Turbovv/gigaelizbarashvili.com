/* eslint-disable */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

const locales = ["en", "ka"];
type ArrayToUnion<T extends readonly string[]> = T[number];

export type LocalesType = ArrayToUnion<typeof locales>;

export default getRequestConfig(async ({ locale }) => {

  const headersList = await headers(); 

  const detectedLocale = headersList.get("X-NEXT-INTL-LOCALE") || locale;

  if (!locales.includes(detectedLocale as string)) return notFound();

  return {
    messages: (await import(`../messages/${detectedLocale}.json`)).default,
  };
});
