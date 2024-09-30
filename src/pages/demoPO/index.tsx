import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import UploadExcel from '@/components/UploadExcel';
import { mockPurchaseOrders } from '@/data/purchase_order';

const ImportPurchaseOrder: React.FC = () => {
  const [parsedData, setParsedData] = useState<any[][]>([]);
  const navigate = useNavigate();

  // Handle the completion of the file upload process
  const handleUploadComplete = (data: any[][]) => {
    setParsedData(data);
    console.log('Uploaded data:', data);
  };

  // Handle the continue action
  const handleContinue = () => {
    if (parsedData.length > 0) {
      console.log('Proceeding with uploaded data:', parsedData);
      navigate('/popreview', { state: { importedData: parsedData } });
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
            {mockPurchaseOrders.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ImportPurchaseOrder;
