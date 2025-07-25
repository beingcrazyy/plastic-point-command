import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isMobileOpen={isMobileMenuOpen} 
          setIsMobileOpen={setIsMobileMenuOpen} 
        />
        {/* Main content area with exactly 32px spacing from sidebar */}
        <div className="flex-1 flex flex-col min-w-0 lg:ml-8 overflow-auto">
          <Header onMobileMenuToggle={() => setIsMobileMenuOpen(true)} />
          <main className="flex-1 p-8 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}