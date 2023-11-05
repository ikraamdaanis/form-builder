"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { forms } from "database/schema";
import { CreateFormSchema, createFormSchema } from "features/forms/types";

export async function createForm(data: CreateFormSchema) {
  const validation = createFormSchema.safeParse(data);

  if (!validation.success) {
    throw new Error("form not valid");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { name, description } = data;

  const form = await db
    .insert(forms)
    .values({
      userId: user.id,
      name,
      description
    })
    .returning();

  if (!form) {
    throw new Error("something went wrong");
  }

  return form[0].id;
}
