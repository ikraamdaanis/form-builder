"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { Form, forms } from "database/schema";
import { and, eq } from "drizzle-orm";

/** Fetches a form via an id. */
export async function fetchForm(formId: string) {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("User not found");
    }

    const form = await db.query.forms.findFirst({
      where: and(eq(forms.userId, user.id), eq(forms.id, formId))
    });

    if (!form) {
      throw new Error("Form not found");
    }

    return form as Form;
  } catch (error) {
    console.error(error);
  }
}
