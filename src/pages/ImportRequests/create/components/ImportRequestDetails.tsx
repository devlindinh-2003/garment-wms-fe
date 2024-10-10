<<<<<<< HEAD
import type { ImportRequestDetails } from '@/types/ImportRequestType';
import { useState } from 'react';
import MaterialForm from './MaterialForm';
// import DataTable from '@/components/common/EditableTable/DataTable';
import { Button } from '@/components/ui/button';
import EditMaterialForm from './EditMaterialForm';
type Props = {};

// Replace this with your actual initial data or import
const initialDetails = [
  { materialId: "1", materialName: "Material 1", SKU: "SKU1", UOM: "pcs", plannedQuantity: 10, actualQuantity: 10 },
  { materialId: "2", materialName: "Material 2", SKU: "SKU2", UOM: "pcs",plannedQuantity: 10, actualQuantity: 10 },
  // Add more materials as needed
];
const ImportRequestDetails = (props: Props) => {
  const [isDialogCreateOpen, setIsDialogCreateOpen] = useState<boolean>(false);
  const [selectedMaterial, setSelectedMaterial] = useState<any>(null);
  const [details, setDetails] = useState(initialDetails);
  const [isDialogEditOpen, setIsDialogEditOpen] = useState<boolean>(false);

  // const onEdit = useCallback((material: ImportRequestDetails) => {
  //   setSelectedMaterial(material);
  //   setIsDialogEditOpen(true);
  // }, []);
  // const onDelete = useCallback((material: ImportRequestDetails) => {
  //   const updatedDetails = details.filter(item => item.materialId !== material.materialId);
  //   setDetails(updatedDetails);
  // }, [details]);
  // const columns = useMemo(() => getMaterialColumns({ onEdit, onDelete }), []);
=======
import React, { useEffect, useMemo, useState } from 'react';
import { getMaterialColumns } from './MaterialColumns';
import DataTable from '@/components/common/EditableTable/DataTable';
import { Button } from '@/components/ui/button';
import { PODeliveryDetail } from '@/types/purchaseOrder';
import { useToast } from '@/hooks/use-toast';
type Props = {
  data: PODeliveryDetail[] | undefined;
  setPoDeliverydetails: React.Dispatch<React.SetStateAction<PODeliveryDetail[]>>;
  setEditDetail: React.Dispatch<React.SetStateAction<Boolean>>;
  isEditDetail: Boolean;
};

const ImportRequestDetails = ({
  data,
  setPoDeliverydetails,
  setEditDetail,
  isEditDetail
}: Props) => {
  const { toast } = useToast();
  const initializeDetails = (data: PODeliveryDetail[] | undefined) => {
    // Map through the data and add plannedQuantity and actualQuantity fields
    return (data || []).map((item) => ({
      ...item,
      plannedQuantity: item.quantityByPack, // Default value, you can modify this as needed
      actualQuantity: item.quantityByPack // Default value, you can modify this as needed
    }));
  };
  const [details, setDetails] = useState(initializeDetails(data));

  // Use effect to update details when data changes
  useEffect(() => {
    setDetails(initializeDetails(data));
  }, [data]);
  const handleToogleDialog = () => {
    if (initializeDetails(data).length <= 0) {
      toast({
        variant: 'destructive',
        title: 'Please choose a Purchase Order and Purchase Order batch first',
        description: ''
      });
    } else if (isEditDetail) {
      setDetails(initializeDetails(data)); // Reset details to the original data, handling undefined case
      setEditDetail(false);
    } else {
      setEditDetail(true);
    }
  };
  const handleSave = () => {
    setEditDetail(false);
    setPoDeliverydetails(details);
  };
  const columns = useMemo(() => getMaterialColumns({}), []);
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="font-primary font-bold text-xl mb-4">Import Request Details</div>
      </div>

<<<<<<< HEAD
      <div className="flex justify-between mb-4">
        <div />
        {/* Add Button to Open the Dialog */}
        <Button onClick={() => setIsDialogCreateOpen(true)}>Add Material</Button>
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
          <EditMaterialForm
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
      />
          </div>
        </div>
      
        {/* <DataTable data={details} columns={columns}/> */}

=======
      <div className="flex justify-end mb-4">
        {isEditDetail && (
          <Button className="mr-4" onClick={handleSave}>
            Save
          </Button>
        )}
        <Button onClick={handleToogleDialog}>{isEditDetail ? 'Cancel' : 'Edit'}</Button>
      </div>

      {details && (
        <DataTable data={details} columns={columns} isEdit={isEditDetail} setDetails={setDetails} />
      )}
>>>>>>> ec216b7d54be3e4d070f00e859e78c2a8ea759ac
    </div>
  );
};

export default ImportRequestDetails;
