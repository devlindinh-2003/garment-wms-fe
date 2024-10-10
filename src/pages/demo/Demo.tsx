import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState
} from '@tanstack/react-table';
import { useState } from 'react';
import { useDebounce } from '@/hooks/useDebouce';
import TanStackBasicTable from '@/components/common/CompositeTable';
import { useGetUsers } from '@/hooks/useGetUsers';
import { User } from '@/types/DemoUser';
import { Checkbox } from '@/components/ui/Checkbox';
import { Badge } from '@/components/ui/Badge';
import { CustomColumnDef } from '@/types/CompositeTable';
import Introduction from '../ImportRequests/management/components/Introduction';

function Demo() {
  // sorting state of the table
  const [sorting, setSorting] = useState<SortingState>([]);

  // column filters state of the table
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const debouncedColumnFilters: ColumnFiltersState = useDebounce(columnFilters, 1000);

  // pagination state of the table
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0, //initial page index
    pageSize: 20 //default page size
  });

  const {
    allUsersData, //allUsersDataStatus,
    isAllUsersDataLoading
  } = useGetUsers({
    sorting,
    columnFilters: debouncedColumnFilters,
    pagination
  });

  const filterOptions = {
    country: ['USA', 'Canada', 'UK', 'Australia'],
    city: ['New York', 'Los Angeles', 'Toronto', 'London'],
    favorite_color: ['Red', 'Blue', 'Green', 'Yellow'],
    gender: ['Male', 'Female', 'Other']
    // Add more filter options for other columns
  };
  const userColumns: CustomColumnDef<User>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },

    {
      header: 'ID',
      accessorKey: 'user_id',
      enableColumnFilter: false
    },
    {
      header: 'Username',
      accessorKey: 'username',
      enableColumnFilter: false
    },
    {
      header: 'Email',
      accessorKey: 'email',
      enableColumnFilter: false
    },
    {
      header: 'First Name',
      accessorKey: 'first_name',
      enableColumnFilter: false
    },
    {
      header: 'Last Name',
      accessorKey: 'last_name',
      enableColumnFilter: false
    },
    {
      header: 'Gender',
      accessorKey: 'gender',
      cell: ({ row }) => <Badge variant={'default'}> {row.original.gender}</Badge>,
      filterOptions: [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
        { label: 'Complicated', value: 'Complicated' }
      ]
    },
    {
      header: 'Birthdate',
      accessorKey: 'birthdate',
      enableColumnFilter: false
    },
    {
      header: 'Country',
      accessorKey: 'country'
    },
    {
      header: 'City',
      accessorKey: 'city',
    },
    {
      header: 'Fav Color',
      accessorKey: 'favorite_color',
      filterOptions: [
        { label: 'green', value: 'green' },
        { label: 'blue', value: 'blue' },
        { label: 'red', value: 'red' }
      ]
    }
  ];

  return (
    <div>
      <div>
        <Introduction/>
      </div>
      <TanStackBasicTable
        isTableDataLoading={isAllUsersDataLoading}
        paginatedTableData={allUsersData}
        columns={userColumns}
        pagination={pagination}
        setPagination={setPagination}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </div>
  );
}
export default Demo;
