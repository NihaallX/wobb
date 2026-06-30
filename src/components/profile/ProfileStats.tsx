import type { FullUserProfile } from "@/types";
import { formatFollowers, formatEngagementRate } from "@/utils/formatters";

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-[#fbfaf9] border border-[#e0dedb] rounded-lg p-4">
      <div className="text-xs text-[#605a57] mb-1">{label}</div>
      <div className="text-base font-semibold text-[#37322f]">{value}</div>
    </div>
  );
}

interface ProfileStatsProps {
  user: FullUserProfile;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const stats: { label: string; value: string; show?: boolean }[] = [
    {
      label: "Followers",
      value: formatFollowers(user.followers),
    },
    {
      label: "Engagement Rate",
      value: user.engagement_rate !== undefined
        ? formatEngagementRate(user.engagement_rate)
        : "N/A",
    },
    {
      label: "Engagements",
      value: user.engagements !== undefined ? formatFollowers(user.engagements) : "",
      show: user.engagements !== undefined,
    },
    {
      label: "Posts",
      value: user.posts_count !== undefined ? user.posts_count.toLocaleString() : "",
      show: user.posts_count !== undefined,
    },
    {
      label: "Avg. Likes",
      value: user.avg_likes !== undefined ? formatFollowers(user.avg_likes) : "",
      show: user.avg_likes !== undefined,
    },
    {
      label: "Avg. Comments",
      value: user.avg_comments !== undefined ? user.avg_comments.toLocaleString() : "",
      show: user.avg_comments !== undefined,
    },
    {
      label: "Avg. Views",
      value: user.avg_views !== undefined && user.avg_views > 0
        ? formatFollowers(user.avg_views)
        : "",
      show: user.avg_views !== undefined && user.avg_views > 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {stats
        .filter((s) => s.show !== false)
        .map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} />
        ))}
    </div>
  );
}
