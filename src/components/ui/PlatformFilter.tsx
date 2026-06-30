import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Music2 } from "lucide-react";

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

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  const getIcon = (platform: Platform) => {
    switch (platform) {
      case "instagram": return <InstagramIcon size={18} />;
      case "youtube": return <YoutubeIcon size={18} />;
      case "tiktok": return <Music2 size={18} />;
    }
  };

  return (
    <div className="flex gap-3 mb-6 flex-wrap justify-center sm:justify-start">
      {PLATFORMS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-200 ${
            selected === p 
              ? "bg-[#aa3bff] text-white shadow-md shadow-[#aa3bff]/20" 
              : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
          }`}
        >
          {getIcon(p)}
          {getPlatformLabel(p)}
        </button>
      ))}
    </div>
  );
}
