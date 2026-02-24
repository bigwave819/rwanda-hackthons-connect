"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import z from "zod";
import { useAuthStore } from "@/store/useAuthStore";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6).max(12),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login, isLoading, error, user } = useAuthStore();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors } } =
    useForm<LoginFormValues>({
      resolver: zodResolver(loginSchema),
    });

  const onSubmit = async (data: LoginFormValues) => {
    setFormError(null);

    const success = await login(data.email, data.password);

    if (!success) {
      setFormError("Invalid email or password");
      return;
    }

    // Redirect based on role
    const currentUser = useAuthStore.getState().user;

    if (currentUser?.role === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      router.push("/");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-2xl p-8 w-full max-w-md space-y-6 bg-white shadow">
        
        <div className="text-center">
          <h1 className="font-bold text-3xl">Login</h1>
          <p className="text-gray-500 text-sm mt-2">
            Welcome back! Sign in to continue.
          </p>
        </div>

        {formError && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm">
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email")}
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-full border"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-full border"
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            disabled={isLoading}
            className="w-full flex justify-center text-center bg-black text-white py-3 rounded-full hover:bg-black/80 transition"
          >
            {isLoading ? <Spinner /> : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
