"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Calendar,
  ImageIcon,
  Trophy,
  Users,
  FileText,
  Plus,
} from "lucide-react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";


export const eventSchema = z.object({
  title: z.string().min(3, "Title required"),
  date: z
    .string()
    .refine(
      (date) => new Date(date) >= new Date(new Date().toDateString()),
      "Date cannot be in the past"
    ),
  partners: z.string().min(2, "Partners required"),
  prize: z.string().min(1, "Prize required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  thumbnail: z
    .any()
    .refine((files) => files?.length === 1, "Image required"),
});

export type EventFormData = z.infer<typeof eventSchema>;

type CloudinarySignature = {
  signature: string;
  timestamp: number;
  apiKey: string;
};

export default function AddEvents() {
  const [open, setOpen] = useState(false);
  const { createEvent, isCreating } = useEvents();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
  });

  async function getCloudinarySignature(): Promise<CloudinarySignature> {
    const timestamp = Math.round(Date.now() / 1000);

    const res = await fetch("/api/cloudinary/signature", {
      method: "POST",
      body: JSON.stringify({ timestamp }),
    });

    if (!res.ok) throw new Error("Failed to get signature");

    return res.json();
  }


  const onSubmit = async (data: EventFormData) => {
    try {
      const { signature, timestamp, apiKey } = await getCloudinarySignature();

      const file = data.thumbnail[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append("timestamp", timestamp.toString());
      formData.append("signature", signature);
      formData.append("folder", "events");

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const uploadData = await uploadRes.json();

      // Send event to backend (status not included)
      createEvent({
        title: data.title,
        date: new Date(data.date).toISOString(),
        partners: data.partners,
        prize: data.prize,
        description: data.description,
        thumbnail: uploadData.secure_url,
      });

      // Reset form and close dialog
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-black dark:bg-gray-300 dark:text-gray-900 text-white hover:bg-gray-800 transition">
          <Plus size={18} /> Add Hackathon
        </button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Add New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* TEXT INPUTS */}
          {[
            { icon: FileText, name: "title", placeholder: "Event Title" },
            { icon: Users, name: "partners", placeholder: "Partners" },
            { icon: Trophy, name: "prize", placeholder: "Prize" },
          ].map((field, i) => (
            <div key={i}>
              <div className="relative">
                <field.icon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  {...register(field.name as keyof EventFormData)}
                  placeholder={field.placeholder}
                  className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <p className="text-red-500 text-sm">
                {errors[field.name as keyof EventFormData]?.message as string}
              </p>
            </div>
          ))}

          {/* DESCRIPTION */}
          <div>
            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <textarea
                {...register("description")}
                placeholder="Event Description"
                rows={4}
                className="w-full pl-12 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-black outline-none resize-none"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.description?.message}</p>
          </div>

          {/* DATE */}
          <div>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="date"
                min={today}
                {...register("date")}
                className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.date?.message}</p>
          </div>

          {/* IMAGE */}
          <div>
            <div className="relative">
              <ImageIcon
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="file"
                accept="image/*"
                {...register("thumbnail")}
                className="w-full pl-12 pr-4 py-3 rounded-full border focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <p className="text-red-500 text-sm">{errors.thumbnail?.message as string}</p>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-3 rounded-full bg-black text-white font-semibold hover:bg-gray-800 transition disabled:opacity-50"
          >
            {isCreating ? "Creating..." : "Create Event"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
