import { Button } from "@nextui-org/button";
import Link from "./components/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 p-4 w-full text-xl">
      <div className="text-center">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
      </div>
      <Link href={"/"}>
        <Button color="default" size="lg">Return Home</Button>
      </Link>
    </div>
  );
}
