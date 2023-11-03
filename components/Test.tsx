"use client";

import { handleClick } from "components/handle";
import { Button } from "components/ui/button";

export const Test = () => {
  return (
    <div>
      <form action={handleClick}>
        <Button type="submit">Test</Button>
      </form>
    </div>
  );
};
