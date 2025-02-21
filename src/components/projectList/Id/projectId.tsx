// components/ProjectDetailsCard.tsx
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProjectDetailsCardProps {
  project: {
    name: string;
    url: string;
    desc: string;
    websitelink: string;
    githublink: string;
  };
  locale: string;
  onBack: () => void;
}

export default function ProjectDetailsCard({
  project,
  onBack,
}: ProjectDetailsCardProps) {
  return (
    <div className="max-w-6xl h-[600px] rounded-lg shadow-md p-6 flex flex-col space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-all"
      >
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
        <Link className="underline px-2 text-gray-200" href={project.websitelink}>
          Preview
        </Link>
        <Link className="underline text-gray-200" href={project.githublink}>
          Source Code
        </Link>
      </p>
    </div>
  );
}
