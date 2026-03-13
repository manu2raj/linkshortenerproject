"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import {
  createLinkRecord,
  updateLinkRecord,
  deleteLinkRecord,
} from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or less." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Only letters, numbers, hyphens, and underscores are allowed.",
    }),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLink(input: CreateLinkInput) {
  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const link = await createLinkRecord({
      userId,
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.shortCode,
    });
    return { success: true, data: link };
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("unique")
        ? "That short code is already taken. Please choose another."
        : "Something went wrong. Please try again.";
    return { error: message };
  }
}

const editLinkSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or less." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Only letters, numbers, hyphens, and underscores are allowed.",
    }),
});

type EditLinkInput = z.infer<typeof editLinkSchema>;

export async function editLink(input: EditLinkInput) {
  const parsed = editLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const link = await updateLinkRecord(parsed.data.id, userId, {
      originalUrl: parsed.data.originalUrl,
      shortCode: parsed.data.shortCode,
    });
    if (!link) {
      return { error: "Link not found." };
    }
    return { success: true, data: link };
  } catch (err) {
    const message =
      err instanceof Error && err.message.includes("unique")
        ? "That short code is already taken. Please choose another."
        : "Something went wrong. Please try again.";
    return { error: message };
  }
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLink(input: DeleteLinkInput) {
  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.flatten() };
  }

  const { userId } = await auth();
  if (!userId) {
    return { error: "Unauthorized" };
  }

  try {
    const deleted = await deleteLinkRecord(parsed.data.id, userId);
    if (!deleted) {
      return { error: "Link not found." };
    }
    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
}
