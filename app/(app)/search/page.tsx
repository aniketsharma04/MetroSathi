import { Search } from "lucide-react";

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">
          Find Companions
        </h1>
        <p className="mt-1 text-sm text-[#666666]">
          Search for travelers on your route
        </p>
      </div>
      <div className="flex flex-col items-center rounded-xl bg-white py-16 shadow-sm">
        <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
          <Search size={28} className="text-[#999999]" />
        </div>
        <h3 className="text-base font-medium text-[#1A1A1A]">
          Search for companions
        </h3>
        <p className="mt-1 text-center text-sm text-[#666666]">
          Enter your trip details above to find travelers
        </p>
      </div>
    </div>
  );
}
