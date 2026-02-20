import ViewEvents from "@/components/user/ViewEvents";

function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="relative overflow-hidden">
        {/* background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 opacity-40 blur-3xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Discover Amazing Events
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse thousands of hackathons, tech meetups, workshops, and
            competitions happening around the world. Find your next opportunity
            to learn, build, and connect.
          </p>

          {/* decorative stats */}
          <div className="flex justify-center gap-8 pt-6 text-sm text-gray-500">
            <div>
              <p className="text-2xl font-bold text-black">10K+</p>
              Events
            </div>
            <div>
              <p className="text-2xl font-bold text-black">5K+</p>
              Participants
            </div>
            <div>
              <p className="text-2xl font-bold text-black">200+</p>
              Partners
            </div>
          </div>
        </div>
      </div>

      {/* EVENTS LIST */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <ViewEvents />
      </div>
    </div>
  );
}

export default EventsPage;