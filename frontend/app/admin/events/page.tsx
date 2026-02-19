import { Search } from "lucide-react";
import AddEvents from "@/components/admin/evidences/AddEvents";
import EventView from "@/components/admin/evidences/ViewEvents";

function AdminEventsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Browse and Manage Events
          </h1>
          <p className="text-muted-foreground">
            On this page you can browse and search events
          </p>
        </div>

        {/* SEARCH */}
        <div className="relative w-full md:w-87.5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="search"
            placeholder="Search events..."
            className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* EVENTS SECTION */}
      <div className="">
        <div className="flex justify-end w-full">

          <AddEvents />
        </div>
        <EventView />
      </div>
    </div>
  );
}

export default AdminEventsPage;
