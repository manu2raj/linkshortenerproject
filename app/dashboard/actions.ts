'use server';

import { z } from 'zod';
import { auth } from '@clerk/nextjs/server';
import { createLinkRecord } from '@/data/links';

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  shortCode: z
    .string()
    .min(1, { message: 'Short code is required.' })
    .max(50, { message: 'Short code must be 50 characters or less.' })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: 'Only letters, numbers, hyphens, and underscores are allowed.',
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
    return { error: 'Unauthorized' };
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
      err instanceof Error && err.message.includes('unique')
        ? 'That short code is already taken. Please choose another.'
        : 'Something went wrong. Please try again.';
    return { error: message };
  }
}
