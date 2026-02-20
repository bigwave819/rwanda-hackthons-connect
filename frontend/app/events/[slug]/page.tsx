import EventDetails from "@/components/user/EventDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Event Details",
  description: "View detailed information about this event",
};

async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <EventDetails id={slug} />
    </div>
  );
}

export default EventDetailsPage;