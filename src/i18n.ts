/* eslint-disable */
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { headers } from "next/headers";

const locales = ["en", "ka"];
type ArrayToUnion<T extends readonly string[]> = T[number];

export type LocalesType = ArrayToUnion<typeof locales>;

export default getRequestConfig(async () => {
  // Await headers() if it returns a promise
  const headersList = await headers();
  const detectedLocale = headersList.get("x-next-intl-locale");

  // Ensure the locale is valid; otherwise, fallback to "en"
  const finalLocale = locales.includes(detectedLocale as string)
    ? detectedLocale
    : "en";

  try {
    return {
      messages: (await import(`../messages/${finalLocale}.json`)).default,
    };
  } catch (error) {
    console.error(`Error loading locale messages for ${finalLocale}:`, error);
    return notFound();
  }
});
