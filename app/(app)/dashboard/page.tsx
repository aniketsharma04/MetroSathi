import {
  CalendarPlus,
  Search,
  MessageCircle,
  ArrowRight,
  MapPin,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const howItWorks = [
  {
    icon: CalendarPlus,
    title: "Add your trip",
    description: "Post your metro route and travel time",
  },
  {
    icon: Search,
    title: "Find companions",
    description: "Search for travelers on similar routes",
  },
  {
    icon: MessageCircle,
    title: "Connect & chat",
    description: "Send requests and chat in-app",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A] md:text-3xl">
          Metro Connect
        </h1>
        <p className="mt-1 text-sm text-[#666666]">
          Find your travel companion today
        </p>
      </div>

      {/* How it Works */}
      <div className="rounded-xl bg-white p-4 shadow-sm md:p-6">
        <h2 className="mb-4 text-base font-semibold text-[#1A1A1A]">
          How it works
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E6F2FF]">
                <step.icon size={20} className="text-[#0066CC]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#1A1A1A]">
                  {step.title}
                </h3>
                <p className="mt-0.5 text-xs text-[#666666]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Trips Section */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-[#1A1A1A]">My Trips</h2>
          <Link
            href="/trips"
            className="flex items-center gap-1 text-sm font-medium text-[#0066CC]"
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        {/* Empty State */}
        <div className="flex flex-col items-center rounded-xl bg-white py-10 shadow-sm">
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
            <MapPin size={28} className="text-[#999999]" />
          </div>
          <h3 className="text-base font-medium text-[#1A1A1A]">
            No trips yet
          </h3>
          <p className="mt-1 text-sm text-[#666666]">
            Add your first trip to find travel companions
          </p>
          <Link href="/trips/new" className="mt-4">
            <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
              <CalendarPlus size={18} />
              Add Trip
            </Button>
          </Link>
        </div>
      </div>

      {/* CTAs */}
      <div className="grid gap-3 md:grid-cols-2">
        <Link href="/trips/new" className="block">
          <Button className="h-12 w-full gap-2 bg-[#0066CC] text-[15px] hover:bg-[#0052A3]">
            <CalendarPlus size={20} />
            Add New Trip
          </Button>
        </Link>
        <Link href="/search" className="block">
          <Button
            variant="outline"
            className="h-12 w-full gap-2 border-[#0066CC] text-[15px] text-[#0066CC] hover:bg-[#E6F2FF]"
          >
            <Search size={20} />
            Find Companions
          </Button>
        </Link>
      </div>
    </div>
  );
}
