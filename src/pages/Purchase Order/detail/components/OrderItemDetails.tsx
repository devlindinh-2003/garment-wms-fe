import TanStackBasicTable from '@/components/common/CompositeTable';
import { Badge } from '@/components/ui/Badge';
import { CustomColumnDef } from '@/types/CompositeTable';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';
import ExpandableSectionCustom from './ExpandableSectionCustom';
import { MaterialVariant } from '@/types/MaterialVariant';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PODelivery, PODeliveryDetail } from '@/types/GetPurchaseOrder';
import { convertDate } from '@/helpers/convertDate';
import { PoDeliveryStatus } from '@/types/PurchaseOrder';
import MaterialTable from './MaterialTable';

interface OrderItemDetailsProps {
  poDelivery: PODelivery[];
}

const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ poDelivery }) => {
  const navigate = useNavigate();

  // Get the correct badge class for delivery status
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500';
      case 'FINISHED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  // Handle navigating to detailed delivery view
  const handleNavigateToDeliveryDetail = () =>
    navigate('/purchase-staff/purchase-order/detail/delivery');

  return (
    <div>
      <h1 className="text-xl font-semibold text-primaryDark">Purchase Delivery</h1>
      <div className="mt-5 flex flex-col gap-7">
        {poDelivery.map((delivery) => {
          console.log(delivery.poDeliveryDetail);

          return (
            <ExpandableSectionCustom
              key={delivery.id}
              title={convertDate(delivery.expectedDeliverDate)}
              status={
                <Badge className={`${getStatusBadgeClass(delivery.status)} text-lg text-center`}>
                  {delivery.status}
                </Badge>
              }
              defaultOpen={false}>
              <div className="flex items-center justify-between mt-5 gap-3">
                <div
                  className="flex items-center gap-2 text-primaryDark hover:opacity-50 cursor-pointer"
                  onClick={handleNavigateToDeliveryDetail}>
                  <h1 className="text-xl font-semibold">Purchase Order Delivery</h1>
                  <ExternalLink size={20} />
                </div>
                <div className="flex items-center gap-3">
                  <span>Total amount: </span>{' '}
                  <span className="font-semibold">
                    {delivery.totalAmount?.toLocaleString() || '0'}
                    <span className="text-slate-500 ml-2 text-sm">VND</span>
                  </span>
                </div>
              </div>

              {/* Render table for delivery details */}
              <MaterialTable poDeliveryDetail={delivery.poDeliveryDetail} />
            </ExpandableSectionCustom>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItemDetails;
