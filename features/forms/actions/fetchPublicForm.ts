"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { Form, forms } from "database/schema";
import { eq } from "drizzle-orm";
import { PublicForm } from "features/forms/types";

/**
 * Fetches a form for the public. If the form isn't published then it can only
 * be accessed by its admin who is currently signed into the application.
 */
export async function fetchPublicForm(
  formId: string
): Promise<PublicForm | null> {
  const user = await currentUser();

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    columns: {
      visits: false
    }
  });

  if (!form?.published) {
    // If there's no user then we return null.
    if (!user) return null;

    // If the user is the admin for the form we return the form.
    if (user.id === form?.userId) return form;

    // If the user is an admin but not for this form, then we return null.
    return null;
  }

  const publicForm = form as Omit<Form, "userId"> & { userId?: string };
  delete publicForm["userId"];

  return form;
}
