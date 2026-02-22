import RegisteredEvents from "@/components/user/Registered";

function UserRegistrationsViewPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          My Registered Events
        </h1>
        <p className="text-gray-500">
          View all events you have registered for.
        </p>
      </div>

      <RegisteredEvents />
    </div>
  );
}

export default UserRegistrationsViewPage;