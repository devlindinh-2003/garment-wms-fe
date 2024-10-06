import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UploadExcel from '@/components/UploadExcel';
// import { mockPurchaseOrders } from '@/data/purchase_order';

type SheetData = Record<string, (string | number | null | undefined)[][]>;

const ImportPurchaseOrder: React.FC = () => {
  const [sheetsData, setSheetsData] = useState<SheetData>({});
  const navigate = useNavigate();

  // Handle the completion of the file upload process
  const handleUploadComplete = (data: SheetData) => {
    setSheetsData(data);
    console.log('Uploaded sheets data:', data);
  };

  // Handle the continue action
  const handleContinue = () => {
    if (Object.keys(sheetsData).length > 0) {
      console.log('Proceeding with uploaded sheets:', sheetsData);
      navigate('/popreview', { state: { sheetsData } });
    } else {
      console.log('No data available. Cannot proceed.');
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit clicked for PO ID: ${id}`);
  };

  const handleDetails = (id: number) => {
    console.log(`Details clicked for PO ID: ${id}`);
  };

  return (
    <section className="flex flex-col items-center justify-center">
      {/* Table for Purchase Orders */}
      <div className="mt-10 max-w-4xl w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold mb-4">Purchase Orders List</h1>
          <UploadExcel
            fileName="purchase order"
            onUploadComplete={handleUploadComplete}
            continueButtonLabel="Proceed to Review"
            onContinue={handleContinue}
          />
        </div>
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border">PO ID</th>
              <th className="px-4 py-2 border">PO Number</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total Amount</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {mockPurchaseOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="px-4 py-2 border">{order.id}</td>
                <td className="px-4 py-2 border">{order.PO_number}</td>
                <td className="px-4 py-2 border">{order.status}</td>
                <td className="px-4 py-2 border">{order.total_amount.toFixed(2)}</td>
                <td className="px-4 py-2 border">
                  <Button
                    className="mr-2 bg-blue-500 text-white hover:bg-blue-600"
                    onClick={() => handleEdit(order.id)}>
                    Edit
                  </Button>
                  <Button
                    className="bg-green-500 text-white hover:bg-green-600"
                    onClick={() => handleDetails(order.id)}>
                    Details
                  </Button>
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ImportPurchaseOrder;
