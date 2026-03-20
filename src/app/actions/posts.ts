"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function createPost(formData: FormData) {
  const title = (formData.get("title") as string | null)?.trim();
  const content = (formData.get("content") as string | null)?.trim() || null;

  if (!title) {
    return;
  }

  await prisma.post.create({
    data: { title, content },
  });

  revalidatePath("/");
}
