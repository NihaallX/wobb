import type { ReactNode } from "react";
import { Header } from "./Header";
import { ShortlistPanel } from "../shortlist/ShortlistPanel";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans text-gray-900">
      <Header />
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] mx-auto w-full">
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {title && <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>}
          {children}
        </main>
        <ShortlistPanel />
      </div>
    </div>
  );
}
