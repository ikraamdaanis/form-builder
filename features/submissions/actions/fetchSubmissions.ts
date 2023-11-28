"use server";

import { db } from "database/db";
import { formSubmissions } from "database/schema";
import { desc, eq } from "drizzle-orm";

/** Fetches form submissions for a specific form. */
export async function fetchSubmissions(formId: string, limit: number) {
  return db.query.formSubmissions.findMany({
    where: eq(formSubmissions.formId, formId),
    limit: limit || 10,
    orderBy: desc(formSubmissions.createdAt)
  });
}
