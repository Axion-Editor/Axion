import { AlertCircle, Bell, CheckCircle, GitBranch, Info, Settings, Wifi, Zap } from "lucide-react";

const StatusBar = () => {
  return (
    <div
      className="h-6 bg-card border-t border-border flex items-center justify-between px-2 sm:px-3 text-xs overflow-hidden">
      {/* Left side */}
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        {/* Git branch - Always visible */}
        <div
          className="flex items-center gap-1 hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors flex-shrink-0">
          <GitBranch className="w-3 h-3"/>
          <span className="hidden xs:inline">main</span>
          <span className="text-muted-foreground hidden sm:inline">↑2 ↓1</span>
        </div>

        {/* Errors and warnings - Condensed on mobile */}
        <div className="flex items-center gap-1 sm:gap-3">
          <div className="flex items-center gap-1 hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            <AlertCircle className="w-3 h-3 text-status-error"/>
            <span>2</span>
          </div>

          <div className="flex items-center gap-1 hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            <AlertCircle className="w-3 h-3 text-status-warning"/>
            <span>5</span>
          </div>

          <div
            className="hidden sm:flex items-center gap-1 hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            <Info className="w-3 h-3 text-status-info"/>
            <span>1</span>
          </div>
        </div>

        {/* Live share indicator - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-1 text-status-success">
          <Wifi className="w-3 h-3"/>
          <span>Live Share</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 min-w-0">
        {/* Language mode - Shortened on mobile */}
        <div className="hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors hidden sm:block">
          <span className="hidden lg:inline">TypeScript React</span>
          <span className="lg:hidden">TS</span>
        </div>

        {/* Line/Column - Most important for mobile */}
        <div className="hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
          <span className="hidden sm:inline">Ln 24, Col 16</span>
          <span className="sm:hidden">24:16</span>
        </div>

        {/* Auto-save indicator - Hidden on small mobile */}
        <div className="hidden xs:flex items-center gap-1 text-status-success">
          <CheckCircle className="w-3 h-3"/>
          <span className="hidden sm:inline">Auto Save</span>
        </div>

        {/* Settings and notifications - Hidden on mobile, moved to overflow */}
        <div className="hidden md:flex items-center gap-2">
          <div className="hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            UTF-8
          </div>

          <div className="hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            LF
          </div>

          <div className="flex items-center gap-1 hover:bg-muted px-1 py-0.5 rounded cursor-pointer transition-colors">
            <Zap className="w-3 h-3 text-primary"/>
            <span>Hot Reload</span>
          </div>

          <div className="hover:bg-muted p-0.5 rounded cursor-pointer transition-colors">
            <Settings className="w-3 h-3"/>
          </div>

          <div className="hover:bg-muted p-0.5 rounded cursor-pointer transition-colors">
            <Bell className="w-3 h-3"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
