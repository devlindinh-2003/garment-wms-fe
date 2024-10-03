import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { CustomColumnDef } from '@/types/CompositeTable';
import {
  ColumnDef as TanStackColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import { CSSProperties, useState } from 'react';
import { Button } from '@/components/ui/button';
import SelectionCommand from './SelectionCommand';

const DEFAULT_REACT_TABLE_COLUMN_WIDTH = 150;

interface DataTableProps<TData, TValue> {
  columns: CustomColumnDef<TData>[];
  data: TData[];
  isEdit: Boolean;
}
const DataTable = <TData, TValue>({ data, columns, isEdit }: DataTableProps<TData, TValue>) => {
  // Handle material selection for a row (generic dynamic column update)
  const handleMaterialSelect = (rowIndex: number, material: any) => {
    console.log(material);
    setEditableData((prevData) =>
      prevData.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              // Only update the columns that exist in both the row and material object
              ...Object.keys(row).reduce((acc, key) => {
                if (material[key] !== undefined) {
                  acc[key] = material[key];
                }
                return acc;
              }, {} as any) // Accumulator that dynamically adds material keys
            }
          : row
      )
    );
  };
  const [sorting, setSorting] = useState<SortingState>([]);
  const [editableData, setEditableData] = useState(data); // Store the editable data
  const table = useReactTable({
    data: editableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting
    }
  });

  // Handle input change
  const handleInputChange = (rowIndex: number, columnId: string, value: any) => {
    setEditableData((prevData) =>
      prevData.map((row, index) => (index === rowIndex ? { ...row, [columnId]: value } : row))
    );
  };
  const [openPopovers, setOpenPopovers] = useState<{ [key: string]: boolean }>({}); // Store open state for each popover
  // Toggle open state for popovers
  const togglePopover = (cellId: string) => {
    setOpenPopovers((prev) => ({
      ...prev,
      [cellId]: !prev[cellId] // Toggle the specific popover
    }));
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const styles: CSSProperties =
                    header.getSize() !== DEFAULT_REACT_TABLE_COLUMN_WIDTH
                      ? { width: `${header.getSize()}px` }
                      : {};

                  return (
                    <TableHead key={header.id} style={styles}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            );
          })}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row, rowIndex) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.columnDef.isEditable && isEdit ? (
                      cell.column.columnDef.isPopover ? (
                        <Popover
                          open={openPopovers[`${rowIndex}-${cell.id}`] || false} // Check open state for each popover
                          onOpenChange={() => togglePopover(`${rowIndex}-${cell.id}`)} // Toggle the specific popover
                        >
                          <PopoverTrigger asChild>
                            <Button variant={'outline'}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[200px] p-0" align="start">
                            <SelectionCommand
                              onSelectMaterial={(material) =>
                                handleMaterialSelect(rowIndex, material)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <input
                          type="text"
                          value={cell.getValue() as string} // Assuming the value is a string
                          onChange={(e) =>
                            handleInputChange(rowIndex, cell.column.id, e.target.value)
                          }
                          className="border rounded p-1"
                        />
                      )
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => {
            return (
              <TableRow key={footerGroup.id}>
                {footerGroup.headers.map((footer) => {
                  return (
                    <TableCell key={footer.id} colSpan={footer.colSpan}>
                      {flexRender(footer.column.columnDef.footer, footer.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableFooter>
      </Table>
    </div>
  );
};

export default DataTable;
