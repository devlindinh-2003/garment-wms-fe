import { Badge } from '@/components/ui/Badge';
import { convertDate } from '@/helpers/convertDate';
import { PurchaseOrderStatus, PurchaseOrderStatusLabels } from '@/types/PurchaseOrderStatus';
import React from 'react';

interface KeyValueDisplayProps {
  name: string;
  value: string;
}

interface OrderOverviewProps {
  poNumber: string;
  totalAmount: number;
  orderDate: string;
  expectedFinishDate: string;
  status: PurchaseOrderStatus;
  currency: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-medium text-gray-600">{name}:</span>
      <span className="font-semibold text-primaryDark">{value}</span>
    </div>
  );
};

const StatusBadge: React.FC<{ status: PurchaseOrderStatus }> = ({ status }) => {
  let colorClass = '';

  switch (status) {
    case PurchaseOrderStatus.IN_PROGRESS:
      colorClass = 'bg-blue-500 text-white text-sm';
      break;
    case PurchaseOrderStatus.CANCELLED:
      colorClass = 'bg-red-500 text-white text-sm';
      break;
    case PurchaseOrderStatus.FINISHED:
      colorClass = 'bg-green-500 text-white text-sm';
      break;
    default:
      colorClass = 'bg-gray-500 text-white text-sm';
  }

  return (
    <Badge className={`px-4 py-1 rounded-lg text-lg ${colorClass}`}>
      {PurchaseOrderStatusLabels[status]}
    </Badge>
  );
};

const OrderOverview: React.FC<OrderOverviewProps> = ({
  poNumber,
  totalAmount,
  orderDate,
  expectedFinishDate,
  status,
  currency
}) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-lg space-y-5">
      {/* Title and Status Badge */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold text-primaryDark">Purchase Order Overview</h1>
        <StatusBadge status={status} />
      </div>

      {/* Key Details - Order Info */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <KeyValueDisplay name="Purchase Order" value={poNumber} />
          <KeyValueDisplay name="Production Plan" value="PL #12" />
        </div>
        <div className=" flex flex-col space-y-3 text-right">
          <KeyValueDisplay name="Purchase Order Date" value={convertDate(orderDate)} />
          <KeyValueDisplay name="Expected Finished Date" value={convertDate(expectedFinishDate)} />
        </div>
      </div>

      {/* Order Amount Section */}
      <div className="flex justify-end items-center space-x-3">
        <div className="text-right">
          <div className="text-sm text-slate-500">Total Amount</div>
          <div className="text-lg font-bold text-primary">
            {totalAmount.toLocaleString()} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
