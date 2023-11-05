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

export const CreateFormButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={open => setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="">
          <p className="">Create new form</p>
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