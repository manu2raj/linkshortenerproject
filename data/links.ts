import { desc, eq } from "drizzle-orm";
import db from "@/db";
import { links, type Link, type NewLink } from "@/db/schema";

export async function getLinksByUserId(userId: string): Promise<Link[]> {
  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.updatedAt));
}

export async function createLinkRecord(
  input: Pick<NewLink, "userId" | "originalUrl" | "shortCode">,
): Promise<Link> {
  const [created] = await db.insert(links).values(input).returning();
  return created;
}

export async function updateLinkRecord(
  id: number,
  userId: string,
  input: Pick<NewLink, "originalUrl" | "shortCode">,
): Promise<Link | null> {
  const [updated] = await db
    .update(links)
    .set({ ...input, updatedAt: new Date() })
    .where(eq(links.id, id))
    .returning();
  return updated ?? null;
}

export async function deleteLinkRecord(
  id: number,
  userId: string,
): Promise<boolean> {
  const result = await db
    .delete(links)
    .where(eq(links.id, id))
    .returning({ id: links.id });
  return result.length > 0;
}

export async function getLinkByShortCode(
  shortCode: string,
): Promise<Link | null> {
  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return link ?? null;
}
