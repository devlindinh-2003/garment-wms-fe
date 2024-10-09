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
      colorClass = 'bg-blue-500 text-white';
      break;
    case PurchaseOrderStatus.CANCELLED:
      colorClass = 'bg-red-500 text-white';
      break;
    case PurchaseOrderStatus.FINISHED:
      colorClass = 'bg-green-500 text-white';
      break;
    default:
      colorClass = 'bg-gray-500 text-white';
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
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-primaryDark">Purchase Order Overview</h1>
        <StatusBadge status={status} />
      </div>

      {/* Key Details - Order Info */}
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-3">
          <KeyValueDisplay name="Purchase Order" value={poNumber} />
          <KeyValueDisplay name="Production Plan" value="PL #12" />
          <KeyValueDisplay name="Purchase Order Date" value={convertDate(orderDate)} />
        </div>
        <div className="space-y-3 text-right">
          <KeyValueDisplay name="Expected finished Date" value={convertDate(expectedFinishDate)} />
          <KeyValueDisplay
            name="Shipping amount"
            value={`${totalAmount.toLocaleString()} ${currency}`}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
