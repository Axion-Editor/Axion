import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  X,
  Settings,
  Trash2,
  Archive,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, isNative } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  time: string;
  read: boolean;
  starred: boolean;
}

const sampleNotifications: Notification[] = [
  {
    id: "1",
    title: "Build Completed",
    message: "Your TypeScript build completed successfully with no errors.",
    type: "success",
    time: "2 min ago",
    read: false,
    starred: true,
  },
  {
    id: "2",
    title: "Git Push Failed",
    message: "Failed to push to remote repository. Check your connection.",
    type: "error",
    time: "5 min ago",
    read: false,
    starred: false,
  },
  {
    id: "3",
    title: "Extension Update",
    message: "TypeScript extension has been updated to version 5.2.1",
    type: "info",
    time: "1 hour ago",
    read: true,
    starred: false,
  },
  {
    id: "4",
    title: "Lint Warnings",
    message: "Found 3 linting warnings in your workspace. Review recommended.",
    type: "warning",
    time: "2 hours ago",
    read: true,
    starred: false,
  },
  {
    id: "5",
    title: "Auto-save Enabled",
    message: "Auto-save has been enabled for all files in this workspace.",
    type: "info",
    time: "1 day ago",
    read: true,
    starred: true,
  },
];

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] =
    useState<Notification[]>(sampleNotifications);
  const [filter, setFilter] = useState<"all" | "unread" | "starred">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const starredCount = notifications.filter((n) => n.starred).length;

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "unread") return !notification.read;
    if (filter === "starred") return notification.starred;
    return true;
  });

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleStar = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n)),
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "text-status-success";
      case "error":
        return "text-status-error";
      case "warning":
        return "text-status-warning";
      default:
        return "text-status-info";
    }
  };

  const getTypeBadge = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return "bg-status-success/10 text-status-success border-status-success/20";
      case "error":
        return "bg-status-error/10 text-status-error border-status-error/20";
      case "warning":
        return "bg-status-warning/10 text-status-warning border-status-warning/20";
      default:
        return "bg-status-info/10 text-status-info border-status-info/20";
    }
  };

  return (
    <div className="h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h1 className="text-lg font-semibold">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Mark all read</span>
              </Button>
            )}

            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex border-t border-border">
          <button
            onClick={() => setFilter("all")}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2",
              filter === "all"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2",
              filter === "unread"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter("starred")}
            className={cn(
              "flex-1 px-4 py-3 text-sm font-medium transition-colors border-b-2",
              filter === "starred"
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            Starred ({starredCount})
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="flex-1 overflow-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Bell className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">No notifications</p>
            <p className="text-sm">
              {filter === "all" && "You're all caught up!"}
              {filter === "unread" && "No unread notifications"}
              {filter === "starred" && "No starred notifications"}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  "p-4 hover:bg-muted/50 transition-colors group",
                  !notification.read && "bg-primary/5",
                )}
              >
                <div className="flex items-start gap-3">
                  {/* Notification indicator */}
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                      notification.read ? "bg-muted" : "bg-primary",
                    )}
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3
                        className={cn(
                          "font-medium text-sm",
                          !notification.read && "text-foreground font-semibold",
                        )}
                      >
                        {notification.title}
                      </h3>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <Badge
                          className={cn(
                            "text-xs px-1.5 py-0.5",
                            getTypeBadge(notification.type),
                          )}
                        >
                          {notification.type}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead(notification.id)}
                        className="h-7 px-2 text-xs"
                      >
                        <Check className="w-3 h-3 mr-1" />
                        Mark read
                      </Button>
                    )}
                  </div>

                  <div
                    className={cn(
                      "flex items-center gap-1 group-hover:opacity-100 transition-opacity",
                      isNative() ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(notification.id)}
                      className={cn(
                        "h-7 w-7 p-0",
                        notification.starred && "text-status-warning",
                      )}
                    >
                      <Star
                        className={cn(
                          "w-3 h-3",
                          notification.starred && "fill-current",
                        )}
                      />
                    </Button>

                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                      <Archive className="w-3 h-3" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteNotification(notification.id)}
                      className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
