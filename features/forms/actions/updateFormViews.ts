"use server";

import { db } from "database/db";
import { FormUpdateSchema, forms } from "database/schema";
import { eq } from "drizzle-orm";

/** Updates a form. */
export async function updateFormViews(formId: string, viewCount: number) {
  const values: Partial<FormUpdateSchema> = {
    id: formId,
    views: viewCount,
    updatedAt: new Date()
  };

  return db
    .update(forms)
    .set({ ...values })
    .where(eq(forms.id, formId));
}
