import React from "react";
import { Link } from "react-router-dom";
import { ListChecks } from "lucide-react";
import useShortlistStore from "@/store/useShortlistStore";

export const Header: React.FC = () => {
  const count = useShortlistStore((state) => state.shortlist.length);

  return (
    <header className="bg-[#f7f5f3] border-b border-[#e0dedb] sticky top-0 z-50">
      <div className="max-w-[1160px] mx-auto px-6 py-3.5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Wobb"
            className="h-7 w-auto object-contain"
          />
          <span className="text-[#605a57] text-sm hidden sm:inline">Influencer Discovery</span>
        </Link>

        <div className="flex items-center gap-2 text-sm text-[#37322f]">
          <ListChecks className="w-4 h-4 text-[#605a57]" />
          <span className="text-[#605a57]">
            {count === 0 ? "No shortlist" : `${count} shortlisted`}
          </span>
          {count > 0 && (
            <span className="bg-[#aa3bff] text-white text-xs px-2 py-0.5 rounded-full font-medium leading-none">
              {count}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};
