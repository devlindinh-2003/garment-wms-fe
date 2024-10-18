import React, { useEffect, useState } from 'react';
import KanbanDisplayList from '../../../components/common/KanbanDisplayList/KanbanDisplayList';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TableList from './components/TableList';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebouce';
import { getAllMaterialFn } from '@/api/services/materialApi';
import { MaterialResponse, Material, MaterialDataToRender } from '@/types/MaterialTypes';
import { toast } from '@/hooks/use-toast';
import { PageMetaData } from '@/types/ImportRequestType';

type Props = {};
type DisplayState = 'grid' | 'list';
const MaterialManagement = (props: Props) => {
  const [displayState, setDisplayState] = useState<DisplayState>('grid');
  const handleDisplayChange = (state: string) => {
    setDisplayState(state as DisplayState);
  };
  const [pageMeta, setPageMeta] = useState<PageMetaData>()
  const [search, setSearch] = useState<string>('');
  const [data, setData] = useState<MaterialDataToRender>({ data: [], limit: 0, page: 0, total: 0, totalFiltered: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);
  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

  const debouncedSorting: SortingState = useDebounce(sorting, 1000);
  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 16 //default page size
  });
  useEffect(() => {
    const fetchMaterials = async () => {
      setIsLoading(true);
      try {
        const response = await getAllMaterialFn({
          sorting: debouncedSorting,
          columnFilters: debouncedColumnFilters,
          pagination
        });
        const resData = response.data.data;
       setPageMeta(response.data.pageMeta);
        const data = {
          data: resData,
          limit: pageMeta?.limit || 0,
          page: pageMeta?.page || 0,
          total: pageMeta?.total || 0,
          totalFiltered: pageMeta?.total || 0
        };
        setData(data);
        console.log('response', response);
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Failed to fetch materials',
          title: 'Error'
        });
        console.error('Failed to fetch materials:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaterials();
  }, [debouncedColumnFilters, debouncedSorting, pagination]);

  return (
    <div className="w-full  bg-white rounded-xl shadow-sm border">
      <div className="flex justify-end m-4">
        <Button onClick={() => handleDisplayChange('grid')} variant="outline" size="icon">
          <Grid size={20} />
        </Button>
        <Button onClick={() => handleDisplayChange('list')} variant="outline" size="icon">
          <List size={20} />
        </Button>
      </div>
      {displayState === 'grid' ? (
        <KanbanDisplayList
          paginatedData={data}
          isLoading={isLoading}
          pagination={pagination}
          setPagination={setPagination}
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
          search={search}
          setSearch={setSearch}
          pageMeta={pageMeta}
        />
      ) : (
        <TableList />
      )}
    </div>
  );
};

export default MaterialManagement;
