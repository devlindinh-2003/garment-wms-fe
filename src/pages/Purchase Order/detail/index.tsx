import { useEffect, useState } from 'react';
import OrderItemDetails from './components/OrderItemDetails';
import OrderOverview from './components/OrderOverview';
import OrderToDetails from './components/OrderToDetails';
import { useParams } from 'react-router-dom';
import { PurchaseOrder } from '@/types/PurchaseOrder';
import { getPurchaseOrderByID } from '@/api/services/purchaseOrderSample';

const PurchaseOrderDetails: React.FC = () => {
  const { id } = useParams();
  const [purchaseOrder, setPurchaseOrder] = useState<PurchaseOrder | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseOrder = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await getPurchaseOrderByID(id);
          if (response.statusCode === 200 && response?.data) {
            if (Array.isArray(response.data)) {
              setError('Expected a single purchase order but received an array');
            } else {
              setPurchaseOrder(response.data);
            }
          } else {
            setError('Failed to fetch purchase order details');
          }
        } catch (err) {
          setError('Error fetching data');
        } finally {
          setLoading(false);
        }
      } else {
        setError('No ID provided');
      }
    };

    fetchPurchaseOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!purchaseOrder) {
    return <div>No data found</div>;
  }
  console.log('PO Details');
  console.log(purchaseOrder);

  const {
    poNumber,
    totalAmount,
    orderDate,
    expectedFinishDate,
    supplier,
    poDelivery,
    currency,
    status
  } = purchaseOrder;

  return (
    <section className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-7">
      <div className="bg-white px-5 py-3 rounded-lg ring-1 ring-gray-300 flex flex-col gap-8">
        {/* Order overview */}
        <OrderOverview
          poNumber={poNumber}
          totalAmount={totalAmount}
          orderDate={orderDate}
          expectedFinishDate={expectedFinishDate}
          status={status}
          currency={currency}
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
