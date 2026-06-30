import React from 'react';
import { ListChecks } from 'lucide-react';
import useShortlistStore from '@/store/useShortlistStore';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  const shortlistCount = useShortlistStore(state => state.shortlist.length);

  return (
    <header className="sticky top-0 z-50 bg-[#08060d] text-white h-16 flex items-center justify-between px-6 shadow-md">
      <Link to="/" className="flex items-baseline gap-2 no-underline">
        <span className="text-2xl font-bold tracking-tight text-white">Wobb</span>
        <span className="text-sm text-gray-400 hidden sm:inline">Influencer Discovery</span>
      </Link>
      
      <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm border border-white/10">
        <ListChecks size={16} className="text-[#aa3bff]" />
        <span className="text-sm font-medium">{shortlistCount} selected</span>
      </div>
    </header>
  );
};
