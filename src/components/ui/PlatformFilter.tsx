import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { Instagram, Youtube, Music2 } from "lucide-react";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformFilter({ selected, onChange }: PlatformFilterProps) {
  const getIcon = (platform: Platform) => {
    switch (platform) {
      case "instagram": return <Instagram size={18} />;
      case "youtube": return <Youtube size={18} />;
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
