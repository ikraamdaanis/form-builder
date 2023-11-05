"use server";

import { currentUser } from "@clerk/nextjs";
import { db } from "database/db";
import { forms } from "database/schema";
import { eq } from "drizzle-orm";

export async function getFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  const stats = await db.query.forms.findFirst({
    where: eq(forms.userId, user.id),
    columns: {
      visits: true,
      submissions: true
    }
  });

  const visits = stats?.visits || 0;
  const submissions = stats?.submissions || 0;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}
