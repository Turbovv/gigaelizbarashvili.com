"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "~/trpc/react";
import { ClipLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import ProjectCard from "~/components/projectList/project";

export default function Projects() {
  const { data: projectsData, isLoading } = api.projects.getProjects.useQuery();
  const pathname = usePathname();
  const router = useRouter();

  const locale = pathname.split("/")[1] || "en";

  useEffect(() => {
    if (pathname === "/projects") {
      router.replace(`/${locale}/projects`);
    }
  }, [pathname, locale, router]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-20">
        <ClipLoader color="#5de4c7" />
      </div>
    );

  return (
    <div
      style={{
        fontFamily: "'Fira Code', monospace",
        padding: "20px",
        color: "#d4d4d4",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {projectsData?.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </div>
  );
}
