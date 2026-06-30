import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "../ui/EmptyState";
import React from "react";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
  searchQuery: string;
  onProfileClick: (username: string) => void;
}

export const ProfileList = React.memo(function ProfileList({
  profiles,
  platform,
  searchQuery,
  onProfileClick,
}: ProfileListProps) {
  return (
    <div className="flex flex-col gap-3 max-w-3xl mx-auto w-full">
      {profiles.length === 0 && (
        <EmptyState 
          heading="No influencers found" 
          subtext="Try adjusting your search or switching platforms to find more creators." 
        />
      )}
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={onProfileClick}
        />
      ))}
    </div>
  );
});
