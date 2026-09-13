"use client";

import { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/schemas/auth-schema";
import { loginAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginInput) => {
    setServerError("");
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      const result = await loginAction(formData);
      if (result?.error) {
        setServerError(result.error);
        toast.error(result.error);
      }
    });
  };

  return (
    <Card className="w-full shadow-2xl border-border/60 rounded-3xl bg-card/95 backdrop-blur-md overflow-hidden">
      <CardHeader className="space-y-4 text-center pt-8 md:pt-10 px-6 md:px-8">
        <div className="mx-auto w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 shadow-sm border border-primary/10">
          <ShieldCheck className="w-7 h-7 text-primary" />
        </div>
        <CardTitle className="text-3xl md:text-4xl tracking-tight text-primary font-[family-name:--font-playfair] italic">Welcome Back</CardTitle>
        <CardDescription className="text-base text-muted-foreground leading-relaxed">
          Sign in to access your administrative dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 md:px-8 pb-8 md:pb-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2.5">
            <Label htmlFor="email" className="font-semibold text-foreground/80 text-sm">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              className="h-11 md:h-12 rounded-xl bg-background/50 border-border/60 focus-visible:ring-primary/20 shadow-sm"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="password" className="font-semibold text-foreground/80 text-sm">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 md:h-12 rounded-xl bg-background/50 border-border/60 focus-visible:ring-primary/20 shadow-sm"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          
          {serverError && (
            <div className="text-sm text-destructive font-medium p-3 bg-destructive/10 rounded-xl border border-destructive/20 text-center shadow-sm">
              {serverError}
            </div>
          )}

          <Button type="submit" className="w-full h-11 md:h-12 rounded-xl text-base font-semibold shadow-md hover:shadow-lg transition-all" disabled={isPending}>
            {isPending ? "Signing in..." : "Sign In to Dashboard"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
