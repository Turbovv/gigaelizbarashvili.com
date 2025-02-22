import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `portfolio_${name}`);

export const comments = createTable("comment", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  createdById: varchar("created_by", { length: 255 }).references(() => users.id),
  createdByName: varchar("created_by_name", { length: 255 }),
});

export const likes = createTable("like", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  commentId: integer("comment_id").notNull().references(() => comments.id),
  userId: varchar("user_id", { length: 255 }).notNull().references(() => users.id),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});


export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull().unique(),
  email: varchar("email", { length: 255 }),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));


export const skills = createTable("skill", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  languages:  varchar("languages").notNull(),
  frameworks:  varchar("frameworks").notNull(),
  databases:  varchar("databases").notNull(),
  tools:  varchar("tools").notNull(),
});

export const interests = createTable("interest", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const softwares = createTable("software", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  desc: varchar("desc", { length: 255 }).notNull(),
  tags: varchar("tags", { length: 255 }).notNull(),
});

export const hostings = createTable("hosting", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  desc: varchar("desc", { length: 255 }).notNull(),
  tags: varchar("tags", { length: 255 }).notNull(),
});

export const hobbies = createTable("hobby", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const projects = createTable(
  "project",
  {
    id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
    name: varchar("name", { length: 255 }).notNull(),
    url: varchar("url", { length: 500 }).notNull(),
    desc: varchar("desc", { length: 500 }).notNull(),
    websitelink: varchar("websitelink", { length: 255 }).notNull(),
    githublink: varchar("githublink", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  }
);

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  })
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  })
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  })
);
