import React from 'react';
import { X } from 'lucide-react';
import useShortlistStore from '@/store/useShortlistStore';
import type { ShortlistEntry } from '@/types';
import { useNavigate } from 'react-router-dom';

interface ShortlistItemProps {
  profile: ShortlistEntry;
}

export const ShortlistItem: React.FC<ShortlistItemProps> = ({ profile }) => {
  const removeFromShortlist = useShortlistStore(state => state.removeFromShortlist);
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-3 p-2 border border-gray-100 rounded-lg hover:border-gray-300 bg-white transition-colors group">
      <img
        src={profile.picture}
        alt={profile.username}
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => navigate(`/profile/${profile.username}`)}
      />
      <div 
        className="flex-1 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/profile/${profile.username}`)}
      >
        <div className="text-sm font-bold text-gray-900 truncate group-hover:text-[#aa3bff] transition-colors">{profile.fullname}</div>
        <div className="text-xs text-gray-500 truncate">@{profile.username}</div>
      </div>
      <button
        onClick={() => removeFromShortlist(profile.user_id)}
        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
        title="Remove"
      >
        <X size={16} />
      </button>
    </div>
  );
};
