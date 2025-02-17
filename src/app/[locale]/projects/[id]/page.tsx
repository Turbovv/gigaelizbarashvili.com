"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ClipLoader } from "react-spinners";

export default function StackDetailsPage() {
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
        <div className="max-w-6xl h-[600px] rounded-lg shadow-md p-6 flex flex-col space-y-4">
          <button onClick={() => router.push(`/${locale}/projects`)} className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all">
            <ArrowLeft /> Back
          </button>

          <img
            src={project.url}
            alt={project.name}
            className="w-full h-auto rounded-lg"
          />
          <h2 className="text-2xl font-semibold text-gray-400">{project.name}</h2>
          <p className="text-gray-400 py-4">
            {project.desc}
            <Link className="underline px-2 text-gray-200" href={project.websitelink}>Preview.</Link>
            <Link className="underline text-gray-200" href={project.githublink}>Source Code.</Link>
          </p>
        </div>
      )}
    </div>
  );
}
