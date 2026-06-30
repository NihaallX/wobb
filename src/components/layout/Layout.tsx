import { useState, type ReactNode } from "react";
import { ListChecks, X } from "lucide-react";
import { Header } from "./Header";
import { ShortlistPanel } from "../shortlist/ShortlistPanel";
import useShortlistStore from "@/store/useShortlistStore";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const count = useShortlistStore((state) => state.shortlist.length);

  return (
    <div className="min-h-screen bg-[#f7f5f3] flex flex-col">
      <Header />

      <div className="flex-1 flex flex-row">
        <main className="flex-1 min-w-0 px-6 py-8 lg:px-10">
          {children}
        </main>

        {/* Desktop sidebar */}
        <div className="hidden md:block">
          <ShortlistPanel />
        </div>
      </div>

      {/* ── Mobile: floating shortlist button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label={`Open shortlist — ${count} items`}
        className="md:hidden fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-2.5 bg-[#37322f] text-white text-sm font-medium rounded-full shadow-lg hover:bg-[#37322f]/90 transition-colors"
      >
        <ListChecks className="w-4 h-4" />
        Shortlist
        {count > 0 && (
          <span className="bg-[#aa3bff] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold leading-none">
            {count}
          </span>
        )}
      </button>

      {/* ── Mobile: backdrop ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile: slide-up drawer ── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shortlist"
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#fbfaf9] rounded-t-2xl shadow-xl flex flex-col transition-transform duration-300 ${
          mobileOpen ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ maxHeight: "75vh" }}
      >
        {/* Drawer handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-[#e0dedb]" />
        </div>

        {/* Drawer header */}
        <div className="px-4 py-3 border-b border-[#e0dedb] flex items-center justify-between">
          <span className="font-semibold text-sm text-[#37322f]">Shortlist</span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close shortlist"
            className="text-[#605a57] hover:text-[#37322f] transition-colors p-1 -mr-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Reuse the panel body by rendering it inside */}
        <div className="flex-1 overflow-y-auto">
          <ShortlistPanel hideHeader />
        </div>
      </div>
    </div>
  );
}
