import { Button } from '@/components/ui/button';
import Introduction from './components/Introduction';
import ProgressList from './components/ProgressList';
import UploadExcel from './components/UploadExcel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SheetData = Record<string, (string | number | null | undefined)[][]>;

const PurchaseOrderManagement = () => {
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
      navigate('/purchase-staff/purchase-order/preview', { state: { sheetsData } });
    } else {
      console.log('No data available. Cannot proceed.');
    }
  };
  return (
    <div className="h-full w-full px-4 bg-slate-200 py-3 flex flex-col space-y-3">
      {/* Introduction */}
      <Introduction />
      {/* Progress List */}
      <ProgressList />
      {/* Table */}
      <div className="flex items-center justify-center">
        <UploadExcel
          fileName="purchase order"
          onUploadComplete={handleUploadComplete}
          continueButtonLabel="Proceed to Review"
          onContinue={handleContinue}
          triggerButtonLabel="Import a purchase order"
        />
      </div>
    </div>
  );
};

export default PurchaseOrderManagement;
