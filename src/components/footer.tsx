"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState<string>(pathname);

    const handleSetActiveItem = (path: string) => {
        setActiveItem(path);
    };

    const linkClass = (path: string) =>
        `text-lg leading-none font-mono px-2 transition-all duration-200 ${activeItem === path
            ? "bg-gray-400 text-black"
            : "text-gray-500 hover:text-gray-300"
        }`;

    const links = [
        { label: "home", path: "/" },
        { label: "abouts", path: "/about/work" },
        { label: "projects", path: "/projects" },
        { label: "guest-book", path: "/guest-book" },
    ];

    return (
        <div className="relative  px-2 max-lg:py-5 custom-scroll flex items-center gap-1">
            <div className="grid absolute w-full">
                <span className="text-sm font-mono text-gray-500 max-lg:hidden">~/main</span>

                <div className="flex gap-2 overflow-x-auto sm:overflow-x-hidden whitespace-nowrap sm:whitespace-normal">
                    <span className="text-lg font-mono px-2 rounded-sm leading-none bg-gray-400 text-black">
                        cmd
                    </span>
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            onClick={() => handleSetActiveItem(link.path)}
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
