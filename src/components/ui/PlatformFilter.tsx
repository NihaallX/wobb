import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { PlatformIcon } from "./PlatformIcon";

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
          <PlatformIcon platform={p} />
          {getPlatformLabel(p)}
        </button>
      ))}
    </div>
  );
}
