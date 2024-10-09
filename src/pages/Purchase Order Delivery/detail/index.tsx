import { Badge } from '@/components/ui/Badge';
import { Calendar, Truck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { PODelivery } from '@/types/GetPurchaseOrder';
import { convertDate } from '@/helpers/convertDate';
import MaterialList from './components/MaterialList';
import { PoDeliveryDetail } from '@/types/PurchaseOrderDeliveryDetail';

const PurchaseOrderDeliveryDetails = () => {
  const location = useLocation();
  const { delivery } = location.state as { delivery: PODelivery };

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
    <main className="w-full h-full bg-white rounded-md shadow-lg px-8 pt-6 pb-8 pl-5">
      {/* Header */}
      <section className="flex items-center justify-between border-b border-gray-200 pb-5 mb-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-medium text-gray-700">Purchase Order Delivery ID:</h1>
            <h1 className="text-2xl font-bold text-primaryDark">{delivery.purchaseOrderId}</h1>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-500 text-sm" />
              <span className="text-gray-600 text-sm">Order Date:</span>
              <span className="ml-3 font-semibold text-gray-700">
                {delivery.orderDate ? convertDate(delivery.orderDate) : 'N/A'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <Truck className="text-sm" />
              <span className="text-sm t">Estimated Delivery:</span>
              <span className="ml-3 font-semibold ">
                {delivery.expectedDeliverDate ? convertDate(delivery.expectedDeliverDate) : 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <Badge className={`px-3 py-2 rounded-md text-lg ${getStatusBadgeClass(delivery.status)}`}>
          {delivery.status}
        </Badge>
      </section>

      {/* Material List */}
      <section className="flex flex-col gap-6 border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-semibold text-primaryDark">Materials</h2>
        {delivery.poDeliveryDetail.map((detail: PoDeliveryDetail) => (
          <MaterialList key={detail.id} detail={detail} />
        ))}
      </section>

      {/* Purchaser Info */}
      <section className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold text-gray-700">Purchasing Staff</h1>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Staff ID:</span>
            <span className="font-semibold text-gray-700">3890428394823</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Staff Name:</span>
            <span className="font-semibold text-gray-700">Huy Long</span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-72">
          <h1 className="text-lg font-semibold text-gray-700">Delivery Address</h1>
          <p className="text-gray-600 leading-relaxed">
            Lo E2a-7, Duong D1, D. D1, Long Thanh My, Thanh Pho Thu Duc
          </p>
        </div>
      </section>

      {/* Price Order Summary */}
      <section>
        <h2 className="text-lg font-semibold text-primaryDark mb-4">Order Summary</h2>
        <div className="flex justify-between">
          <span className="text-gray-600">Overall</span>
          <span className="font-semibold text-gray-700">200.000 VND</span>
        </div>

        <div className="flex justify-between mt-3">
          <span className="text-gray-600">Tax</span>
          <span className="font-semibold text-green-600">+ 150.000 VND</span>
        </div>

        <hr className="my-4 border-gray-200" />

        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="font-semibold text-black">{delivery.totalAmount} VND</span>
        </div>
      </section>
    </main>
  );
};

export default PurchaseOrderDeliveryDetails;
