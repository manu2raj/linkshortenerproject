import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLinksByUserId } from "@/data/links";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateLinkDialog } from "@/app/dashboard/create-link-dialog";
import { EditLinkDialog } from "@/app/dashboard/edit-link-dialog";
import { DeleteLinkDialog } from "@/app/dashboard/delete-link-dialog";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userLinks = await getLinksByUserId(userId);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">
            {userLinks.length} link{userLinks.length !== 1 ? "s" : ""}
          </Badge>
          <CreateLinkDialog />
        </div>
      </div>

      {userLinks.length === 0 ? (
        <p className="text-muted-foreground text-sm">
          You haven&apos;t created any links yet.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {userLinks.map((link) => (
            <Card key={link.id}>
              <CardHeader>
                <CardTitle className="font-mono">{link.shortCode}</CardTitle>
                <CardDescription>
                  Created {new Date(link.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <a
                  href={link.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground truncate hover:underline break-all"
                >
                  {link.originalUrl}
                </a>
              </CardContent>
              <CardFooter className="flex gap-2 justify-end">
                <EditLinkDialog link={link} />
                <DeleteLinkDialog link={link} />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
