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
        <Button variant={"outline"} className="">
          <p className="">Create new form</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-zinc-50 dark:bg-zinc-900">
        <DialogHeader>
          <DialogTitle>Create form</DialogTitle>
          <DialogDescription>
            Create a new form to start collecting responses
          </DialogDescription>
        </DialogHeader>
        <CreateFormForm closeModal={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
