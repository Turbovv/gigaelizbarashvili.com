"use client";
import { api } from "~/trpc/react";
import Lines from "../lines";

export default function Page() {
  const { data: softwaresData } = api.softwares.getSoftwares.useQuery();
  const { data: hostingsData } = api.hostings.getHostings.useQuery();

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
      className="custom-scroll p-2 lg:p-5  max-lg:w-[900px]"
      style={{
        display: "flex",
        fontFamily: "'Fira Code', monospace",
        color: "#d4d4d4",
        overflowY: "auto",
      }}
    >
      <Lines content={content} />
      <div>
        <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
          const <span className="text-white">software</span> = <span style={{color: "rgb(166, 172, 205)"}}>[</span>
        </p>
        <div style={{ paddingLeft: "20px" }}>
          {softwaresData?.map((interest, idx) => (
            <p key={idx}>
              <span>
              <span style={{color: "rgb(166, 172, 205)"}}>
              &#123;
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>name:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.name}',
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>desc:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.desc}',
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>tags:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{interest.tags}',
                  </span>
                  <br />
                  <span style={{color: "rgb(166, 172, 205)"}}>
                  &#125;,
                  </span>
              </span>
            </p>
          ))}
        </div>
        <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
          const <span className="text-white">hostings</span> = <span style={{color: "rgb(166, 172, 205)"}}>[</span>
        </p>
        <div style={{ paddingLeft: "20px" }}>
          {hostingsData?.map((hosting, idx) => (
            <p key={idx}>
              <span>
              <span style={{color: "rgb(166, 172, 205)"}}>
              &#123;
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>name:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{hosting.name}',
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>desc:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{hosting.desc}',
                  </span>
                  <br />
                  <span className="ml-5" style={{ color: "rgb(173, 215, 255)" }}>tags:</span>
                  <span style={{ color: "rgb(93, 228, 199)" }}>
                    {' '}
                    '{hosting.tags}',
                  </span>
                  <br />
                  <span style={{color: "rgb(166, 172, 205)"}}>
                  &#125;,
                  </span>
              </span>
            </p>
          ))}
        </div>
        <p>];</p>
      </div>
    </div>
  );
}
