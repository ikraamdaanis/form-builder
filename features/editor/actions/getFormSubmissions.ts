import { db } from "database/db";
import { formSubmissions } from "database/schema";
import { eq } from "drizzle-orm";

/** Fetches a form via an id for the public */
export async function getFormSubmissions(formId: string) {
  return db.query.formSubmissions.findMany({
    where: eq(formSubmissions.formId, formId)
  });
}
