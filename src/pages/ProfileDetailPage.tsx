import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { ShortlistButton } from "@/components/ui/ShortlistButton";
import type { FullUserProfile, ProfileDetailResponse } from "@/types";
import { formatFollowers } from "@/utils/formatters";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { ArrowLeft, Music2 } from "lucide-react";
import { getPlatformLabel } from "@/utils/dataHelpers";
import type { Platform } from "@/types";

const InstagramIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const YoutubeIcon = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = searchParams.get("platform") || "unknown";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
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
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-500 mb-4">Invalid profile</p>
          <Link to="/" className="text-[#aa3bff] hover:underline">Back to search</Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="flex justify-center py-20">
          <p className="text-gray-400">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-gray-900 font-bold text-xl mb-2">Profile Not Found</p>
          <p className="text-gray-500 mb-6">Could not load profile details for @{username}</p>
          <Link to="/" className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
            <ArrowLeft size={16} />
            Back to search
          </Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const getPlatformIcon = () => {
    if (platform === "instagram") return <InstagramIcon size={14} />;
    if (platform === "youtube") return <YoutubeIcon size={14} />;
    if (platform === "tiktok") return <Music2 size={14} />;
    return null;
  };

  const getPlatformColor = () => {
    if (platform === "instagram") return "bg-pink-100 text-pink-700 border-pink-200";
    if (platform === "youtube") return "bg-red-100 text-red-700 border-red-200";
    if (platform === "tiktok") return "bg-slate-100 text-slate-800 border-slate-200";
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto w-full">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to search
        </Link>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
            <img
              src={user.picture}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover ring-4 ring-gray-50"
            />
            <div className="flex-1 min-w-0 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2 truncate mb-1">
                    @{user.username}
                    <VerifiedBadge verified={user.is_verified} />
                  </h2>
                  <p className="text-lg text-gray-500">{user.fullname}</p>
                </div>
                <div className="flex gap-3 items-center self-start">
                  {platform !== "unknown" && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getPlatformColor()}`}>
                      {getPlatformIcon()}
                      {platform === "unknown" ? "Unknown" : getPlatformLabel(platform as Platform)}
                    </span>
                  )}
                  <ShortlistButton profile={user} className="w-32 justify-center" />
                </div>
              </div>

              {user.description && (
                <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-3xl">
                  {user.description}
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm font-medium mb-1">Followers</div>
              <div className="font-bold text-2xl text-gray-900">
                {formatFollowers(user.followers)}
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
              <div className="text-gray-500 text-sm font-medium mb-1">Engagement Rate</div>
              <div className="font-bold text-2xl text-[#aa3bff]">
                {user.engagement_rate !== undefined
                  ? (user.engagement_rate * 100).toFixed(2) + "%"
                  : "N/A"}
              </div>
            </div>
            {user.posts_count !== undefined && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-gray-500 text-sm font-medium mb-1">Posts</div>
                <div className="font-bold text-2xl text-gray-900">{user.posts_count.toLocaleString()}</div>
              </div>
            )}
            {user.avg_likes !== undefined && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-gray-500 text-sm font-medium mb-1">Avg Likes</div>
                <div className="font-bold text-2xl text-gray-900">
                  {formatFollowers(user.avg_likes)}
                </div>
              </div>
            )}
            {user.avg_comments !== undefined && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-gray-500 text-sm font-medium mb-1">Avg Comments</div>
                <div className="font-bold text-2xl text-gray-900">{user.avg_comments.toLocaleString()}</div>
              </div>
            )}
            {user.avg_views !== undefined && user.avg_views > 0 && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-gray-500 text-sm font-medium mb-1">Avg Views</div>
                <div className="font-bold text-2xl text-gray-900">
                  {formatFollowers(user.avg_views)}
                </div>
              </div>
            )}
            {user.engagements !== undefined && (
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="text-gray-500 text-sm font-medium mb-1">Engagements</div>
                <div className="font-bold text-2xl text-gray-900">
                  {formatFollowers(user.engagements)}
                </div>
              </div>
            )}
          </div>

          {user.url && (
            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
              <a
                href={user.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm"
              >
                View on Platform
              </a>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
