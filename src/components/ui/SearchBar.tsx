import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full mb-8">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} className="text-gray-400" />
      </div>
      <input
        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-[#aa3bff] focus:border-transparent transition-shadow text-gray-900 placeholder-gray-400"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search influencers by name or username..."
      />
    </div>
  );
}
