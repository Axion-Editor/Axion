import { useState } from "react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={"h-screen bg-background text-foreground flex flex-col overflow-hidden"}>

    </div>
  );
}

export default Index;
