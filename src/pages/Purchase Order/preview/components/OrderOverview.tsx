import { Label } from '@/components/ui/Label';
import React from 'react';

interface KeyValueDisplayProps {
  name: string;
  value: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="">{name}:</span>
      <span className="font-semibold ">{value}</span>
    </div>
  );
};

const OrderOverview = () => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-semibold text-primaryDark">Purchase Order Overview</h1>
      </div>
      <section className="flex flex-col space-y-5">
        <div className="mt-5 flex items-center justify-between ">
          <div className="flex flex-col gap-3">
            <KeyValueDisplay name="Purchase Order" value="PO #12" />
            <KeyValueDisplay name="Purchase Order Date" value="Oct 03, 2024" />
            <KeyValueDisplay name="Production Plan: " value="PL #12" />
          </div>
          <div className="flex flex-col gap-3">
            <KeyValueDisplay name="Shipping amount" value="23" />
            <KeyValueDisplay name="Expected finished Date" value="Sept 09, 2024" />
          </div>
        </div>
        <div className="grid w-full gap-1.5">
          <Label htmlFor="message">Note</Label>
          <div
            id="message"
            className="min-h-[5rem] bg-gray-200 px-3 py-2 rounded-md text-slate-500">
            I have a computer
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderOverview;
