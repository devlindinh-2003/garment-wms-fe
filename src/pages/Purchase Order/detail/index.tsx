import OrderItemDetails from './components/OrderItemDetails';
import OrderOverview from './components/OrderOverview';
import OrderToDetails from './components/OrderToDetails';
import { useParams } from 'react-router-dom';
import { PurchaseOrderStatus } from '@/types/PurchaseOrderStatus';
import { useGetPurchaseOrderById } from '@/hooks/useGetPurchaseOrderById';

const statusMap: Record<string, PurchaseOrderStatus> = {
  IN_PROGRESS: PurchaseOrderStatus.IN_PROGRESS,
  CANCELLED: PurchaseOrderStatus.CANCELLED,
  FINISHED: PurchaseOrderStatus.FINISHED
};

const PurchaseOrderDetails: React.FC = () => {
  const { id } = useParams();
  const { data, status, error } = useGetPurchaseOrderById(id!);
  if (status === 'pending') {
    return <div>Loading...</div>;
  }
  if (status === 'error') {
    return <div>Error: {error?.message || 'Failed to load purchase order details'}</div>;
  }
  const purchaseOrder = data?.data;
  if (!purchaseOrder) {
    return <div>No data found</div>;
  }

  const {
    poNumber,
    subTotalAmount,
    orderDate,
    expectedFinishDate,
    supplier,
    poDelivery,
    currency,
    status: poStatus,
    taxAmount,
    shippingAmount,
    otherAmount
  } = purchaseOrder;

  return (
    <section className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-7">
      <div className="bg-white px-5 py-3 rounded-lg ring-1 ring-gray-300 flex flex-col gap-8">
        {/* Order overview */}
        <OrderOverview
          poNumber={poNumber}
          subTotalAmount={subTotalAmount}
          orderDate={orderDate}
          expectedFinishDate={expectedFinishDate}
          status={statusMap[poStatus]}
          currency={currency}
          taxAmount={taxAmount}
          shippingAmount={shippingAmount}
          otherAmount={otherAmount}
        />
        {/* Order to details */}
        <OrderToDetails supplier={supplier} />
        {/* Order item details */}
        <OrderItemDetails poDelivery={poDelivery} />
      </div>
    </section>
  );
};

export default PurchaseOrderDetails;
