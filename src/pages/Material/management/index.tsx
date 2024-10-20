import React, { useEffect, useState } from 'react';
import KanbanDisplayList from '../../../components/common/KanbanDisplayList/KanbanDisplayList';
import { Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useDebounce } from '@/hooks/useDebouce';
import { getAllMaterialFn, materialTypeApi } from '@/api/services/materialApi';
import { MaterialType, Material, MaterialDataToRender } from '@/types/MaterialTypes';
import { toast } from '@/hooks/use-toast';
import { PageMetaData } from '@/types/ImportRequestType';
import CompositeTableWithGrid from './components/CompositeTableWithGrid';
import { useLocation, useNavigate } from 'react-router-dom';
import { CustomColumnDef } from '@/types/CompositeTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/DropdownMenu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useGetMaterial } from '@/hooks/useGetMaterial';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import empty from '@/assets/images/null_placeholder.jpg';

type Props = {};
interface filterType {
  label: string;
  value: string;
}
const MaterialManagement = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [pageMeta, setPageMeta] = useState<PageMetaData>();
  const [data, setData] = useState<MaterialDataToRender>();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const [materialTypes, setMaterialTypes] = useState<filterType[]>([]); // Correct initialization

  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);
  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

  const debouncedSorting: SortingState = useDebounce(sorting, 1000);
  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 10 //default page size
  });

  const debouncedPagination: PaginationState = useDebounce(pagination, 1000);
  const fetchMaterialTypes = async () => {
    try {
      const materialTypeResponse = await axios(materialTypeApi.getAll());
      const materialTypes = materialTypeResponse.data.data.map((item: MaterialType) => ({
        label: item.name, // This will be used as the label (e.g., "Farbic", "Button")
        value: item.name // This will be used as the value (e.g., the id of the material type)
      }));
      setMaterialTypes(materialTypes);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Failed to fetch material types',
        title: 'Error'
      });
      console.error('Failed to fetch material types:', error);
    }
  };
  // const fetchMaterials = async () => {
  //   setIsLoading(true);
  //   try {
  //     const filters = debouncedColumnFilters.map((filter) => {
  //       // Replace dots with underscores only if there are any dots in the id
  //       const fieldKey = filter.id.includes('_') ? filter.id.replace('_', '.') : filter.id;

  //       return {
  //         id: fieldKey,
  //         value: filter.value
  //       };
  //     });
  //     const sorts = debouncedSorting.map((sort) => {
  //       // Replace dots with underscores only if there are any dots in the id
  //       const fieldKey = sort.id.includes('_') ? sort.id.replace('_', '.') : sort.id;

  //       return {
  //         id: fieldKey,
  //         desc: sort.desc
  //       };
  //     });
  //     const response = await getAllMaterialFn({
  //       sorting: sorts,
  //       columnFilters: filters,
  //       pagination: debouncedPagination
  //     });
  //     if (response.statusCode === 200) {
  //       const resData = response.data.data;
  //       setPageMeta(response.data.pageMeta);
  //       const dataWithPage = resData &&
  //         pageMeta && {
  //           data: resData,
  //           limit: pageMeta?.limit || 0,
  //           page: pageMeta?.page || 0,
  //           total: pageMeta?.total || 0,
  //           totalFiltered: pageMeta?.total || 0
  //         };
  //       setData(dataWithPage);
  //     }

  //     console.log(data);
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'Failed to fetch materials',
  //       title: 'Error'
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const fetchMaterialandType = async()=>{
  //   setIsLoading(true);
  //   try {
  //     const filters = debouncedColumnFilters.map(filter => {
  //       // Replace dots with underscores only if there are any dots in the id
  //       const fieldKey = filter.id.includes('_') ? filter.id.replace('_', '.') : filter.id;

  //       return {
  //           id: fieldKey,
  //           value: filter.value,
  //       };
  //   });
  //   const sorts = debouncedSorting.map(sort => {
  //     // Replace dots with underscores only if there are any dots in the id
  //     const fieldKey = sort.id.includes('_') ? sort.id.replace('_', '.') : sort.id;

  //     return {
  //         id: fieldKey,
  //         desc: sort.desc,
  //     };
  // });
  //     const [materialResponse, materialTypeResponse] =await Promise.all([
  //       getAllMaterialFn({
  //         sorting: sorts,
  //         columnFilters: filters,
  //         pagination: pagination
  //       })
  //       ,
  //       axios(materialTypeApi.getAll())
  //     ]);

  //     const resData = materialResponse.data.data;
  //      setPageMeta(materialResponse.data.pageMeta);
  //      console.log(pageMeta)
  //       const dataWithPage = {
  //         data: resData,
  //         limit: pageMeta?.limit || 0,
  //         page: pageMeta?.page || 0,
  //         total: pageMeta?.total || 0,
  //         totalFiltered: pageMeta?.total || 0
  //       };
  //       setData(dataWithPage);
  //       console.log(data)
  //       const materialTypes = materialTypeResponse.data.data.map((item: MaterialType) => ({
  //         label: item.name, // This will be used as the label (e.g., "Farbic", "Button")
  //         value: item.name    // This will be used as the value (e.g., the id of the material type)
  //       }));
  //       setMaterialTypes(materialTypes);
  //   } catch (error) {
  //     toast({
  //       variant: 'destructive',
  //       description: 'Something went wrong',
  //       title: 'Error'
  //     })
  //   }finally {
  //     setIsLoading(false);
  //   }

  // }
  // useEffect(() => {
  //   fetchMaterials();
  // }, [debouncedColumnFilters, debouncedSorting, debouncedPagination]);

  useEffect(() => {
    fetchMaterialTypes();
  }, []);

  const { materialList, pageMeta, isLoading, isFetching } = useGetMaterial({
    sorting: debouncedSorting,
    columnFilters: debouncedColumnFilters,
    pagination
  })

  const dataWithPage = materialList && pageMeta && {
    data: materialList,
    limit: pageMeta?.limit || 0,
    page: pageMeta?.page || 0,
    total: pageMeta?.total || 0,
    totalFiltered: pageMeta?.total || 0
  }

  const handleViewClick = (requestId: string) => {
    const basePath = location.pathname.split('/material')[0]; // Get base path (either manager or purchase-staff)

    // Navigate to the new route
    navigate(`${basePath}/material/${requestId}`);
  };
  const materialColumn: CustomColumnDef<Material>[] = [
    {
      header: 'Material code',
      accessorKey: 'code',
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <div>
            <div>{row.original.code}</div>
          </div>
        );
      }
    },
    {
      header: 'Material name',
      accessorKey: 'name',
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <div>
            <div>{row.original.name}</div>
          </div>
        );
      }
    },
    {
      header: 'Material type',
      accessorKey: 'materialType.name',
      enableColumnFilter: true,
      filterOptions: materialTypes.map((type) => ({
        label: type.label, // Correctly access the label
        value: type.value // Correctly access the value
      })),
      cell: ({ row }) => <div>{row.original.materialType.name}</div>
    },
    {
      header: 'Quantity',
      accessorKey: 'onHand',
      enableColumnFilter: false,
      enableSorting: false,

      cell: ({ row }) => {
        return (
          <div className='flex'>
            <div className=''>{row.original.onHand}</div>
          </div>
        );
      }
    },
    {
      header: 'Variants Quantity',
      accessorKey: 'numberOfMaterialVariant',
      enableColumnFilter: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className='flex'>
            <div className=''>{row.original.numberOfMaterialVariant}</div>
          </div>
        );
      }
    },
    {
      header: 'Image',
      accessorKey: 'image',
      enableColumnFilter: false,
      cell: ({ row }) => {
        return (
          <div className='w-10 h-10'>
            {row.original.image ? (
                <AspectRatio ratio={16 / 9}>
                  <img src={row.original.image}  className="object-cover rounded" />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={16 / 9}>
                  <img src={empty} className="object-cover rounded" />
                </AspectRatio>
              )}
          </div>
        );
      }
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const request = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleViewClick(request.id)}>View</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];
  return (
    <div className="w-full  bg-white rounded-xl shadow-sm border">
      <CompositeTableWithGrid
        isTableDataLoading={isLoading}
        paginatedTableData={dataWithPage}
        columns={materialColumn}
        pagination={pagination}
        sorting={sorting}
        setSorting={setSorting}
        setPagination={setPagination}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
};

export default MaterialManagement;
