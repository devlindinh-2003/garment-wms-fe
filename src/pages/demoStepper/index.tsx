// Ai hỏi thì đây là link github của lib này :https://github.com/M0kY/react-form-stepper?tab=readme-ov-file
import Colors from '@/constants/color';
import { Step, Stepper } from 'react-form-stepper';
import UploadExcel from '../Purchase Order/management/components/UploadExcel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type SheetData = Record<string, (string | number | null | undefined)[][]>;

const StepperDemo = () => {
  const navigate = useNavigate();
  const [sheetsData, setSheetsData] = useState<SheetData>({});
  const handleUploadComplete = (data: SheetData) => {
    setSheetsData(data);
    console.log('Uploaded sheets data:', data);
  };

  const handleContinue = () => {
    if (Object.keys(sheetsData).length > 0) {
      console.log('Proceeding with uploaded sheets:', sheetsData);
      navigate('/purchase-staff/purchase-order/preview', { state: { sheetsData } });
    } else {
      console.log('No data available. Cannot proceed.');
    }
  };
  return (
    <div>
      <UploadExcel
        fileName="purchase order"
        onUploadComplete={handleUploadComplete}
        continueButtonLabel="Proceed to Review"
        onContinue={handleContinue}
        triggerButtonLabel="Import a purchase order"
      />
    </div>
  );
};

export default StepperDemo;
