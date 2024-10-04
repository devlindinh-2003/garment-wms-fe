import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MaterialForm from './MaterialForm';
import { details as materialData } from './data';
import { getMaterialColumns } from './MaterialColumns';
import type { ImportRequestDetails } from '@/types/ImportRequestType';
import DataTable from '@/components/common/EditableTable/DataTable';
import { Button } from '@/components/ui/button';
type Props = {};

// Replace this with your actual initial data or import
const initialDetails = [
  {
    materialId: '1',
    materialName: 'Material 1',
    SKU: 'SKU1',
    UOM: 'pcs',
    plannedQuantity: 10,
    actualQuantity: 10
  },
  {
    materialId: '2',
    materialName: 'Material 2',
    SKU: 'SKU2',
    UOM: 'pcs',
    plannedQuantity: 10,
    actualQuantity: 10
  }
  // Add more materials as needed
];
const ImportRequestDetails = (props: Props) => {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [details, setDetails] = useState(initialDetails);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isEditDetail, setEditDetail] = useState<Boolean>(false);

  const onEdit = useCallback((material: ImportRequestDetails) => {
    setSelectedMaterial(material);
    setIsDialogEditOpen(true);
  }, []);

  const handleToogleDialog = () => {
    if (isEditDetail) {
      setisLoading(true);

      setDetails([...initialDetails]);
      setEditDetail(false);
      setisLoading(false);
    } else {
      setEditDetail(true);
    }
  };
  const onDelete = useCallback(
    (material: ImportRequestDetails) => {
      const updatedDetails = details.filter((item) => item.materialId !== material.materialId);
      setDetails(updatedDetails);
    },
    [details]
  );
  const handleSave = () => {
    console.log(details);
    setisLoading(true);
    setEditDetail(false);
    setisLoading(false);
  };
  const columns = useMemo(() => getMaterialColumns({ onEdit, onDelete }), []);
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="font-primary font-bold text-xl mb-4">Import Request Details</div>
      </div>

      <div className="flex justify-end mb-4">
        {isEditDetail && (
          <Button className="mr-4" onClick={handleSave}>
            Save
          </Button>
        )}
        <Button onClick={handleToogleDialog}>{isEditDetail ? 'Cancel' : 'Edit'}</Button>
      </div>
      <div className="flex justify-between">
        <div />
        <div className="flex-nowrap">
          <MaterialForm
            isOpen={isDialogCreateOpen}
            onOpenChange={(value) => {
              setIsDialogCreateOpen(value);
            }}
            details={details}
            setDetails={setDetails}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <div />
        <div className="flex-nowrap">
          {/* <EditMaterialForm
            material={selectedMaterial}
            isOpen={isDialogEditOpen}
            onOpenChange={(value) => {
              setIsDialogEditOpen(value);
              if (!value) {
                setSelectedMaterial(null);
              }
            }}
            details={details}
            setDetails={setDetails}
          /> */}
        </div>
      </div>

      {details && !isLoading && (
        <DataTable data={details} columns={columns} isEdit={isEditDetail} setDetails={setDetails} />
      )}
    </div>
  );
};

export default ImportRequestDetails;
