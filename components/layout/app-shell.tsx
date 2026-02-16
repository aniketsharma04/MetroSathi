"use client";

import { BottomNav } from "./bottom-nav";
import { DesktopSidebar } from "./desktop-sidebar";

interface AppShellProps {
  children: React.ReactNode;
  pendingCount?: number;
}

export function AppShell({ children, pendingCount = 0 }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <DesktopSidebar pendingCount={pendingCount} />
      <main className="pb-20 md:ml-60 md:pb-0">
        <div className="mx-auto max-w-4xl px-4 py-4 md:px-8 md:py-6">
          {children}
        </div>
      </main>
      <BottomNav pendingCount={pendingCount} />
    </div>
  );
}
