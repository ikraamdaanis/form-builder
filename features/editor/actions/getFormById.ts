"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { forms } from "database/schema";
import { and, eq } from "drizzle-orm";

/** Fetches a form via an id. */
export async function getFormById(formId: string) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return db.query.forms.findFirst({
    where: and(eq(forms.userId, user.id), eq(forms.id, formId))
  });
}

/** Fetches a form via an id for the public */
export async function getPublicFormById(formId: string) {
  return db.query.forms.findFirst({
    where: eq(forms.id, formId),
    columns: {
      submissions: false,
      visits: false,
      userId: false
    }
  });
}
