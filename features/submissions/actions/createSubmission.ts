"use server";

import { db } from "database/db";
import { formSubmissions, forms } from "database/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore as noStore } from "next/cache";

type SubmitFormArgs = {
  formId: string;
  content: string;
};

/** Creates a form submission for a published form. */
export async function createSubmission(args: SubmitFormArgs) {
  noStore();

  const submission = await db
    .insert(formSubmissions)
    .values({
      ...args
    })
    .returning();

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, args.formId)
  });

  await db
    .update(forms)
    .set({
      updatedAt: new Date(),
      submissions: (form?.submissions || 0) + 1
    })
    .where(eq(forms.id, args.formId));

  return submission;
}
