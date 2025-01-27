"use client";
import { api } from "~/trpc/react";
import Lines from "../lines";
import DataSection from "./_components/data-section";

export default function Page() {
  const { data: softwaresData = [] } = api.softwares.getSoftwares.useQuery();
  const { data: hostingsData = [] } = api.hostings.getHostings.useQuery();

  const codeLinesSoftwares = softwaresData
    ?.map(
      (software) => `
  {
    name: '${software.name}',
    desc: '${software.desc}',
    tags: '${software.tags}',
  }`
    )
    .join(",")
    .trim();

  const codeLinesHostings = hostingsData
    ?.map(
      (hosting) => `
  {
    name: '${hosting.name}',
    desc: '${hosting.desc}',
    tags: '${hosting.tags}',
  }`
    )
    .join(",")
    .trim();

  const content = `const software = [${codeLinesSoftwares}];

const hostings = [
${codeLinesHostings}];`.trim();

  return (
    <div
      className="custom-scroll p-2 lg:p-5 max-lg:w-[900px]"
      style={{
        display: "flex",
        fontFamily: "'Fira Code', monospace",
        color: "#d4d4d4",
        overflowY: "auto",
      }}
    >
      <Lines content={content} />
      <div>
        <DataSection title="software" data={softwaresData} />
        <DataSection title="hostings" data={hostingsData} />
      </div>
    </div>
  );
}