"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const newLocale = currentLocale === "en" ? "ka" : "en";
  const newPath = `/${newLocale}${pathname.substring(3)}`;

  return (
    <div>
      <Link
        href={newPath}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
      >
        <Image
          src={newLocale === "ka" ? "/ka-flag.png" : "/uk-flag.png"}
          alt={newLocale === "ka" ? "Georgian Flag" : "UK Flag"}
          width={20}
          height={15}
          className="w-5 h-4 rounded-sm"
        />
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          {newLocale.toUpperCase()}
        </span>
      </Link>
    </div>
  );
}
