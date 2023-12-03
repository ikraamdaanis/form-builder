"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { forms } from "database/schema";
import { eq } from "drizzle-orm";
import { updateFormViews } from "features/forms/actions/updateFormViews";
import { PublicForm } from "features/forms/types";
import { generatePublicForm } from "features/forms/utils/generatePublicForm";
import { getCookies } from "next-client-cookies/server";

/**
 * Fetches a form for the public. If the form isn't published then it can only
 * be accessed by its admin who is currently signed into the application. The
 * views count for the form is increased only if it's the first time the user
 * has seen the form. We're tracking this via a local cookie.
 */
export async function fetchPublicForm(
  formId: string
): Promise<PublicForm | null> {
  const user = await currentUser();
  const cookies = getCookies();

  const formCookie = cookies.get(formId);

  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId)
  });

  const updatedViewCount = (form?.views || 0) + 1;

  if (!form?.published) {
    // If there's no user then we return null.
    if (!user) return null;

    // If the user is the admin for the form we return the form.
    if (user.id === form?.userId) {
      if (!formCookie) updateFormViews(formId, updatedViewCount);

      return generatePublicForm(form);
    }

    // If the user is an admin but not for this form, then we return null.
    return null;
  }

  if (!formCookie) updateFormViews(formId, updatedViewCount);
  return generatePublicForm(form);
}
