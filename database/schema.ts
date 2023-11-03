import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const forms = pgTable("forms", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull().default("default_name"),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

// model Form {
//   id          String   @id @default(uuid())
//   userId      String
//   createdAt   DateTime @default(now())
//   published   Boolean  @default(false)
//   name        String
//   description String   @default("")
//   content     String   @default("[]")

//   visits      Int @default(0)
//   submissions Int @default(0)

//   shareURL        String            @unique @default(uuid())
//   FormSubmissions FormSubmissions[]

//   @@unique([name, userId])
// }

// model FormSubmissions {
//   id        String   @id @default(uuid())
//   createdAt DateTime @default(now())
//   formId    String
//   form      Form     @relation(fields: [formId], references: [id])

//   content String
// }
