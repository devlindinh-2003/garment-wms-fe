import { getAllPurchaseOrders } from '@/api/services/purchaseOrderSample';
import Introduction from './components/Introduction';
import ProgressList from './components/ProgressList';
import PurchaseOrderList from './components/PurchaseOrderList';
import { useEffect, useState } from 'react';
import { PurchaseOrder } from '@/types/PurchaseOrder';

const PurchaseOrderManagement = () => {
  const [poList, setPoList] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPurchaseOrders = async () => {
      try {
        setLoading(true);
        const response = await getAllPurchaseOrders();
        setPoList(response?.data?.data! || []);
      } catch (err) {
        setError('Failed to fetch purchase orders');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPurchaseOrders();
  }, []);

  if (error) return <p>{error}</p>;
  console.log(poList);

  return (
    <div className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-3">
      {/* Introduction */}
      <Introduction />
      {/* Progress List */}
      <ProgressList />
      {/* Table */}
      <PurchaseOrderList purchaseOrders={poList} />
    </div>
  );
};

export default PurchaseOrderManagement;
