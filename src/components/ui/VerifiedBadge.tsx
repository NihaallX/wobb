import { BadgeCheck } from "lucide-react";

interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <BadgeCheck className="inline-block w-3.5 h-3.5 text-blue-500 ml-1 align-text-bottom shrink-0" />
  );
}
