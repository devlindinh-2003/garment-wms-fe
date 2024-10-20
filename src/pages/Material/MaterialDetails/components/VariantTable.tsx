import React, { useState } from 'react'
import { Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table"
import { MaterialVariant } from '@/types/MaterialTypes'
import { DataTable } from '@/components/ui/DataTable'
import { DetailsColumn } from './VariantColumn'
import VariantChart from './VariantChart'
type Props = {
  materialVariants: MaterialVariant[]
}


const VariantTable: React.FC<Props>= ({materialVariants}) => {
  return (
    <div className="container mx-auto p-4">
      <DataTable columns={DetailsColumn} data={materialVariants}/>
      <div className="mt-8">
        {materialVariants && <VariantChart materialVariants={materialVariants} />}
      </div>
  </div>
  )
}

export default VariantTable