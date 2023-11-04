import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey().unique().notNull(),
  userId: text("user_id").notNull(),
  name: varchar("name", { length: 256 }).default("default_name").notNull(),
  published: boolean("published").default(false).notNull(),
  description: text("description"),
  content: text("content").default("[]"),
  visits: integer("visits").default(0).notNull(),
  shareUrl: uuid("share_url").defaultRandom().notNull(),
  submissions: integer("submissions").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type Form = InferSelectModel<typeof forms> & {
  formSubmissions?: FormSubmission[];
};

export const selectFormsSchema = createSelectSchema(forms);
export const insertFormSchema = createInsertSchema(forms);

export const formsRelations = relations(forms, ({ many }) => ({
  formSubmissions: many(formSubmissions)
}));

export const formSubmissions = pgTable("formSumissions", {
  id: uuid("id").defaultRandom().primaryKey().unique().notNull(),
  formId: uuid("form_id")
    .references(() => forms.id, { onDelete: "cascade" })
    .notNull(),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export type FormSubmission = InferSelectModel<typeof formSubmissions> & {
  form?: Form;
};

export const selectFormsSubmissionsSchema = createSelectSchema(formSubmissions);
export const insertFormSubmissionSchema = createInsertSchema(formSubmissions);

export const formSubmissionsRelations = relations(
  formSubmissions,
  ({ one }) => ({
    form: one(forms, {
      fields: [formSubmissions.formId],
      references: [forms.id]
    })
  })
);
