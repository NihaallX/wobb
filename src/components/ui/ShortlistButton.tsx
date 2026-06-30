import React from "react";
import { Plus, Check } from "lucide-react";
import useShortlistStore from "@/store/useShortlistStore";
import type { UserProfileSummary } from "@/types";

interface ShortlistButtonProps {
  profile: UserProfileSummary;
  className?: string;
}

export const ShortlistButton: React.FC<ShortlistButtonProps> = ({ profile, className = "" }) => {
  const isShortlisted = useShortlistStore((state) => state.isShortlisted(profile.user_id));
  const addToShortlist = useShortlistStore((state) => state.addToShortlist);
  const removeFromShortlist = useShortlistStore((state) => state.removeFromShortlist);

  const handleToggle = (e: React.MouseEvent) => {
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
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 bg-[#aa3bff] text-white text-sm font-medium rounded-md hover:bg-[#9228e3] transition-colors ${className}`}
      >
        <Check size={16} />
        Added
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 bg-white text-sm font-medium rounded-md hover:bg-gray-50 transition-colors ${className}`}
    >
      <Plus size={16} />
      Add to List
    </button>
  );
};
