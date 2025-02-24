import Link from "next/link";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <pre className="flex h-full flex-col items-center justify-center space-y-2.5 whitespace-pre-wrap md:space-y-5">
      <div className="w-full max-w-lg mt-16 max-lg:p-6 space-y-6 dark:text-gray-300">
        <div className="text-base">
          {t("intro.greeting")}{" "}
          <Link
            target="_blanket"
            href="https://github.com/Turbovv"
            className="dark:text-blue-400 text-blue-700 hover:underline font-semibold"
          >
            {t("intro.role")}
          </Link>
          , {t("intro.description")}{" "}
          <span className="font-semibold text-primary">{t("intro.tech_react")}</span>{" "}
          {t("connector")}{" "}
          <span className="font-semibold text-primary">{t("intro.tech_typescript")}</span>,{" "}
          {t("intro.goal")}
        </div>

        <div className="text-base">
          {t("experience.transition_statement")}{" "}
          <Link
            target="_blanket"
            href="https://react.dev"
            className="dark:text-blue-400 text-blue-700 hover:underline font-semibold"
          >
            {t("experience.tech_react")}
          </Link>
          , {t("experience.past_experience")}{" "}
          <Link
            target="_blanket"
            href="https://vuejs.org"
            className="dark:text-blue-400 text-blue-700 hover:underline font-semibold"
          >
            {t("experience.tech_vue")}
          </Link>
          , {t("experience.contribution")}
        </div>

        <div className="text-base">
          {t("hobbies.intro")}{" "}
          <span className="font-semibold text-primary">{t("hobbies.gaming")}</span>,{" "}
          <span className="font-semibold text-primary">{t("hobbies.walking")}</span>,{" "}
          <span className="font-semibold text-primary">{t("hobbies.music")}</span>{" "}
          {t("connector")}{" "}
          <span className="font-semibold text-primary">{t("hobbies.socializing")}</span>.
        </div>
        
        <div className="text-base">
          {t("career_goals.statement")}
          <span className="font-semibold text-primary">{t("career_goals.growth")}</span>
          {t("career_goals.contribute")}
        </div>

      </div>
    </pre>
  );
}
