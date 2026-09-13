import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-background">
      <h2 className="text-4xl font-bold tracking-tight text-primary">404</h2>
      <h3 className="text-xl font-medium text-foreground">Page Not Found</h3>
      <p className="text-muted-foreground text-center max-w-sm">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button render={<Link href="/" />} className="mt-4">
        Return Home
      </Button>
    </div>
  );
}
