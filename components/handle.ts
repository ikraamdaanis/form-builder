"use server";

import { db } from "database/db";

export async function handleClick() {
  const data = await db.query.forms.findMany({});
  console.log("DATA: ", data);

  // const newForm = await db.insert(form).values({ name: "test 4" }).returning();

  // console.log("NEW FORM: ", newForm);
}
