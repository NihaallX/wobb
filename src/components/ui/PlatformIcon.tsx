
import { Camera, Music2 } from "lucide-react";
import type { Platform } from "@/types";

// Inline SVG for YouTube since lucide-react v1 doesn't export Youtube
export const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.95C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

export interface PlatformIconProps {
  platform: Platform | string;
  className?: string;
}

export function PlatformIcon({ platform, className = "w-3.5 h-3.5" }: PlatformIconProps) {
  if (platform === "youtube") return <YoutubeIcon className={className} />;
  if (platform === "tiktok") return <Music2 className={className} />;
  return <Camera className={className} />;
}
