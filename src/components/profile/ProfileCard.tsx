import React from "react";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { ShortlistButton } from "../ui/ShortlistButton";
import useShortlistStore from "@/store/useShortlistStore";

export interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery?: string;
  onProfileClick?: (username: string) => void;
}

export const ProfileCard = React.memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const isShortlisted = useShortlistStore((state) => state.isShortlisted(profile.user_id));

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-xl cursor-pointer hover:shadow-md hover:border-gray-300 transition-all w-full group"
    >
      <img 
        src={profile.picture} 
        className={`w-14 h-14 rounded-full object-cover transition-all ${isShortlisted ? 'ring-2 ring-[#aa3bff] ring-offset-2' : 'ring-1 ring-gray-100'}`} 
      />
      <div className="text-left flex-1 min-w-0">
        <div className="font-bold text-gray-900 text-base truncate flex items-center gap-1">
          <span className="truncate">@{profile.username}</span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-500 truncate mb-1">{profile.fullname}</div>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
            {formatFollowers(profile.followers)} followers
          </span>
          {profile.engagement_rate !== undefined && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#aa3bff]/10 text-[#aa3bff]">
              {formatEngagementRate(profile.engagement_rate)} engagement
            </span>
          )}
        </div>
      </div>

      <div className="shrink-0">
        <ShortlistButton profile={profile} />
      </div>
    </div>
  );
});
