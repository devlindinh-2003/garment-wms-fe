import { Badge } from '@/components/ui/Badge';
import { Label } from '@/components/ui/Label';
import { convertDate } from '@/helpers/convertDate';
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
  status: string;
  currency: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="">{name}:</span>
      <span className="font-semibold ">{value}</span>
    </div>
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
    <div>
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-xl font-semibold text-primaryDark">Purchase Order Overview</h1>
      </div>
      <section className="flex flex-col space-y-5">
        <div className="mt-5 flex items-center justify-between ">
          <div className="flex flex-col gap-3">
            <KeyValueDisplay name="Purchase Order" value={poNumber} />
            <KeyValueDisplay name="Purchase Order Date" value={convertDate(orderDate)} />
            <KeyValueDisplay name="Production Plan: " value="PL #12" />
          </div>
          <div className="flex flex-col gap-3">
            <KeyValueDisplay
              name="Shipping amount"
              value={`${totalAmount.toLocaleString()} ${currency}`}
            />
            <KeyValueDisplay
              name="Expected finished Date"
              value={convertDate(expectedFinishDate)}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderOverview;
