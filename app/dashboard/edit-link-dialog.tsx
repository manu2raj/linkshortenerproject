"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Pencil } from "lucide-react";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editLink } from "@/app/dashboard/actions";
import type { Link } from "@/db/schema";

const formSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL." }),
  shortCode: z
    .string()
    .min(1, { message: "Short code is required." })
    .max(50, { message: "Short code must be 50 characters or less." })
    .regex(/^[a-zA-Z0-9_-]+$/, {
      message: "Only letters, numbers, hyphens, and underscores are allowed.",
    }),
});

type FormValues = z.infer<typeof formSchema>;

interface EditLinkDialogProps {
  link: Link;
}

export function EditLinkDialog({ link }: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: link.originalUrl,
      shortCode: link.shortCode,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: FormValues) {
    setServerError(null);
    const result = await editLink({ id: link.id, ...values });

    if ("error" in result) {
      const err = result.error;
      if (!err) return;
      if (typeof err === "string") {
        setServerError(err);
      } else {
        const fieldErrors = err.fieldErrors;
        if (fieldErrors.originalUrl?.[0]) {
          form.setError("originalUrl", { message: fieldErrors.originalUrl[0] });
        }
        if (fieldErrors.shortCode?.[0]) {
          form.setError("shortCode", { message: fieldErrors.shortCode[0] });
        }
      }
      return;
    }

    setOpen(false);
    router.refresh();
  }

  function handleOpenChange(value: boolean) {
    if (!value) {
      form.reset({ originalUrl: link.originalUrl, shortCode: link.shortCode });
      setServerError(null);
    }
    setOpen(value);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit short link</DialogTitle>
          <DialogDescription>
            Update the destination URL or short code for this link.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/long-url"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Code</FormLabel>
                  <FormControl>
                    <Input placeholder="my-link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError && (
              <p className="text-sm font-medium text-destructive">
                {serverError}
              </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
