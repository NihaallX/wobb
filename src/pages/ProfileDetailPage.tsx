import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Camera, Music2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { ShortlistToggleButton } from "@/components/ui/ShortlistButton";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";
import { loadProfileByUsername, } from "@/utils/profileLoader";
import { getPlatformLabel } from "@/utils/dataHelpers";

// Inline YouTube icon (not in lucide-react v1)
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

function getPlatformIcon(platform: string) {
  if (platform === "youtube") return <YoutubeIcon className="w-3.5 h-3.5" />;
  if (platform === "tiktok") return <Music2 className="w-3.5 h-3.5" />;
  return <Camera className="w-3.5 h-3.5" />;
}

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-lg font-semibold text-[#37322f]">Invalid URL</p>
          <Link to="/" className="mt-4 px-4 py-2 bg-[#37322f] text-white text-sm rounded-full hover:bg-[#37322f]/90 transition-colors">
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <p className="text-sm text-[#605a57]">Loading…</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="flex flex-col items-center py-20 text-center">
          <p className="text-lg font-semibold text-[#37322f]">Profile not found</p>
          <p className="text-sm text-[#605a57] mt-2">
            We couldn't find data for @{username}
          </p>
          <Link
            to="/"
            className="mt-6 px-4 py-2 bg-[#37322f] text-white text-sm rounded-full hover:bg-[#37322f]/90 transition-colors"
          >
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  return (
    <Layout>
      <div className="max-w-3xl">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-[#605a57] hover:text-[#37322f] mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to search
        </Link>

        {/* Profile header card */}
        <div className="bg-white border border-[#e0dedb] rounded-lg p-6 flex gap-5 items-start mb-4">
          <img
            src={user.picture}
            alt={user.username}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const t = e.currentTarget;
              t.onerror = null;
              const initials = encodeURIComponent((user.fullname || user.username).slice(0, 2).toUpperCase());
              t.src = `https://ui-avatars.com/api/?name=${initials}&background=e0dedb&color=37322f&size=256&bold=true&font-size=0.4`;
            }}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-[#e0dedb] shrink-0"
          />

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <h1 className="text-xl font-semibold text-[#37322f] flex items-center gap-1">
                  @{user.username}
                  <VerifiedBadge verified={user.is_verified} />
                </h1>
                <p className="text-sm text-[#605a57] mt-0.5">{user.fullname}</p>

                {/* Platform chip */}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-[#f7f5f3] border border-[#e0dedb] text-[#605a57] mt-2">
                  {getPlatformIcon(platform)}
                  {getPlatformLabel(platform as Platform)}
                </span>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                <ShortlistToggleButton profile={user} />
                {user.url && (
                  <a
                    href={user.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-[#aa3bff] hover:underline"
                  >
                    View on platform →
                  </a>
                )}
              </div>
            </div>

            {user.description && (
              <p className="text-sm text-[#605a57] mt-3 leading-relaxed">
                {user.description}
              </p>
            )}
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
            <div className="text-xs text-[#605a57] mb-1">Followers</div>
            <div className="text-base font-semibold text-[#37322f]">
              {formatFollowers(user.followers)}
            </div>
          </div>

          <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
            <div className="text-xs text-[#605a57] mb-1">Engagement Rate</div>
            <div className="text-base font-semibold text-[#37322f]">
              {user.engagement_rate !== undefined
                ? formatEngagementRate(user.engagement_rate)
                : "N/A"}
            </div>
          </div>

          {user.engagements !== undefined && (
            <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
              <div className="text-xs text-[#605a57] mb-1">Engagements</div>
              <div className="text-base font-semibold text-[#37322f]">
                {formatFollowers(user.engagements)}
              </div>
            </div>
          )}

          {user.posts_count !== undefined && (
            <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
              <div className="text-xs text-[#605a57] mb-1">Posts</div>
              <div className="text-base font-semibold text-[#37322f]">
                {user.posts_count.toLocaleString()}
              </div>
            </div>
          )}

          {user.avg_likes !== undefined && (
            <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
              <div className="text-xs text-[#605a57] mb-1">Avg. Likes</div>
              <div className="text-base font-semibold text-[#37322f]">
                {formatFollowers(user.avg_likes)}
              </div>
            </div>
          )}

          {user.avg_comments !== undefined && (
            <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
              <div className="text-xs text-[#605a57] mb-1">Avg. Comments</div>
              <div className="text-base font-semibold text-[#37322f]">
                {user.avg_comments.toLocaleString()}
              </div>
            </div>
          )}

          {user.avg_views !== undefined && user.avg_views > 0 && (
            <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
              <div className="text-xs text-[#605a57] mb-1">Avg. Views</div>
              <div className="text-base font-semibold text-[#37322f]">
                {formatFollowers(user.avg_views)}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
