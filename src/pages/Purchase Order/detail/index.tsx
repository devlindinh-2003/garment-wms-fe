import OrderItemDetails from './components/OrderItemDetails';
import OrderOverview from './components/OrderOverview';
import OrderToDetails from './components/OrderToDetails';

const PurchaseOrderDetails = () => {
  return (
    <section className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-7">
      <div className="bg-white px-5 py-3 rounded-lg ring-1 ring-gray-300 flex flex-col gap-8">
        {/* Order overview */}
        <OrderOverview />
        {/* Order to details */}
        <OrderToDetails />
        {/* Order item details */}
        <OrderItemDetails />
      </div>
    </section>
  );
};

export default PurchaseOrderDetails;
