import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full mb-5">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#605a57] w-4 h-4 pointer-events-none" />
      <input
        className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#e0dedb] bg-white text-sm text-[#37322f] placeholder:text-[#605a57]/60 focus:outline-none focus:ring-2 focus:ring-[#aa3bff]/30 focus:border-[#aa3bff] transition-colors"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by name or username…"
      />
    </div>
  );
}
