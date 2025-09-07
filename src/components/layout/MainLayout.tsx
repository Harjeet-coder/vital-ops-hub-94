import { ReactNode, useState } from "react";
import { AppSidebar } from "./AppSidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen w-full bg-background">
      <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main
        className={`min-h-screen overflow-auto transition-all duration-500 ${
          isCollapsed ? "pl-20" : "pl-72"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
