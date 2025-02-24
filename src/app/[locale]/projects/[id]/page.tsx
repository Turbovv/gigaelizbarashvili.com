"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { ClipLoader } from "react-spinners";
import ProjectDetailsCard from "~/components/projectList/Id/projectId";

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();

  const projectid = Number(id);
  const { data: project, isLoading } = api.projects.getProjectById.useQuery({
    id: projectid,
  });

  const locale = pathname.split("/")[1] || "en";

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-20">
        <ClipLoader color="#5de4c7" />
      </div>
    );

  return (
    <div
      style={{
        maxHeight: "700px",
      }}
      className="flex justify-center items-center p-4 custom-scroll"
    >
      {project && (
        <ProjectDetailsCard
          project={project}
          locale={locale}
          onBack={() => router.push(`/${locale}/projects`)}
        />
      )}
    </div>
  );
}
