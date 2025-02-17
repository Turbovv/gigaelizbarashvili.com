"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Footer() {
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string>(pathname);
  const t = useTranslations("Footer");

  const locale = pathname.split("/")[1] || "en";

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const linkClass = (path: string) =>
    `text-lg font-mono px-2 transition-all duration-200 ${
      activeItem === path
        ? "bg-gray-400 text-black"
        : "text-gray-500 hover:text-gray-300"
    }`;

  const links = [
    { label: t("home"), path: `/${locale}` },
    { label: t("about"), path: `/${locale}/about/work` },
    { label: t("projects"), path: `/${locale}/projects` },
    { label: t("guestBook"), path: `/${locale}/guest-book` },
  ];

  return (
    <div className="relative px-2 max-lg:py-5 custom-scroll flex items-center gap-1">
      <div className="grid absolute w-full">
        <span className="text-sm font-mono text-gray-500 max-lg:hidden">
          ~/main
        </span>

        <div className="flex gap-2 overflow-x-auto sm:overflow-x-hidden whitespace-nowrap sm:whitespace-normal">
          <span className="text-lg font-mono px-2 rounded-sm bg-gray-400 text-black">
            cmd
          </span>
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={linkClass(link.path)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
