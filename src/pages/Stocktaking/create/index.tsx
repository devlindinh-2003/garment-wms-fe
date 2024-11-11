import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Textarea } from "@/components/ui/textarea"
import KanbanDisplayList from './components/KanbanDisplayList/KanbanDisplayList'
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import { useDebounce } from '@/hooks/useDebouce'

interface Product {
  id: string;
  name: string;
  image: string;
  branchStock: number;
  actualStock: number;
}

const initialProducts: Product[] = [
  {
    id: "1",
    name: "KỆ SÁCH HÌNH CÂY 5 TẦNG GỖ MDF ĐẸ",
    image: "/placeholder.svg?height=50&width=50",
    branchStock: 150,
    actualStock: 150
  },
  {
    id: "2",
    name: "Tủ Đầu Giường 3 Ngăn Tủ Phong Cách Hiện Đại Bằng Gỗ MDF- GỖ LÁP",
    image: "/placeholder.svg?height=50&width=50",
    branchStock: 11,
    actualStock: 15
  }
]

export default function CreateInventoryReport() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [notes, setNotes] = useState("")

  const totalActualStock = products.reduce((sum, product) => sum + product.actualStock, 0)
  const totalBranchStock = products.reduce((sum, product) => sum + product.branchStock, 0)
  const totalDifference = totalActualStock - totalBranchStock

  const handleStockChange = (id: string, value: number) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, actualStock: value } : product
    ))
  }
  
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

  return (
    <div className="container mx-auto p-4 bg-white border shadow-sm rounded-xl">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Create Inventory Report</h1>
        {/* <div>
          <Button variant="default" className="mr-2">Tìm kiếm</Button>
          <Button variant="outline" className="mr-2">Sửa phiếu kiểm hàng</Button>
          <Button variant="destructive">Xóa phiếu kiểm hàng</Button>
        </div> */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent>
            {products.map(product => (
              <div key={product.id} className="flex items-center mb-4 border-b pb-4">
                <img src={product.image} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{product.name}</h3>
                  <p>Tồn chi nhánh: {product.branchStock}</p>
                  <div className="flex items-center mt-2">
                    <Input
                      type="number"
                      value={product.actualStock}
                      onChange={(e) => handleStockChange(product.id, parseInt(e.target.value))}
                      className="w-24 mr-2"
                    />
                    <span>Chênh lệch: {product.actualStock - product.branchStock}</span>
                  </div>
                </div>
              </div>
            ))}
            <Textarea
              placeholder="Ghi chú"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-4"
            />
            <Button className="mt-4 w-full">Cân bằng kho</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Thông tin phiếu kiểm</CardTitle>
          </CardHeader>
          <CardContent>
            {/* <KanbanDisplayList isLoading={false} paginatedData={{ data: products }} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}