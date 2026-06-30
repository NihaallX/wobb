import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { UserProfileSummary } from "@/types";
import useShortlistStore from "@/store/useShortlistStore";

interface ShortlistItemProps {
  profile: UserProfileSummary;
}

export const ShortlistItem: React.FC<ShortlistItemProps> = ({ profile }) => {
  const removeFromShortlist = useShortlistStore(
    (state) => state.removeFromShortlist
  );
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-[#e0dedb]">
      <img
        src={profile.picture}
        alt={profile.username}
        referrerPolicy="no-referrer"
        onError={(e) => {
          const t = e.currentTarget;
          t.onerror = null;
          const initials = encodeURIComponent((profile.fullname || profile.username).slice(0, 2).toUpperCase());
          t.src = `https://ui-avatars.com/api/?name=${initials}&background=e0dedb&color=37322f&size=128&bold=true&font-size=0.4`;
        }}
        className="w-8 h-8 rounded-full object-cover shrink-0 cursor-pointer"
        onClick={() => navigate(`/profile/${profile.username}`)}
      />
      <div
        className="flex-1 min-w-0 cursor-pointer"
        onClick={() => navigate(`/profile/${profile.username}`)}
      >
        <div className="text-xs font-medium text-[#37322f] truncate">
          @{profile.username}
        </div>
        <div className="text-xs text-[#605a57] truncate">{profile.fullname}</div>
      </div>
      <button
        onClick={() => removeFromShortlist(profile.user_id)}
        className="shrink-0 text-[#605a57] hover:text-red-500 transition-colors"
        title="Remove"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
