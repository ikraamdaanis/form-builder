"use client";

import { Alert, AlertDescription, AlertTitle } from "components/ui/alert";
import { AlertCircle } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
};

export default function Error({ error }: Props) {
  return (
    <div className="h-full w-full p-4">
      <Alert className="w-full rounded-sm border bg-red-200">
        <AlertTitle className="flex items-center gap-2 text-zinc-900">
          <AlertCircle />
          Something went wrong!
        </AlertTitle>
        <AlertDescription className="text-zinc-900">
          {error.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
