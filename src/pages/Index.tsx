import CodeEditor from "@/components/CodeEditor";
import FileExplorer from "@/components/FileExplorer";
import StatusBar from "@/components/StatusBar";
import TopBar from "@/components/TopBar";
import { cn } from "@/lib/utils";
import { useState } from "react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className={
        "flex flex-col h-screen select-none bg-background text-foreground overflow-hidden"
      }
    >
      {/* Top Bar */}
      {/* This line has issue with CodeEditor */}
      {/* <TopBar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} /> */}

      {/* Main Content */}
      <div className="h-full overflow-hidden">
        {/* Desktop Sidebar */}
        <div
          className={cn(
            "hidden md:block transition-all duration-300 ease-in-out border-r border-border",
            sidebarOpen ? "w-64" : "w-0 overflow-hidden",
          )}
        >
          <FileExplorer />
        </div>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border"
              onClick={(e) => e.stopPropagation()}
            >
              <FileExplorer />
            </div>
          </div>
        )}

        {/* Main Editor Area */}
        <CodeEditor />
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};

export default Index;
