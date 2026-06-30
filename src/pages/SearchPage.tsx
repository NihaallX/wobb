import { useState, useMemo, useCallback } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/ui/PlatformFilter";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProfileList } from "@/components/profile/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(() => filterProfiles(allProfiles, searchQuery), [allProfiles, searchQuery]);

  const handleProfileClick = useCallback((username: string) => {
    console.log("Clicked profile:", username);
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto w-full">
        <PlatformFilter
          selected={platform}
          onChange={(p) => {
            setPlatform(p);
            setSearchQuery("");
          }}
        />

        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
        />

        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-xl font-bold text-gray-900 m-0">Recommended Creators</h2>
          <p className="text-sm text-gray-500 m-0">
            Showing {filtered.length} of {allProfiles.length}
          </p>
        </div>

        <ProfileList
          profiles={filtered}
          platform={platform}
          searchQuery={searchQuery}
          onProfileClick={handleProfileClick}
        />
      </div>
    </Layout>
  );
}
