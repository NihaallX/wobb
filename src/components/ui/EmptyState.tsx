import React from 'react';
import { Search } from 'lucide-react';

interface EmptyStateProps {
  heading: string;
  subtext: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ heading, subtext }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-gray-100 p-4 rounded-full mb-4">
        <Search size={32} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1">{heading}</h3>
      <p className="text-sm text-gray-500 max-w-[250px] mx-auto">{subtext}</p>
    </div>
  );
};
