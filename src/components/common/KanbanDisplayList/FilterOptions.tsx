import React, { Dispatch, SetStateAction } from 'react';
import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ColumnFiltersState } from '@tanstack/react-table';

const initialStatuses = [
  'Arrived',
  'Rejected',
  'Approved',
  'Inspecting',
  'Inspected',
  'Importing',
  'Imported',
  'Canceled'
];
type FilterOptionsProps = {
    columnFilters: ColumnFiltersState;
    setColumnFilters: Dispatch<SetStateAction<ColumnFiltersState>>;
};

const FilterOptions: React.FC<FilterOptionsProps> = ({
    columnFilters,
    setColumnFilters
 }) => {
  const [statuses, setStatuses] = useState(initialStatuses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const filteredStatuses = statuses.filter((status) =>
    status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusToggle = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };

  const handleAddStatus = () => {
    const newStatus = prompt('Enter new status:');
    if (newStatus && !statuses.includes(newStatus)) {
      setStatuses((prev) => [...prev, newStatus]);
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Status</h2>
        <div className="relative">
          <Search
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-8 pr-4 py-2 w-full text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-64">
        <div className="px-4 pb-4">
          {filteredStatuses.map((status) => (
            <div key={status} className="flex items-center space-x-2 py-1">
              <Checkbox
                id={status}
                checked={selectedStatuses.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              />
              <label htmlFor={status} className="text-sm text-gray-700 cursor-pointer">
                {status}
              </label>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-600 hover:text-gray-900"
          onClick={handleAddStatus}>
          <Plus className="mr-2 h-4 w-4" />
          Status
        </Button>
      </div>
    </div>
  );
};

export default FilterOptions;
