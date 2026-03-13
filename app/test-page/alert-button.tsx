"use client";

import { Button } from "@/components/ui/button";

export function AlertButton() {
  return (
    <Button onClick={() => window.alert("welcome to application")}>
      alert
    </Button>
  );
}
