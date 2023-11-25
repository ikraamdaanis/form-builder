"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { FormUpdateSchema, forms } from "database/schema";
import { and, eq } from "drizzle-orm";

/** Updates a form. */
export async function updateForm(values: FormUpdateSchema) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return db
    .update(forms)
    .set({ ...values, userId: user.id })
    .where(and(eq(forms.id, values.id || ""), eq(forms.userId, user.id)))
    .returning();
}
