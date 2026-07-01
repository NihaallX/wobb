import React from "react";
import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";
import { EmptyState } from "../ui/EmptyState";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export const ProfileList = React.memo(function ProfileList({
  profiles,
  platform,
}: ProfileListProps) {
  return (
    <div className="flex flex-col gap-2 max-w-3xl">
      {profiles.length === 0 && (
        <EmptyState
          heading="No influencers found"
          subtext="Try a different search or platform"
        />
      )}
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
        />
      ))}
    </div>
  );
});
