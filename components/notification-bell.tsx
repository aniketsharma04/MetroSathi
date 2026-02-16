"use client";

import { useState, useEffect, useRef } from "react";
import { Bell, MapPin, ArrowRight, MessageCircle, X, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ActivityItem {
  id: string;
  start_station: string;
  end_station: string;
  travel_date: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    profile_pic_url: string | null;
  };
}

interface MessageItem {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
  user: {
    id: string;
    name: string;
    profile_pic_url: string | null;
  };
}

interface JoinRequestItem {
  id: string;
  trip_id: string;
  requester_id: string;
  status: string;
  created_at: string;
  requester: {
    id: string;
    name: string;
    profile_pic_url: string | null;
  };
  trip: {
    start_station: string;
    end_station: string;
  };
}

type NotificationItem =
  | { type: "trip"; data: ActivityItem }
  | { type: "message"; data: MessageItem }
  | { type: "join_request"; data: JoinRequestItem };

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === tomorrow.toDateString()) return "Tomorrow";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function timeAgo(timestamp: string): string {
  const now = new Date();
  const then = new Date(timestamp);
  const diffMs = now.getTime() - then.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const [seen, setSeen] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => (res.ok ? res.json() : { items: [], messages: [], joinRequests: [] }))
      .then((data) => {
        const tripNotifs: NotificationItem[] = (data.items ?? []).map(
          (item: ActivityItem) => ({ type: "trip" as const, data: item })
        );
        const msgNotifs: NotificationItem[] = (data.messages ?? []).map(
          (item: MessageItem) => ({ type: "message" as const, data: item })
        );
        const jrNotifs: NotificationItem[] = (data.joinRequests ?? []).map(
          (item: JoinRequestItem) => ({ type: "join_request" as const, data: item })
        );
        // Merge and sort by created_at descending
        const all = [...tripNotifs, ...msgNotifs, ...jrNotifs].sort(
          (a, b) =>
            new Date(b.data.created_at).getTime() -
            new Date(a.data.created_at).getTime()
        );
        setNotifications(all);
      })
      .catch(() => setNotifications([]));
  }, []);

  // Poll for new notifications every 30s
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/activity")
        .then((res) => (res.ok ? res.json() : { items: [], messages: [], joinRequests: [] }))
        .then((data) => {
          const tripNotifs: NotificationItem[] = (data.items ?? []).map(
            (item: ActivityItem) => ({ type: "trip" as const, data: item })
          );
          const msgNotifs: NotificationItem[] = (data.messages ?? []).map(
            (item: MessageItem) => ({ type: "message" as const, data: item })
          );
          const jrNotifs: NotificationItem[] = (data.joinRequests ?? []).map(
            (item: JoinRequestItem) => ({ type: "join_request" as const, data: item })
          );
          const all = [...tripNotifs, ...msgNotifs, ...jrNotifs].sort(
            (a, b) =>
              new Date(b.data.created_at).getTime() -
              new Date(a.data.created_at).getTime()
          );
          setNotifications(all);
        })
        .catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const unreadCount = Math.max(0, notifications.length - seen);

  const handleOpen = () => {
    setOpen(!open);
    if (!open) {
      setSeen(notifications.length);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={handleOpen}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-[#666666] transition-colors hover:bg-[#F1F3F5] hover:text-[#1A1A1A]"
        aria-label="Notifications"
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#EF4444] px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-11 z-[70] w-80 rounded-xl border border-[#E0E0E0] bg-white shadow-lg">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="text-sm font-semibold text-[#1A1A1A]">
              Notifications
            </h3>
            <button
              onClick={() => setOpen(false)}
              className="text-[#999999] hover:text-[#666666]"
            >
              <X size={16} />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="py-8 text-center text-sm text-[#999999]">
                No recent activity
              </div>
            ) : (
              notifications.map((notif) => {
                if (notif.type === "message") {
                  const msg = notif.data;
                  return (
                    <Link
                      key={`msg-${msg.id}`}
                      href={`/connections?chat=${msg.user.id}`}
                      onClick={() => setOpen(false)}
                      className="block border-b border-[#F1F3F5] px-4 py-3 transition-colors hover:bg-[#F8F9FA] last:border-0"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#E0E0E0]">
                          {msg.user.profile_pic_url ? (
                            <img
                              src={msg.user.profile_pic_url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#0066CC] text-[10px] font-bold text-white">
                              {msg.user.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[#1A1A1A]">
                            <span className="font-semibold">
                              {msg.user.name}
                            </span>{" "}
                            messaged you
                          </p>
                          <p className="mt-0.5 truncate text-[11px] text-[#666666]">
                            {msg.content}
                          </p>
                          <span className="mt-0.5 text-[10px] text-[#999999]">
                            {timeAgo(msg.created_at)}
                          </span>
                        </div>
                        <MessageCircle
                          size={14}
                          className="mt-1 shrink-0 text-[#0066CC]"
                        />
                      </div>
                    </Link>
                  );
                }

                if (notif.type === "join_request") {
                  const jr = notif.data as JoinRequestItem;
                  return (
                    <Link
                      key={`jr-${jr.id}`}
                      href="/trips"
                      onClick={() => setOpen(false)}
                      className="block border-b border-[#F1F3F5] px-4 py-3 transition-colors hover:bg-[#F8F9FA] last:border-0"
                    >
                      <div className="flex items-start gap-2.5">
                        <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#E0E0E0]">
                          {jr.requester.profile_pic_url ? (
                            <img
                              src={jr.requester.profile_pic_url}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-[#0066CC] text-[10px] font-bold text-white">
                              {jr.requester.name?.[0]?.toUpperCase() ?? "?"}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs text-[#1A1A1A]">
                            <span className="font-semibold">
                              {jr.requester.name}
                            </span>{" "}
                            wants to join your trip
                          </p>
                          <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#666666]">
                            <MapPin
                              size={10}
                              className="shrink-0 text-[#0066CC]"
                            />
                            <span className="truncate">
                              {jr.trip.start_station}
                            </span>
                            <ArrowRight
                              size={8}
                              className="shrink-0 text-[#999999]"
                            />
                            <span className="truncate">
                              {jr.trip.end_station}
                            </span>
                          </div>
                          <span className="mt-0.5 text-[10px] text-[#999999]">
                            {timeAgo(jr.created_at)}
                          </span>
                        </div>
                        <Train
                          size={14}
                          className="mt-1 shrink-0 text-[#0066CC]"
                        />
                      </div>
                    </Link>
                  );
                }

                // Trip notification
                const item = notif.data as ActivityItem;
                return (
                  <div
                    key={`trip-${item.id}`}
                    className="border-b border-[#F1F3F5] px-4 py-3 last:border-0"
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 h-7 w-7 shrink-0 overflow-hidden rounded-full bg-[#E0E0E0]">
                        {item.user.profile_pic_url ? (
                          <img
                            src={item.user.profile_pic_url}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-[#0066CC] text-[10px] font-bold text-white">
                            {item.user.name?.[0]?.toUpperCase() ?? "?"}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-[#1A1A1A]">
                          <span className="font-semibold">
                            {item.user.name}
                          </span>{" "}
                          added a trip
                        </p>
                        <div className="mt-0.5 flex items-center gap-1 text-[11px] text-[#666666]">
                          <MapPin
                            size={10}
                            className="shrink-0 text-[#0066CC]"
                          />
                          <span className="truncate">
                            {item.start_station}
                          </span>
                          <ArrowRight
                            size={8}
                            className="shrink-0 text-[#999999]"
                          />
                          <span className="truncate">{item.end_station}</span>
                        </div>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-[10px] text-[#999999]">
                            {formatDate(item.travel_date)} &middot;{" "}
                            {timeAgo(item.created_at)}
                          </span>
                          <Link
                            href={`/connections?chat=${item.user.id}`}
                            onClick={() => setOpen(false)}
                          >
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 gap-1 px-2 text-[10px] text-[#0066CC] hover:bg-[#E6F2FF]"
                            >
                              <MessageCircle size={10} />
                              Message
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
