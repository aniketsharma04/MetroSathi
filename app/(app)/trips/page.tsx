import { MapPin, CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#1A1A1A]">My Trips</h1>
          <p className="mt-1 text-sm text-[#666666]">
            Manage your metro trips
          </p>
        </div>
        <Link href="/trips/new">
          <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
            <CalendarPlus size={18} />
            Add Trip
          </Button>
        </Link>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center rounded-xl bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
          <MapPin size={28} className="text-[#999999]" />
        </div>
        <h3 className="text-base font-medium text-[#1A1A1A]">No trips yet</h3>
        <p className="mt-1 text-sm text-[#666666]">
          Add your first trip to get started
        </p>
        <Link href="/trips/new" className="mt-4">
          <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
            <CalendarPlus size={18} />
            Add Your First Trip
          </Button>
        </Link>
      </div>
    </div>
  );
}
