import { Badge } from '@/components/ui/Badge';
import ExpandableSectionCustom from './ExpandableSectionCustom';
import { ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PODelivery } from '@/types/GetPurchaseOrder';
import { convertDate } from '@/helpers/convertDate';
import MaterialTable from './MaterialTable';

interface OrderItemDetailsProps {
  poDelivery: PODelivery[];
}

const OrderItemDetails: React.FC<OrderItemDetailsProps> = ({ poDelivery }) => {
  const navigate = useNavigate();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-500 text-white';
      case 'FINISHED':
        return 'bg-green-500 text-white';
      case 'CANCELLED':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-white';
    }
  };

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold text-primaryDark">Purchase Delivery</h1>
      <div className="mt-5 flex flex-col gap-6">
        {poDelivery.map((delivery) => (
          <ExpandableSectionCustom
            key={delivery.id}
            title={convertDate(delivery.expectedDeliverDate)}
            status={
              <Badge className={`${getStatusBadgeClass(delivery.status)} text-center`}>
                {delivery.status}
              </Badge>
            }
            defaultOpen={false}>
            <div className="flex items-center justify-end mt-5 gap-3">
              <Link
                to={`/purchase-staff/purchase-order/delivery/${delivery.id}`}
                state={{ delivery }}
                className="flex items-center gap-2 text-primaryDark hover:opacity-80">
                <h1 className="text-xl font-semibold">View details</h1>
                <ExternalLink size={20} />
              </Link>
            </div>

            {/* Render table for material details */}
            <MaterialTable poDeliveryDetail={delivery.poDeliveryDetail} />
            <div className="flex justify-end items-center space-x-3">
              <div className="text-right flex items-center gap-2">
                <div className="text-sm text-slate-500">Total amount: </div>
                <div className="text-lg font-bold text-primary">
                  {delivery.totalAmount?.toLocaleString() || '0'} VND
                </div>
              </div>
            </div>
          </ExpandableSectionCustom>
        ))}
      </div>
    </div>
  );
};

export default OrderItemDetails;
