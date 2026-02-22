import ProfileTabs from "@/components/user/ProfileTabs";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-muted/40 flex justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <ProfileTabs />
      </div>
    </div>
  );
}