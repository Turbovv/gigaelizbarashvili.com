"use client";
import React from "react";
import { api } from "~/trpc/react";
import Lines from "../lines";

export default function Personal() {
  const { data: hobbiesData } = api.hobbies.getHobbies.useQuery();

  const formattedHobbies = hobbiesData
    ?.map((hobby) =>
      hobby.name
        .split(",")
        .map((hobbyPart) => `  '${hobbyPart.trim()}',`)
        .join("\n")
    )
    .join("\n");

  const content = `
const NAME = 'Giga Elizbarashvili';

let location = 'Georgia, Rustavi';

let hobbies = [
${formattedHobbies}
];
`.trim();

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "'Fira Code', monospace",
        color: "#d4d4d4",
      }}
      className="lg:p-5 lg:pl-8 p-3 pl-3 max-lg:w-[400px]"
    >
      <Lines content={content} />

      <div
        style={{
          whiteSpace: "pre-wrap",
          width: "100%",
        }}
      >
        <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
          const <span className="text-white">NAME</span> ={" "}
          <span style={{ color: "rgb(93, 228, 199)" }}>
            'Giga Elizbarashvili';
          </span>
        </p>
        <br />
        <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
          let <span className="text-white">location</span> ={" "}
          <span style={{ color: "rgb(93, 228, 199)" }}>'Georgia, Rustavi';</span>
        </p>
        <br />
        <p style={{ color: "rgb(145, 180, 213)", fontStyle: "italic" }}>
          let <span className="text-white">hobbies</span> = <span style={{ color: "rgb(166, 172, 205)" }}>[</span>
        </p>
        <div
          style={{
            paddingLeft: "20px",
          }}
        >
          {hobbiesData?.map((hobby, idx) => (
            <div
              key={idx}
              style={{
              }}
            >
              {hobby.name.split(",").map((hobbyPart, partIdx) => (
                <span
                  key={partIdx}
                  style={{
                    display: "block",
                    color: "rgb(93, 228, 199)",
                    marginBottom: "5px",
                  }}
                >
                  '{hobbyPart.trim()}',
                </span>
              ))}
            </div>
          ))}
        </div>
        <p style={{ color: "rgb(166, 172, 205)" }}>];</p>
      </div>
    </div>
  );
}
