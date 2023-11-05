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
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export const CreateFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="group flex h-[190px] flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:cursor-pointer hover:border-primary"
        >
          <PlusIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary" />
          <p className="text-xl font-bold text-muted-foreground group-hover:text-primary">
            Create new form
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent>
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
