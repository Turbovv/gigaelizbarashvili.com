import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { skills } from "~/server/db/schema";
import { eq } from "drizzle-orm"
import { db } from "~/server/db";


export const skillsRouter = createTRPCRouter({
  getSkills: publicProcedure.query(async ({ ctx }) => {
    const skillsData = await ctx.db.query.skills.findMany();
    return skillsData.map((skill) => ({
      languages: skill.languages.split(",").map((lang) => lang.trim()),
      frameworks: skill.frameworks.split(",").map((fw) => fw.trim()),
      databases: skill.databases.split(",").map((db) => db.trim()),
      tools: skill.tools.split(",").map((tool) => tool.trim()),
    }));
  }),
});
