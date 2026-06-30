import type { ReactNode } from "react";
import { Header } from "./Header";
import { ShortlistPanel } from "../shortlist/ShortlistPanel";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#f7f5f3] flex flex-col">
      <Header />
      <div className="flex-1 flex flex-row">
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-10">
          {children}
        </main>
        {/* Sidebar — hidden on mobile */}
        <div className="hidden md:block">
          <ShortlistPanel />
        </div>
      </div>
    </div>
  );
}
