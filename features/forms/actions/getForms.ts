"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { forms } from "database/schema";
import { eq } from "drizzle-orm";

/** Fetches all of the forms for the account. */
export async function getForms() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  return db.query.forms.findMany({
    where: eq(forms.userId, user.id)
  });
}
