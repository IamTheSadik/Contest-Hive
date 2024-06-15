import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { Crosshair2Icon } from "@radix-ui/react-icons";

const FocusMode = ({
  isFocusMode,
  setFocusMode,
}: {
  isFocusMode: boolean;
  setFocusMode: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  }, []);

  return (
    <span className="relative">
      <Button
        title="Toggle Focus Mode"
        variant="outline"
        className="group h-10 w-10 select-none px-2"
        onClick={() => setFocusMode((prev) => !prev)}
      >
        <Crosshair2Icon className="h-6 w-6 cursor-pointer text-primary transition-all duration-100 active:scale-90 group-hover:rotate-45" />
      </Button>
    </span>
  );
};

export default FocusMode;
