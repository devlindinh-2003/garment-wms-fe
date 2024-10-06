import Introduction from './components/Introduction';
import ProgressList from './components/ProgressList';
import PurchaseOrderList from './components/PurchaseOrderList';

const PurchaseOrderManagement = () => {
  return (
    <div className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-3">
      {/* Introduction */}
      <Introduction />
      {/* Progress List */}
      <ProgressList />
      {/* Table */}
      <PurchaseOrderList />
    </div>
  );
};

export default PurchaseOrderManagement;
