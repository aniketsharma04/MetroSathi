import { UserCircle } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">Profile</h1>
        <p className="mt-1 text-sm text-[#666666]">Manage your profile</p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
          <UserCircle size={28} className="text-[#999999]" />
        </div>
        <h3 className="text-base font-medium text-[#1A1A1A]">
          Profile page coming in Phase 2
        </h3>
      </div>
    </div>
  );
}
