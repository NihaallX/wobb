import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "../ui/VerifiedBadge";
import { formatFollowers } from "@/utils/formatters";
import { ShortlistButton } from "../ui/ShortlistButton";

export interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  searchQuery?: string;
  onProfileClick?: (username: string) => void;
}

export function ProfileCard({
  profile,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-full"
    >
      <img src={profile.picture} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>

      <ShortlistButton profile={profile} />
    </div>
  );
}
