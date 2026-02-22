"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import AxiosInstance from "@/utils/axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock } from "lucide-react";

const passwordSchema = z.object({
    oldPassword: z.string().min(6, "Current password is required"),
    newPassword: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(50),
});

type PasswordForm = z.infer<typeof passwordSchema>;

export default function UpdatePassword() {
    const [loading, setLoading] = useState(false);

    const { handleSubmit, register, formState: { errors }, reset } = useForm<PasswordForm>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const onSubmit = async (values: PasswordForm) => {
        try {
            setLoading(true);

            await AxiosInstance.patch("/users/change-password", values);

            alert("✅ Password updated successfully!");

            reset()
        } catch {
            alert("Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-md">
            <h2 className="text-2xl font-bold">Update Password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        {...register("oldPassword")}
                        placeholder="Old Password"
                        className="w-full pl-12 pr-4 py-3 rounded-full border"
                    />
                    {errors.oldPassword && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.oldPassword.message}
                        </p>
                    )}
                </div>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        {...register("newPassword")}
                        placeholder="New Password"
                        className="w-full pl-12 pr-4 py-3 rounded-full border"
                    />
                    {errors.newPassword && (
                        <p className="text-xs text-red-500 mt-1">
                            {errors.newPassword.message}
                        </p>
                    )}
                </div>

                <Button
                    disabled={loading}
                    className="w-full"
                >
                    {loading ? "Updating..." : "Update Password"}
                </Button>
            </form>
        </div>
    );
}