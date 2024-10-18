import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import empty from '@/assets/images/null_placeholder.jpg';
type Props = {};

const KanbanDisplayCard: React.FC<any> = ({ product }) => {
  return (
    <Card key={product.id} className="overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-sm flex items-center">{product.name}</h3>
            {product.code && <p className="text-xs text-gray-500">[{product.code}]</p>}
            {product.materialVariant && (
              <p className="text-xs text-gray-500">{product.materialVariant.length} Variants</p>
            )}

            {product.materialType && (
              <p className="text-xs text-gray-500">{product.materialType.name}</p>
            )}
            {product.materialType && (
              <p className="text-xs text-gray-500">Quantity: {product.onHand}</p>
            )}
          </div>
          <div className="w-16 h-16">
            {product.image ? (
              <AspectRatio ratio={16 / 9}>
                <img src={product.image} alt={product.name} className="object-cover rounded" />
              </AspectRatio>
            ) : (
              <AspectRatio ratio={16 / 9}>
                <img src={empty} alt={product.name} className="object-cover rounded" />
              </AspectRatio>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KanbanDisplayCard;
