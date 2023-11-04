import { currentUser } from "@clerk/nextjs";

export async function GetFormStats() {
  const user = currentUser();

  if (!user) {
    throw new Error("User not found");
  }
}
