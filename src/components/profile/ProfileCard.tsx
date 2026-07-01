import React from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { ShortlistToggleButton } from "../ui/ShortlistButton";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import useShortlistStore from "@/store/useShortlistStore";

export interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

/** Generates a deterministic fallback avatar URL using UI Avatars */
function getFallbackAvatar(name: string): string {
  const initials = encodeURIComponent(name.slice(0, 2).toUpperCase());
  return `https://ui-avatars.com/api/?name=${initials}&background=e0dedb&color=37322f&size=128&bold=true&font-size=0.4`;
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isShortlisted = useShortlistStore((state) =>
    state.isShortlisted(profile.user_id)
  );

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full flex items-center gap-4 px-4 py-3 bg-white border border-[#e0dedb] rounded-lg hover:shadow-sm hover:border-[#605a57]/30 transition-all cursor-pointer"
    >
      {/* Avatar */}
      <img
        src={profile.picture}
        alt={`${profile.fullname} avatar`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.onerror = null;
          target.src = getFallbackAvatar(profile.fullname || profile.username);
        }}
        className={`w-11 h-11 rounded-full object-cover ring-2 shrink-0 transition-all ${
          isShortlisted ? "ring-[#aa3bff]" : "ring-transparent"
        }`}
      />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1 text-sm font-semibold text-[#37322f] truncate">
          <span className="truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-xs text-[#605a57] truncate">{profile.fullname}</div>
        <div className="flex gap-2 mt-1.5 flex-wrap">
          <span className="bg-[#f7f5f3] text-[#37322f] text-xs px-2 py-0.5 rounded border border-[#e0dedb]">
            {formatFollowers(profile.followers)} followers
          </span>
          {profile.engagement_rate !== undefined && (
            <span className="bg-[#f7f5f3] text-[#37322f] text-xs px-2 py-0.5 rounded border border-[#e0dedb]">
              {formatEngagementRate(profile.engagement_rate)} eng.
            </span>
          )}
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0">
        <ShortlistToggleButton profile={profile} />
      </div>
    </div>
  );
});
