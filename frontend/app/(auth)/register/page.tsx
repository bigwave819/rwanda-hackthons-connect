"use client";

import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterSchema = z
  .object({
    fullname: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(12, "Password max is 12"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterType = z.infer<typeof RegisterSchema>;

function RegisterHere() {
  const { register: registerUser, isLoading } = useAuthStore();
  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterType) => {
    setFormError(null);

    const success = await registerUser(data.fullname, data.email, data.password);

    if (success) {
      router.push("/"); // redirect after successful registration
    } else {
      setFormError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      <div className="rounded-2xl p-8 w-full max-w-md space-y-6 bg-white shadow">
        {/* Title */}
        <div className="text-center">
          <h1 className="font-bold text-3xl">Create an Account</h1>
          <p className="text-gray-500 text-sm mt-2">
            Join Rwanda Hackathon and start browsing
            <br /> thousands of opportunities
          </p>
        </div>

        {formError && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded">
            {formError}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Fullname */}
          <div>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("fullname")}
                placeholder="Full Name"
                className="w-full pl-12 pr-4 py-3 rounded-full border"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.fullname?.message}</p>
          </div>

          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                {...register("email")}
                placeholder="Email"
                className="w-full pl-12 pr-4 py-3 rounded-full border"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-full border"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          </div>

          {/* Confirm Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className="w-full pl-12 pr-4 py-3 rounded-full border"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
          </div>

          {/* Button */}
          <button
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-full hover:bg-black/80"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {/* Link */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterHere;
