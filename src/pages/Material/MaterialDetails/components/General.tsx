import { Label } from '@/components/ui/Label';
import { Material } from '@/types/MaterialTypes';
import React from 'react';
import VariantChart from './VariantChart';

type Props = {
  material: Material;
};

const General: React.FC<Props> = ({ material }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <Label htmlFor="product-type" className="flex items-center">
          Material Type: {material?.materialType.name}
        </Label>
      </div>
      <div>
        <Label htmlFor="product-type" className="flex items-center">
          Material Code: {material?.code}
        </Label>
      </div>
      <div>
        <Label htmlFor="invoicing-policy" className="flex items-center">
          Unit of measure: {material?.materialUom.name}
        </Label>
      </div>
      <div className="col-span-2">
        {/* <Label htmlFor="track-inventory" className="flex items-center">
    Track Inventory <Info className="w-4 h-4 ml-1 text-gray-400" />
  </Label> */}
        <div className="flex items-center mt-2">
          <Label htmlFor="track-inventory" className="">
            Quantity: {material?.onHand} unit
          </Label>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          The quantity is based on the actual import not the delivery order.
        </p>
      </div>
      <div className="mt-4">
        {material?.materialVariant && <VariantChart materialVariants={material.materialVariant} />}
      </div>
    </div>
  );
};

export default General;
