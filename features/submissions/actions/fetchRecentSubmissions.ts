"use server";

import { db } from "database/db";
import { formSubmissions } from "database/schema";
import { desc, eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

/** Fetches the 10 most recent form submissions for a specific form. */
export async function fetchRecentSubmissions(formId: string) {
  noStore();

  return db.query.formSubmissions.findMany({
    where: eq(formSubmissions.formId, formId),
    limit: 10,
    orderBy: desc(formSubmissions.createdAt)
  });
}
