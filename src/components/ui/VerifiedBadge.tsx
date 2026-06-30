import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return <BadgeCheck className="inline-block ml-1 text-[#3b82f6] -translate-y-[1px]" size={14} />;
}
