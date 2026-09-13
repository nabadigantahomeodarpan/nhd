import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Admin Sign In | Nabadiganta Homeo Darpan",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6 bg-[url('/login-bg.webp')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-0" />
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-foreground/80 hover:text-foreground font-medium bg-background/50 hover:bg-background/80 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl backdrop-blur-md border border-border/40 transition-all shadow-sm text-sm sm:text-base">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>

      <div className="z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </main>
  );
}
