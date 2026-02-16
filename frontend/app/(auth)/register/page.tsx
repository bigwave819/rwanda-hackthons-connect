import { Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import z from "zod";

const RegisterSchema = z.object({
  fullname: z.string().min(3, "the name is atleast 3 characters long"),
  email: z.string().email("Enter the valid email address"),
  password: z
    .string()
    .min(6, "the password is atleast 6 characters long")
    .max(12, "The password can be only 12"),
});

function RegisterHere() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
      
      {/* Card */}
      <div className="rounded-2xl p-8 w-full max-w-md space-y-6">

        {/* Title */}
        <div className="text-center">
          <h1 className="font-bold text-3xl">Create an Account</h1>
          <p className="text-muted-foreground text-sm mt-2">
            Join Rwanda Hackathon and start browsing
            <br /> thousands of opportunities
          </p>
        </div>

        <form className="space-y-4">

          {/* Fullname */}
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-3 rounded-full border bg-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Email"
              className="w-full pl-12 pr-4 py-3 rounded-full border bg-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-3 rounded-full border bg-white"
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-12 pr-4 py-3 rounded-full border bg-white"
            />
          </div>

          {/* Button */}
          <button className="w-full bg-black text-white py-3 rounded-full hover:bg-black/80 transition">
            Register
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
