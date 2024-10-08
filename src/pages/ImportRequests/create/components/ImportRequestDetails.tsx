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
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="font-primary font-bold text-xl mb-4">Import Request Details</div>
      </div>

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

    </div>
  );
};

export default ImportRequestDetails;
