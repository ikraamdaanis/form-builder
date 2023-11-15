import { Loader } from "lucide-react";

const BuilderPageLoader = async () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader className="h-12 w-12 animate-spin" />
    </div>
  );
};

export default BuilderPageLoader;
