import Link from "next/link";

export default function HomePage() {
  return (
    <pre className="flex h-full flex-col items-center justify-center space-y-2.5 whitespace-pre-wrap md:space-y-5">
      <div className="w-full max-w-lg max-lg:p-6 space-y-8 dark:text-gray-300">
      <div className="text-base">
        Hey, I’m Giga. I’m a passionate{" "}
        <Link target="_blanket" href={"https://github.com/Turbovv"} className="dark:text-blue-400 text-blue-700 hover:underline font-semibold">software developer</Link>
        , project creator and lifelong learner. I’m currently growing my
        expertise in{" "}
        <span className="font-semibold text-primary">React</span> and{" "}
        <span className="font-semibold text-primary">TypeScript</span>,
        building projects that are dynamic, scalable, and impactful.
      </div>

      <div className="text-base">
        Before transitioning to{" "}
        <Link target="_blanket" href={"https://react.dev"} className="dark:text-blue-400 text-blue-700  hover:underline font-semibold">React</Link>
        , I spent 2 years developing with{" "}
        <Link target="_blanket" href={"https://vuejs.org"} className="dark:text-blue-400 text-blue-700 hover:underline font-semibold">Vue.js</Link>
        , crafting intuitive interfaces and enhancing user experiences.
      </div>

      <div className="text-base">
        I thrive on{" "}
        <span className="font-semibold text-primary">creating</span>,{" "}
        <span className="font-semibold text-primary">learning</span>, and{" "}
        <span className="font-semibold text-primary">collaborating</span>. I
        take pride in building user-friendly applications and clean,
        maintainable code that makes a difference.
      </div>

      <div className="text-base">
        In my free time, I love{" "}
        <span className="font-semibold text-primary">playing video games</span>,{" "}
        <span className="font-semibold text-primary">walking outside</span>,{" "}
        <span className="font-semibold text-primary">listening to music</span> and{" "}
        <span className="font-semibold text-primary">talking to friends</span>.
      </div>

      <div className="text-base">
        I’m currently looking for opportunities to join a team where I can{" "}
        <span className="font-semibold text-primary">grow</span>, contribute my
        skills, and help create products that matter.
      </div>
    </div>
    </pre>
  );
}
