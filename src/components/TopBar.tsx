import { useState } from "react";
import {
  Menu,
  Search,
  Command,
  Settings,
  User,
  Bell,
  Maximize2,
  Minus,
  X,
  Folder,
  Terminal,
  GitBranch,
  Play,
  Square,
  MoreVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TopBarProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
}

const TopBar = ({ onToggleSidebar, sidebarOpen }: TopBarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="h-12 bg-card border-b border-border flex items-center justify-between px-3">
      {/* Left side */}
      <div className="flex items-center gap-2">
        {/* Sidebar toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidebar}
          className="h-8 w-8 p-0"
        >
          <Menu className="w-4 h-4" />
        </Button>

        {/* App title */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
            <span className="text-xs font-bold text-white">A</span>
          </div>
          <span className="font-semibold text-sm hidden xs:inline">Axion</span>
        </div>

        {/* Quick actions - Hidden on mobile */}
        {/*<div className="hidden lg:flex items-center gap-1 ml-4">*/}
        {/*  <Button variant="ghost" size="sm" className="h-8 gap-1">*/}
        {/*    <Folder className="w-3 h-3" />*/}
        {/*    <span className="hidden xl:inline text-xs">Open</span>*/}
        {/*  </Button>*/}

        {/*  <Button variant="ghost" size="sm" className="h-8 gap-1">*/}
        {/*    <GitBranch className="w-3 h-3" />*/}
        {/*    <span className="hidden xl:inline text-xs">Git</span>*/}
        {/*  </Button>*/}

        {/*  <Button variant="ghost" size="sm" className="h-8 gap-1">*/}
        {/*    <Terminal className="w-3 h-3" />*/}
        {/*    <span className="hidden xl:inline text-xs">Terminal</span>*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </div>

      {/* Center - Command palette - Hidden on small mobile */}
      <div className="hidden sm:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <div
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 bg-input rounded-md cursor-pointer transition-all",
              searchOpen ? "ring-2 ring-ring" : "hover:bg-muted"
            )}
            onClick={() => setSearchOpen(true)}
          >
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground flex-1">
              {searchOpen ? "" : "Search files, commands..."}
            </span>
            <div className="hidden md:flex items-center gap-1">
              <kbd className="text-xs bg-muted px-1 py-0.5 rounded font-mono">Ctrl</kbd>
              <kbd className="text-xs bg-muted px-1 py-0.5 rounded font-mono">K</kbd>
            </div>
          </div>

          {searchOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50">
              <Input
                placeholder="Type to search..."
                className="border-0 bg-transparent focus-visible:ring-0"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
              <div className="p-2 text-xs text-muted-foreground border-t border-border">
                <div className="flex items-center justify-between">
                  <span>Quick actions</span>
                  <span className="hidden sm:inline">Press Enter to select</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile search button */}
      {/*<div className="sm:hidden">*/}
      {/*  <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSearchOpen(true)}>*/}
      {/*    <Search className="w-4 h-4" />*/}
      {/*  </Button>*/}
      {/*</div>*/}

      {/* Right side */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Desktop icons */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 relative"
            onClick={() => navigate("/notifications")}
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-status-error rounded-full"></span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User profile */}
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <User className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile/Tablet overflow menu */}
        <div className="lg:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/notifications")}>
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <span className="ml-auto w-2 h-2 bg-status-error rounded-full"></span>
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Settings className="w-4 h-4 mr-2" />
                  <span>Settings</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Preferences</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Themes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Extensions</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Keyboard Shortcuts</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <Folder className="w-4 h-4 mr-2" />
                  <span>File Operations</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Open Folder</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Recent Files</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Save Workspace</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Export Project</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuItem>
                <Terminal className="w-4 h-4 mr-2" />
                Terminal
              </DropdownMenuItem>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <GitBranch className="w-4 h-4 mr-2" />
                  <span>Git Actions</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <span>Commit Changes</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Push to Remote</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Pull from Remote</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <span>Branch Management</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Merge Conflicts</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
