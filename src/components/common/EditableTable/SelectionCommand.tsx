import React from 'react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/Command';

interface Props {
  onSelectMaterial: (material: any) => void; // Callback for when a material is selected
}
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
const SelectionCommand: React.FC<Props> = ({ onSelectMaterial }) => {
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
