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

interface Props {
  onSelectMaterial: (material: any) => void; // Callback for when a material is selected
}

const SelectionCommand: React.FC<Props> = ({ onSelectMaterial }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchMaterials = async () => {
      const materialList = await getallMaterialVariant(); // Fetch material list
      setData(materialList); // Set the fetched material list in state
    };

    fetchMaterials();
  }, []);

  return (
    <Command className="w-[500px]">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {initialDetails &&
            initialDetails.map((item) => (
              <CommandItem
                key={item.materialId}
                value={item.materialId}
                onSelect={() => onSelectMaterial(item)}>
                <div>{item.materialName}</div>
              </CommandItem>
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};

export default SelectionCommand;
