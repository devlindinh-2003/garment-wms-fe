import { Card, CardContent, CardHeader,CardTitle  } from '@/components/ui/Card';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialForm from './MaterialForm';
import {details as materialData} from './data';
import { getMaterialColumns } from './MaterialColumns';
import type { ImportRequestDetails } from '@/types/ImportRequestType';
import DataTable from '@/components/common/EditableTable/DataTable';
import { Button } from '@/components/ui/button';
type Props = {};

const data = materialData
const ImportRequestDetails = (props: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const onEdit = useCallback((material: ImportRequestDetails) => {
    setSelectedMaterial(material);
    setIsDialogOpen(true);
  }, []);
  const onDelete = useCallback((material: ImportRequestDetails) => {
    console.log('Delete', material);
  }, []);
  const columns = useMemo(() => getMaterialColumns({ onEdit, onDelete }), []);
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="font-primary font-bold text-xl mb-4">Import Request Details</div>
      </div>

      <div className="flex justify-between mb-4">
        <div />
        {/* Add Button to Open the Dialog */}
        <Button onClick={() => setIsDialogOpen(true)}>Add Material</Button>
      </div>
        <div className="flex justify-between">
          <div />
          <div className="flex-nowrap">
            <MaterialForm
              isOpen={isDialogOpen}
              material={selectedMaterial}
              onOpenChange={(value) => {
                setIsDialogOpen(value);
                if (!value) {
                  setSelectedMaterial(null);
                }
              }}
            />
          </div>
        </div>
      
        <DataTable data={data} columns={columns}/>

    </div>
  );
};

export default ImportRequestDetails;
