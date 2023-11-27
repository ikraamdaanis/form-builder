"use server";

import { db } from "database/db";
import { formSubmissions } from "database/schema";
import { desc, eq } from "drizzle-orm";

/**
 * Fetches the 10 most recent form submissions for a specific form.
 */
export async function getRecentFormSubmissions(formId: string) {
  return db.query.formSubmissions.findMany({
    where: eq(formSubmissions.formId, formId),
    limit: 10,
    orderBy: desc(formSubmissions.createdAt)
  });
}
