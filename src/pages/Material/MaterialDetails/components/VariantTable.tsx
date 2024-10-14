import React from 'react'
import { Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
type Props = {}

const products = [
    { id: 1, reference: "COMM", name: "Vải đỏ ABC cuộn 5m ", quantity: 10, unit: "Units" },
    { id: 2, reference: "CONS_0001", name: "Vải đỏ ABC cuộn 15m", quantity: 20, unit: "Units" },
    { id: 3, reference: "CONS_25630", name: "Vải đỏ ABC cuộn 25m", quantity: 30, unit: "Units" },
    { id: 4, reference: "CONS_89957", name: "Vải đỏ ABC cuộn 35m", quantity: 40, unit: "Units" },
  ]
const VariantTable = (props: Props) => {
  return (
    <div className="container mx-auto p-4">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]"></TableHead>
          <TableHead>Internal Reference</TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="">Quantity</TableHead>
          <TableHead>Unit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <Star className="text-gray-400 hover:text-yellow-400 cursor-pointer" size={16} />
            </TableCell>
            <TableCell className="font-medium">{product.reference}</TableCell>
            <TableCell>{product.name}</TableCell>

            <TableCell className="">{product.quantity}</TableCell>
            <TableCell>{product.unit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
  )
}

export default VariantTable