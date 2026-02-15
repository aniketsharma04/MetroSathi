import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export default function ConnectionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-[#1A1A1A]">Connections</h1>
        <p className="mt-1 text-sm text-[#666666]">
          Manage your travel connections
        </p>
      </div>

      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="requests" className="flex-1">
            Requests
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex-1">
            My Connections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-4">
          <div className="flex flex-col items-center rounded-xl bg-white py-16 shadow-sm">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
              <Users size={28} className="text-[#999999]" />
            </div>
            <h3 className="text-base font-medium text-[#1A1A1A]">
              No pending requests
            </h3>
            <p className="mt-1 text-sm text-[#666666]">
              Connection requests will appear here
            </p>
          </div>
        </TabsContent>

        <TabsContent value="connections" className="mt-4">
          <div className="flex flex-col items-center rounded-xl bg-white py-16 shadow-sm">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F3F5]">
              <Users size={28} className="text-[#999999]" />
            </div>
            <h3 className="text-base font-medium text-[#1A1A1A]">
              No connections yet
            </h3>
            <p className="mt-1 text-sm text-[#666666]">
              Search for companions to get started
            </p>
            <Link href="/search" className="mt-4">
              <Button className="gap-2 bg-[#0066CC] hover:bg-[#0052A3]">
                Find Companions
              </Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
