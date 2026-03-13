"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteLink } from "@/app/dashboard/actions";
import type { Link } from "@/db/schema";

interface DeleteLinkDialogProps {
  link: Link;
}

export function DeleteLinkDialog({ link }: DeleteLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  async function handleDelete() {
    setIsDeleting(true);
    setServerError(null);

    const result = await deleteLink({ id: link.id });

    if ("error" in result) {
      const err = result.error;
      setServerError(
        typeof err === "string"
          ? err
          : "Something went wrong. Please try again.",
      );
      setIsDeleting(false);
      return;
    }

    setOpen(false);
    router.refresh();
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      setServerError(null);
    }
    setOpen(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete short link</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the link{" "}
            <span className="font-mono font-semibold">{link.shortCode}</span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        {serverError && (
          <p className="text-sm font-medium text-destructive">{serverError}</p>
        )}
        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
