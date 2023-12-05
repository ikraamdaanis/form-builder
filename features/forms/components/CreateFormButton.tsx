"use client";

import { Button } from "components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "components/ui/dialog";
import { CreateFormForm } from "features/forms/components/CreateFormForm";
import { useState } from "react";

/**
 * Modal for creating a form. Displays the form for creating a form which then
 * leads the admin to the form editor once the form is created.
 */
export const CreateFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="h-8 bg-brandColour font-semibold text-white transition hover:bg-brandColour hover:brightness-110">
          Create new Form
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-50 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Create a new Form</DialogTitle>
          <DialogDescription>
            Make a form to start collecting submissions.
          </DialogDescription>
        </DialogHeader>
        <CreateFormForm closeModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
