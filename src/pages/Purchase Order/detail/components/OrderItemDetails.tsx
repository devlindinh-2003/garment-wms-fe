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
        return 'bg-yellow-500';
      case 'FINISHED':
        return 'bg-green-500';
      case 'CANCELLED':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const handleNavigateToDeliveryDetail = (delivery: PODelivery) => {
    navigate(`/purchase-staff/purchase-order/delivery/${delivery.id}`, {
      state: { delivery }
    });
  };

  return (
    <div>
      <h1 className="text-xl font-semibold text-primaryDark">Purchase Delivery</h1>
      <div className="mt-5 flex flex-col gap-7">
        {poDelivery.map((delivery) => {
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
                <Link
                  to={{
                    pathname: `/purchase-staff/purchase-order/delivery/${delivery.id}`
                  }}
                  state={{ delivery }}
                  className="flex items-center gap-2 text-primaryDark hover:opacity-50 cursor-pointer">
                  <div
                    className="flex items-center gap-2 text-primaryDark hover:opacity-50 cursor-pointer"
                    onClick={() => handleNavigateToDeliveryDetail(delivery)}>
                    <h1 className="text-xl font-semibold">View details</h1>
                    <ExternalLink size={20} />
                  </div>
                </Link>
                <div className="flex items-center gap-3">
                  <span>Total amount: </span>{' '}
                  <span className="font-semibold">
                    {delivery.totalAmount?.toLocaleString() || '0'}
                    <span className="text-slate-500 ml-2 text-sm">VND</span>
                  </span>
                </div>
              </div>

              {/* Render table for matẻial details */}
              <MaterialTable poDeliveryDetail={delivery.poDeliveryDetail} />
            </ExpandableSectionCustom>
          );
        })}
      </div>
    </div>
  );
};

export default OrderItemDetails;
