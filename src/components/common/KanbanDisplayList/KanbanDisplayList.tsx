import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import KanbanDisplayCard from './KanbanDisplayCard';
import { KanbanPagination } from './KanbanPagination';
import { ColumnFiltersState, PaginationState } from '@tanstack/react-table';
import { KanbanDisplayProps } from '@/types/KanbanDisplayType';
import KanbanSkeleton from './KanbanSkeleton';
import FilterOptions from './FilterOptions';

// // Sample product data for display
// const products = [
//   { id: 1, name: "Acoustic Bloc Screens", price: 295.00, variants: 2, onHand: 16, image: "/placeholder.svg?height=100&width=100" },
//   { id: 2, name: "Aperol Spritz", price: 9.00, image: "/placeholder.svg?height=100&width=100" },
//   { id: 3, name: "Apple Pie", price: 12.00, image: "/placeholder.svg?height=100&width=100" },
//   { id: 4, name: "Bacon Burger", price: 15.50, image: "/placeholder.svg?height=100&width=100" },
//   { id: 5, name: "Bagel", price: 1.25, image: "/placeholder.svg?height=100&width=100" },
//   { id: 6, name: "Black embroidered t-shirt", price: 25.00, image: "/placeholder.svg?height=100&width=100" },
//   { id: 7, name: "Blue Denim Jeans", price: 80.00, image: "/placeholder.svg?height=100&width=100" },
//   { id: 8, name: "Blueberry Muffin", price: 1.80, image: "/placeholder.svg?height=100&width=100" },
//   { id: 9, name: "Bolt", price: 0.50, sku: "CONS_89957", image: "/placeholder.svg?height=100&width=100" },
//   { id: 10, name: "Bricks", price: 50.00, image: "/placeholder.svg?height=100&width=100" },
//   { id: 11, name: "Butter Croissant", price: 1.20, image: "/placeholder.svg?height=100&width=100" },
//   { id: 12, name: "Cabinet with Doors", price: 140.00, sku: "E-COM11", onHand: 33, image: "/placeholder.svg?height=100&width=100" },
// ];

const KanbanDisplayList = <TData,>({
  isLoading,
  paginatedData,
  pagination,
  setPagination,
  columnFilters,
  setColumnFilters,
  search,
  setSearch,
  pageMeta
}: KanbanDisplayProps<TData>) => {
  const products = paginatedData?.data || [];
  const handleSearch = (searchValue: string) => {
    setSearch?.(searchValue);

    setColumnFilters((prev) => [
      ...prev,
      {
        id: 'name',
        value: [searchValue],
      },
      {
        id: 'code',
        value: [searchValue],
      },
    ]);
    console.log('searchValue',columnFilters)
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e.currentTarget.value);
    }
  };
  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <KanbanSkeleton />
      ) : (
        <>
        {paginatedData?.data.length > 0 ? (
          <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)} 
                  onKeyDown={handleKeyDown} // Trigger search on 'Enter' key press
                />
              </div>
            </div>
            <div>
              {/* <FilterOptions/> */}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <KanbanDisplayCard product={product} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-4">
            {pageMeta && <KanbanPagination
              pagination={pagination}
              pageMeta={pageMeta}
              setPagination={setPagination}
            />}
            
          </div>
        </div>
        ):(
          <div className='h-[400px] bg-white'>
            <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-8 pr-4"
                  value={search}
                  onKeyDown={handleKeyDown} // Trigger search on 'Enter' key press
                />
              </div>
            </div>
            <div>
              {/* <FilterOptions/> */}
            </div>
          </div>
          <div>
            <div className="flex justify-center items-center mt-4">
              <p className="text-center">No Data</p>
            </div>
          </div>
          </div>
        )}
        </>
        
      )}
    </div>
  );
};

export default KanbanDisplayList;
