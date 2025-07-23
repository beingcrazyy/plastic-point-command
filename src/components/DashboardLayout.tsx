import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 lg:ml-64">
          <Header />
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}