import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Camera, Music2 } from "lucide-react";

// Inline SVG for YouTube since lucide-react v1 doesn't export Youtube
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const PLATFORM_ICONS: Record<Platform, React.ReactNode> = {
  instagram: <Camera className="w-3.5 h-3.5" />,
  youtube: <YoutubeIcon className="w-3.5 h-3.5" />,
  tiktok: <Music2 className="w-3.5 h-3.5" />,
};

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  return (
    <div className="flex gap-2 mb-5 flex-wrap">
      {PLATFORMS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
            selected === p
              ? "bg-[#37322f] text-white border-[#37322f]"
              : "bg-white text-[#605a57] border-[#e0dedb] hover:bg-[#f7f5f3]"
          }`}
        >
          {PLATFORM_ICONS[p]}
          {getPlatformLabel(p)}
        </button>
      ))}
    </div>
  );
}
