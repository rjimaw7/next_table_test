/* eslint-disable jsx-a11y/label-has-associated-control */
import { Search } from 'lucide-react';
import React from 'react';

import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';

interface Props {
  searchQuery: string;
  setSearchQuery: (value: React.SetStateAction<string>) => void;
  ordersDataLoading: boolean;
  showExactMatchesOnly: boolean;
  setShowExactMatchesOnly: (value: React.SetStateAction<boolean>) => void;
}

const SearchOrder = ({
  searchQuery,
  setSearchQuery,
  ordersDataLoading,
  showExactMatchesOnly,
  setShowExactMatchesOnly
}: Props) => {
  return (
    <div className="relative ml-auto flex flex-1 items-center gap-2 md:grow-0">
      <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        disabled={ordersDataLoading}
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          disabled={ordersDataLoading}
          checked={showExactMatchesOnly}
          onCheckedChange={(value) => setShowExactMatchesOnly(value as any)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Show Exact Matches Only
        </label>
      </div>
    </div>
  );
};

export default SearchOrder;
