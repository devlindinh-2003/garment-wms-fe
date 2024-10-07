import { Badge } from '@/components/ui/Badge';
import { Calendar, Truck } from 'lucide-react';
import materialSample from '@/assets/images/material.jpg';

const MaterialList = () => {
  return (
    <main className="flex items-center justify-between pb-4">
      <div className="flex items-center gap-4">
        <img
          src={materialSample}
          alt="Material Image"
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Cotton Fabric Roll</h1>
          <div className="text-gray-500 text-sm flex gap-2">
            <span>Fabric</span>
            <span>| 100 meters</span>
            <span>| 50 kg</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <span className="text-xl font-semibold">200.000 VND</span>
        <span className="text-gray-500 text-sm">Quantity: 6</span>
      </div>
    </main>
  );
};

const PurchaseOrderDeliveryDetails = () => {
  return (
    <main className="w-full h-full bg-white rounded-md  px-6  pt-3 pb-7">
      {/* Header */}
      <section className="flex items-center justify-between border-b-2 border-slate-300 pb-4 mb-4">
        <div className="flex flex-col gap-3 ">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold">Purchase Order Delivery ID: </h1>
            <h1 className="text-2xl text-primaryDark font-semibold">3354654654526</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="text-gray-500 text-sm" />
              <span className="text-gray-700 text-sm ">Order date:</span>
              <span className="ml-3 font-semibold">15/10/2024</span>
            </div>

            <div className="flex items-center gap-2 text-green-600">
              <Truck className="text-sm" />
              <span className="text-sm ">Estimated delivery:</span>
              <span className="ml-3 font-semibold">05/03/2025</span>
            </div>
          </div>
        </div>

        <Badge className="bg-yellow-500 text-xl capitalize">pending</Badge>
      </section>
      {/* Material List */}
      <section className="flex flex-col gap-3 border-b-2 border-slate-300 pb-4 mb-4">
        <MaterialList />
        <MaterialList />
        <MaterialList />
      </section>
      {/* Purchaser Info */}
      <section className="flex items-center justify-between border-b-2 border-slate-300 pb-4 mb-4 ">
        <div className="flex flex-col gap-1">
          <h1 className="text-lg font-semibold">Purchasing Staff</h1>
          <div className="flex items-center gap-2">
            <span className=" text-slate-500">Staff ID: </span>
            <span className=" font-semibold">3890428394823</span>
          </div>
          <div className="flex items-center gap-2  ">
            <span className=" text-slate-500">Staff name: </span>
            <span className=" font-semibold">Huy Long</span>
          </div>
        </div>
        <div className="flex flex-col gap-1 w-64">
          <h1 className="text-lg font-semibold">Address</h1>
          Lo E2a-7, Duong D1, D. D1, Long Thanh My, Thanh Pho Thu Duc
          <span className=" text-slate-500"></span>
        </div>
      </section>
      {/* Price Order Summary */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <div className="flex justify-between">
          <span className="text-gray-600">Overall</span>
          <span>200.000 VND</span>
        </div>

        <div className="flex justify-between mt-2">
          <span className="text-gray-600">Tax</span>
          <span className="text-green-600 font-semibold">+ 150.000VND</span>
        </div>

        <hr className="my-4 border-gray-300" />

        <div className="flex justify-between">
          <span className="text-gray-600">Total</span>
          <span className="text-black font-semibold">350.000 VND</span>
        </div>
      </section>
    </main>
  );
};

export default PurchaseOrderDeliveryDetails;
