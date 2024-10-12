import { Badge } from '@/components/ui/Badge';
import { PurchaseOrderStatus, PurchaseOrderStatusLabels } from '@/enums/purchaseOrderStatus';
import { convertDate } from '@/helpers/convertDate';

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
    <div className="flex items-center justify-between gap-4">
      <span className="font-medium text-gray-600">{name}:</span>
      <span className="font-semibold text-gray-800">{value}</span>
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
  const totalAmount =
    (subTotalAmount || 0) + (taxAmount || 0) + (shippingAmount || 0) + (otherAmount || 0);

  return (
    <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
      {/* Title and Status Badge */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primaryDark">Purchase Order Overview</h1>
        <StatusBadge status={status} />
      </div>

      {/* Key Details - Order Info */}
      <div className="grid grid-cols-2 gap-8 border-b pb-4 mb-4">
        <div className="space-y-3">
          <KeyValueDisplay name="Purchase Order" value={poNumber} />
          <KeyValueDisplay name="Production Plan" value="PL #12" />
        </div>
        <div className="space-y-3 text-right">
          <KeyValueDisplay name="Purchase Order Date" value={convertDate(orderDate)} />
          <KeyValueDisplay name="Expected Finished Date" value={convertDate(expectedFinishDate)} />
        </div>
      </div>

      {/* Order Amount Breakdown */}
      <div className="space-y-4 border-b pb-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="text-lg font-semibold text-gray-800">
            {(subTotalAmount || 0).toLocaleString()} {currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Tax Amount:</span>
          <span className="text-lg font-semibold text-gray-800">
            {(taxAmount || 0).toLocaleString()} {currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Shipping Amount:</span>
          <span className="text-lg font-semibold text-gray-800">
            {(shippingAmount || 0).toLocaleString()} {currency}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Other Amount:</span>
          <span className="text-lg font-semibold text-gray-800">
            {(otherAmount || 0).toLocaleString()} {currency}
          </span>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex justify-end items-center mt-6">
        <div className="text-right">
          <div className="text-lg text-gray-600 font-medium">Total Amount</div>
          <div className="text-3xl font-bold text-blue-700">
            {totalAmount.toLocaleString()} {currency}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderOverview;
