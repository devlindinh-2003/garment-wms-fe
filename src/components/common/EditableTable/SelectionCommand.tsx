import React, { useEffect, useState } from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/Command';
import { getallMaterialVariant } from '@/api/services/materialVariant';
import { MaterialVariant } from '@/types/MaterialTypes';

interface Props<TData> {
  dataTable: TData[]; // Data table that contains the selected items
  onSelectMaterial: (material: any) => void; // Callback for when a material is selected
}

const SelectionCommand: React.FC<Props<any>> = ({ dataTable = [], onSelectMaterial }) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const materialResponse = await getallMaterialVariant(); // Fetch material list

      // Transform the material data to match the ImportRequestDetailTableTypes structure
      const transformedMaterials = materialResponse.data.data.map((material: MaterialVariant) => ({
        materialVariant: {
          id: material.id,
          code: material.code || '',
          name: material.name || '',
          packUnit: material.packUnit || '',
          packedLength: material.packedLength || 0,
          packedWidth: material.packedWidth || 0,
          packedHeight: material.packedHeight || 0,
          uomPerPack: material.uomPerPack || 0,
          material: {
            materialUom: {
              name: material.material?.materialUom?.name || ''
            }
          }
        },
        plannedQuantity: 0, // Default value
        actualQuantity: 1, // Default value
        quantityByPack: 0 // Default value
      }));
      setData(transformedMaterials); // Set the fetched material list in state
    };

    fetchMaterials();
  }, []);

  // Function to check if the material is already in the dataTable
  const isMaterialSelected = (materialId: string) => {
    return dataTable.find((item) => item.materialVariant.id === materialId);
  };

  return (
    <Command className="w-[500px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {data &&
            data.map((item) => {
              const isSelected = isMaterialSelected(item.materialVariant.id);
              console.log(isSelected);
              return (
                <CommandItem
                  key={item.materialVariant.id}
                  value={item.materialVariant.id}
                  onSelect={() => !isSelected && onSelectMaterial(item)} // Only allow selecting if not already selected
                  disabled={isSelected} // Disable if already selected
                >
                  <div className="flex justify-between w-full">
                    <span>{item.materialVariant.name}</span>
                    {isSelected && <span>✓</span>} {/* Add a checkmark if selected */}
                  </div>
                </CommandItem>
              );
            })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SelectionCommand;
