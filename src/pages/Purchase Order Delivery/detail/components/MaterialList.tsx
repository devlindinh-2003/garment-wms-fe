import materialSample from '@/assets/images/material.jpg';
import { PODeliveryDetail } from '@/types/purchaseOrder';

interface MaterialListProps {
  detail: PODeliveryDetail;
}

const MaterialList: React.FC<MaterialListProps> = ({ detail }) => {
  const { materialVariant, quantityByPack, totalAmount } = detail;

  return (
    <main className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <img
          src={materialSample}
          alt="Material Image"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{materialVariant.name}</h1>
          <div className="text-gray-500 text-sm flex gap-2">
            <span>{materialVariant.material.materialType.name}</span>
            <span>
              | {materialVariant.packedLength} x {materialVariant.packedWidth} x{' '}
              {materialVariant.packedHeight} {materialVariant.material.materialUom.name}
            </span>
            <span>| {materialVariant.packedWeight} kg</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xl font-semibold">{totalAmount.toLocaleString()} VND</span>
        <span className="text-gray-500 text-sm">Quantity: {quantityByPack}</span>
      </div>
    </main>
  );
};

export default MaterialList;
