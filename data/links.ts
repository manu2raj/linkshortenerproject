import { desc, eq } from 'drizzle-orm';
import db from '@/db';
import { links, type Link, type NewLink } from '@/db/schema';

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLinkRecord(
  input: Pick<NewLink, 'userId' | 'originalUrl' | 'shortCode'>
): Promise<Link> {
  const [created] = await db.insert(links).values(input).returning();
  return created;
}
