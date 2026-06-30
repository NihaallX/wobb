import React from "react";
import { Plus, Check } from "lucide-react";
import useShortlistStore from "@/store/useShortlistStore";
import type { UserProfileSummary } from "@/types";

/**
 * Isolated sub-component with a granular Zustand selector so only this
 * button re-renders when the shortlist changes — not the entire ProfileCard.
 */
interface ShortlistToggleButtonProps {
  profile: UserProfileSummary;
}

export const ShortlistToggleButton = React.memo(
  function ShortlistToggleButton({ profile }: ShortlistToggleButtonProps) {
    const isShortlisted = useShortlistStore(
      (state) => state.isShortlisted(profile.user_id)
    );
    const addToShortlist = useShortlistStore((state) => state.addToShortlist);
    const removeFromShortlist = useShortlistStore(
      (state) => state.removeFromShortlist
    );

    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isShortlisted) {
        removeFromShortlist(profile.user_id);
      } else {
        addToShortlist(profile);
      }
    };

    if (isShortlisted) {
      return (
        <button
          onClick={handleClick}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full bg-[#aa3bff] text-white border border-transparent transition-colors hover:bg-[#9228e3]"
        >
          <Check className="w-3 h-3" />
          Added
        </button>
      );
    }

    return (
      <button
        onClick={handleClick}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-full border border-[#e0dedb] bg-white text-[#37322f] hover:border-[#37322f] transition-colors"
      >
        <Plus className="w-3 h-3" />
        Add to List
      </button>
    );
  }
);
