/* eslint-disable */
import { createNavigation } from "next-intl/navigation";

const locales = ["en", "ka"] as const;

export const { Link, redirect, usePathname, useRouter } =
  createNavigation({ locales });
