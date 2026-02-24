"use client";

import Footer from "@/components/layout/Footer";
import { useEvents } from "@/hooks/useEvents";

export default function Home() {
  const { events, isLoading, error } = useEvents();

  if (error instanceof Error) {
    return (
      <div className="bg-red-100 text-red-600 p-4 rounded-lg text-center">
        Failed to load events: {error.message}
      </div>
    );
  }

  // SAFE: Ensure events is an array before trying to use array methods
  const featured = Array.isArray(events) ? events.slice(0, 6) : [];

  return (
    <div className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative text-center py-24 px-6">
        <div className="relative max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Start Exploring Thousands of
            <br />
            <span className="text-blue-600 bg-clip-text">
              Hackathons & Events
            </span>
            <br />
            Happening in Rwanda 🇷🇼
          </h1>

          <p className="text-gray-600 text-lg">
            Discover tech competitions, innovation challenges, meetups, and
            opportunities to build your career.
          </p>

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:scale-105 transition">
            Explore Events
          </button>
        </div>
      </section>

      {/* FEATURED EVENTS */}
      <section className="max-w-6xl mx-auto px-6 pb-20 space-y-8">
        <h2 className="text-3xl font-bold text-center">
          Featured Events
        </h2>

        {isLoading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="h-40 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {!isLoading && (
          <div className="grid md:grid-cols-3 gap-6">
            {featured.length > 0 ? (
              featured.map((event) => (
                <div
                  key={event.id}
                  className="bg-white shadow rounded-xl overflow-hidden hover:shadow-lg transition"
                >
                  <img
                    src={event.thumbnail}
                    alt={event.title}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {event.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      📅 {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-500 py-10">
                No events found
              </div>
            )}
          </div>
        )}
      </section>

      {/* Rest of your component remains the same */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="space-y-3">
            <div className="text-4xl">🚀</div>
            <h3 className="font-bold text-xl">Find Opportunities</h3>
            <p className="text-gray-600">
              Discover hackathons and events that boost your skills.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🤝</div>
            <h3 className="font-bold text-xl">Connect</h3>
            <p className="text-gray-600">
              Meet developers, startups, and innovators.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-4xl">🏆</div>
            <h3 className="font-bold text-xl">Win Prizes</h3>
            <p className="text-gray-600">
              Participate and win amazing rewards.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}