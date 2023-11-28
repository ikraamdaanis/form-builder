"use server";

import { db } from "database/db";
import { formSubmissions } from "database/schema";

type SubmitFormArgs = {
  formId: string;
  content: string;
};

/** Creates a form submission for a published form. */
export async function createSubmission(args: SubmitFormArgs) {
  const submission = db
    .insert(formSubmissions)
    .values({
      ...args
    })
    .returning();

  return submission;
}
