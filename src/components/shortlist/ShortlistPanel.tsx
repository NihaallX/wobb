import React from "react";
import useShortlistStore from "@/store/useShortlistStore";
import { ShortlistItem } from "./ShortlistItem";

interface ShortlistPanelProps {
  /** When true, suppresses the header (used inside the mobile drawer) */
  hideHeader?: boolean;
}

export const ShortlistPanel: React.FC<ShortlistPanelProps> = ({ hideHeader = false }) => {
  const shortlist = useShortlistStore((state) => state.shortlist);
  const clearShortlist = useShortlistStore((state) => state.clearShortlist);

  return (
    <aside
      aria-label="Shortlist panel"
      className="w-[300px] shrink-0 border-l border-[#e0dedb] bg-[#fbfaf9] h-screen sticky top-0 flex flex-col"
    >
      {/* Header — hidden inside mobile drawer since Layout provides its own */}
      {!hideHeader && (
        <div className="px-4 py-4 border-b border-[#e0dedb] flex items-center justify-between">
          <span className="font-semibold text-sm text-[#37322f]">Shortlist</span>
          <span
            aria-label={`${shortlist.length} items shortlisted`}
            className="bg-[#aa3bff]/10 text-[#aa3bff] text-xs px-2 py-0.5 rounded-full font-medium"
          >
            {shortlist.length}
          </span>
        </div>
      )}

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
        {shortlist.length === 0 ? (
          <p className="text-xs text-[#605a57] text-center py-8">
            Add influencers to start your shortlist
          </p>
        ) : (
          shortlist.map((profile) => (
            <ShortlistItem key={profile.user_id} profile={profile} />
          ))
        )}
      </div>

      {/* Footer */}
      {shortlist.length > 0 && (
        <div className="px-4 py-3 border-t border-[#e0dedb]">
          <button
            onClick={clearShortlist}
            aria-label="Clear all shortlisted profiles"
            className="w-full text-xs text-[#605a57] hover:text-red-500 transition-colors py-1"
          >
            Clear all
          </button>
        </div>
      )}
    </aside>
  );
};
