"use client";

import { BottomNav } from "./bottom-nav";
import { DesktopSidebar } from "./desktop-sidebar";
import { NotificationBell } from "@/components/notification-bell";

interface AppShellProps {
  children: React.ReactNode;
  pendingCount?: number;
}

export function AppShell({ children, pendingCount = 0 }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <DesktopSidebar pendingCount={pendingCount} />

      {/* Mobile top bar with notification bell */}
      <div className="sticky top-0 z-40 flex h-12 items-center justify-end border-b bg-white px-4 md:hidden">
        <NotificationBell />
      </div>

      <main className="pb-20 md:ml-60 md:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8 md:py-6">
          {children}
        </div>
      </main>
      <BottomNav pendingCount={pendingCount} />
    </div>
  );
}
