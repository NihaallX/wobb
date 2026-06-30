import React from 'react';
import useShortlistStore from '@/store/useShortlistStore';
import { ShortlistItem } from './ShortlistItem';

export const ShortlistPanel: React.FC = () => {
  const shortlist = useShortlistStore(state => state.shortlist);
  const clearShortlist = useShortlistStore(state => state.clearShortlist);

  return (
    <aside className="w-80 bg-white border-l border-gray-200 h-[calc(100vh-64px)] sticky top-16 flex flex-col shrink-0 max-lg:w-full max-lg:h-auto max-lg:border-l-0 max-lg:border-t max-lg:static">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 m-0">Shortlist</h2>
        <span className="bg-[#aa3bff]/10 text-[#aa3bff] text-xs font-semibold px-2 py-1 rounded-full">
          {shortlist.length}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        {shortlist.length === 0 ? (
          <div className="text-center text-gray-400 mt-10 text-sm">
            No profiles added yet
          </div>
        ) : (
          shortlist.map(profile => (
            <ShortlistItem key={profile.user_id} profile={profile} />
          ))
        )}
      </div>

      {shortlist.length > 0 && (
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={clearShortlist}
            className="w-full py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-md transition-colors"
          >
            Clear all
          </button>
        </div>
      )}
    </aside>
  );
};
