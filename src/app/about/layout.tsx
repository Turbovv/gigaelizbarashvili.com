"use client";

import Link from "next/link";
import React, { useState, ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState<string>(pathname);

    const handleSetActiveItem = (path: string) => {
        setActiveItem(path);
    };

    const linkClass = (path: string) =>
        `text-sm font-mono px-2  transition-all duration-200 ${activeItem === path
            ? "bg-gray-400 text-black"
            : "text-gray-500 hover:text-gray-300"
        }`;

    const links = [
        { label: "gear.ts", path: "/about/gear" },
        { label: "personal.ts", path: "/" },
        { label: "work.ts", path: "/about/work" },
    ];

    return (
        <div className="relative    items-center gap-1">
            <div className="flex gap-2 bg-gray-800">
                {links.map((link) => (
                    <Link
                        key={link.path}
                        href={link.path}
                        onClick={() => handleSetActiveItem(link.path)}
                        className={linkClass(link.path)}
                    >
                        <p className="flex items-center gap-2"> <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path fill="currentColor" d="M10.425 3.606c.372.087.71.282.972.56.144.152.27.32.373.5.005.02-.671.475-1.081.728-.015.01-.074-.054-.14-.153a.882.882 0 00-.732-.438c-.47-.032-.774.215-.772.627a.569.569 0 00.067.292c.103.214.296.343.9.605 1.114.479 1.591.795 1.886 1.244a2.256 2.256 0 01.182 1.895 2.084 2.084 0 01-1.72 1.232 4.769 4.769 0 01-1.185-.013 2.857 2.857 0 01-1.582-.824 2.747 2.747 0 01-.405-.6c.046-.033.093-.064.143-.09l.578-.333.448-.263.093.136c.158.226.359.418.59.566a1.444 1.444 0 001.514-.077.676.676 0 00.087-.863c-.12-.173-.367-.319-1.069-.623a3.85 3.85 0 01-1.465-.899 2.05 2.05 0 01-.427-.777 3.113 3.113 0 01-.027-.992A1.895 1.895 0 019.247 3.57a3.937 3.937 0 011.178.036zm-3.65.65l.004.635H4.754v5.752H3.325v-5.75H1.3v-.625c-.006-.214 0-.428.017-.642.008-.01 1.24-.014 2.732-.012l2.718.008.008.633z"></path></svg>{link.label}</p>
                    </Link>
                ))}
            </div>
            {children}
        </div>
    );
}
