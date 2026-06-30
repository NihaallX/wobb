import { useState, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { Platform } from "@/types";
import { Layout } from "@/components/layout/Layout";
import { PlatformFilter } from "@/components/ui/PlatformFilter";
import { SearchBar } from "@/components/ui/SearchBar";
import { ProfileList } from "@/components/profile/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";
  const [searchQuery, setSearchQuery] = useState("");

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handlePlatformChange = useCallback((p: Platform) => {
    setSearchParams({ platform: p }, { replace: true });
    setSearchQuery("");
  }, [setSearchParams]);

  return (
    <Layout>
      <div className="max-w-3xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[#37322f] mb-1">
            Find Influencers
          </h1>
          <p className="text-sm text-[#605a57]">
            Browse top creators across social platforms
          </p>
        </div>

        <PlatformFilter selected={platform} onChange={handlePlatformChange} />
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Results header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-[#605a57] uppercase tracking-wide">
            Results
          </span>
          <span className="text-xs text-[#605a57]">
            {filtered.length} of {allProfiles.length}
          </span>
        </div>

        <ProfileList
          profiles={filtered}
          platform={platform}
          searchQuery={searchQuery}
        />
      </div>
    </Layout>
  );
}
