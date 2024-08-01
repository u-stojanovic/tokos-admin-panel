"use client";
import { redirect } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    lastname: z.string().min(2, "Lastname must be at least 2 characters long"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast({
          title: "User registered successfully",
          description: result.message,
        });
        redirect("/");
      } else {
        toast({
          title: "Error",
          description: result.message || "An error occurred",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      console.error("An unexpected error occurred:", error);
    }
  };

  return (
    <section className="mx-auto flex flex-col justify-center items-center content-center mt-10">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl">Create account</CardTitle>
          <CardDescription>
            Already have an account?{" "}
            <Link href="/login" className="underline" prefetch={false}>
              Login
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastname">Lastname</Label>
              <Input
                id="lastname"
                placeholder="Enter your lastname"
                {...register("lastname")}
              />
              {errors.lastname && (
                <span className="text-red-600">{errors.lastname.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                {...register("username")}
              />
              {errors.username && (
                <span className="text-red-600">{errors.username.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                placeholder="Enter your password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <span className="text-red-600">{errors.password.message}</span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <span className="text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
