import { Search } from "lucide-react";

interface EmptyStateProps {
  heading: string;
  subtext: string;
}

export function EmptyState({ heading, subtext }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Search className="w-10 h-10 text-[#e0dedb] mb-4" />
      <p className="text-sm font-medium text-[#37322f]">{heading}</p>
      <p className="text-xs text-[#605a57] mt-1">{subtext}</p>
    </div>
  );
}
