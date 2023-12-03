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
      views: true,
      submissions: true
    }
  });

  const views = stats?.views || 0;
  const submissions = stats?.submissions || 0;

  let submissionRate = 0;

  if (views > 0) {
    submissionRate = (submissions / views) * 100;
  }

  const bounceRate = ((views - submissions) / views) * 100;

  return { views, submissions, submissionRate, bounceRate };
}
