import type { Metadata } from "next";

import { AlertButton } from "./alert-button";

export const metadata: Metadata = {
  title: "Hello World | Link Shortener",
  description: 'A test page that displays "Hello World".',
};

export default function TestPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold tracking-tight">Hello World</h1>
      <AlertButton />
    </div>
  );
}
