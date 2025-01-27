"use client";
import Link from "next/link";
import { api } from "~/trpc/react";
import { ClipLoader } from "react-spinners";

export default function Page() {
  const { data: projectsData, isLoading, } = api.projects.getProjects.useQuery();
  if (isLoading) return <div className="flex justify-center items-center h-20"><ClipLoader color="#5de4c7" /></div>;

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
          <Link key={project.id} href={`/projects/${project.id}`}>
          <div
          style={{
            backgroundColor: "#252525",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "transform 0.3s, box-shadow 0.3s",
          }}
        >
          <img
            src={project.url}
            alt={project.name}
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "8px",
            }}
          />
          <div className="p-2">
          <h2
            style={{
              fontSize: "1.5rem",
              color: "#add7ff",
            }}
          >
            {project.name}
          </h2>
          <p
            style={{
              fontSize: "1rem",
              color: "#ccc",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              lineHeight: "1.6",
            }}
          >
            {project.desc}
          </p>
          </div>
        </div>
        </Link>
        ))}
      </div>
    </div>
  );
}
