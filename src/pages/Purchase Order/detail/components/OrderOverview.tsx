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
  subTotalAmount: number | null;
  taxAmount: number | null;
  shippingAmount: number | null;
  otherAmount: number | null;
  orderDate: string;
  expectedFinishDate: string;
  status: PurchaseOrderStatus;
  currency: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-medium text-gray-500">{name}:</span>
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
    <Badge className={`px-4 py-1 rounded-lg text-sm uppercase ${colorClass}`}>
      {PurchaseOrderStatusLabels[status]}
    </Badge>
  );
};

const OrderOverview: React.FC<OrderOverviewProps> = ({
  poNumber,
  subTotalAmount,
  taxAmount,
  shippingAmount,
  otherAmount,
  orderDate,
  expectedFinishDate,
  status,
  currency
}) => {
  // Ensure all values are numbers and default to 0 if null/undefined
  const totalAmount =
    (subTotalAmount || 0) + (taxAmount || 0) + (shippingAmount || 0) + (otherAmount || 0);

  return (
    <div className="bg-white p-6 rounded-md shadow-md space-y-5">
      {/* Title and Status Badge */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primaryDark">Purchase Order Overview</h1>
        <StatusBadge status={status} />
      </div>

      {/* Key Details - Order Info */}
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <KeyValueDisplay name="Purchase Order" value={poNumber} />
          <KeyValueDisplay name="Production Plan" value="PL #12" />
        </div>
        <div className="space-y-4 text-right">
          <KeyValueDisplay name="Purchase Order Date" value={convertDate(orderDate)} />
          <KeyValueDisplay name="Expected Finished Date" value={convertDate(expectedFinishDate)} />
        </div>
      </div>

      {/* Order Amount Section */}
      <div className="flex justify-end items-center space-x-3 mt-6">
        <div className="text-right">
          <div className="text-sm text-slate-500">Total Amount</div>
          <div className="text-2xl font-extrabold text-blue-600">
            {totalAmount.toLocaleString()} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
