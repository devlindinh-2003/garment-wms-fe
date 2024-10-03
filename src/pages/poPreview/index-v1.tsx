import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Spreadsheet from 'react-spreadsheet';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AlertCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';

const convertToSpreadsheetData = (data: (string | number | null | undefined)[][]) => {
  return data.map((row) =>
    row.map((cell) => ({
      value: cell !== null && cell !== undefined ? convertIfDate(cell)?.toString() : ''
    }))
  );
};

const convertIfDate = (
  value: string | number | null | undefined
): string | number | null | undefined => {
  if (typeof value === 'number' && value > 25569 && value < 60000) {
    const date = new Date((value - 25569) * 86400 * 1000);
    return date.toLocaleDateString('en-GB');
  }
  return value;
};

const findPONumber = (data: (string | number | null | undefined)[][]): string => {
  for (let row of data) {
    if (row) {
      for (let cell of row) {
        if (typeof cell === 'string' && cell.toLowerCase().includes('po #')) {
          const poIndex = row.indexOf(cell);
          if (poIndex !== -1 && row[poIndex + 1]) {
            const poValue = row[poIndex + 1];
            if (typeof poValue === 'string' || typeof poValue === 'number') {
              return poValue.toString();
            }
          }
        }
      }
    }
  }
  return '';
};

const POPreview: React.FC = () => {
  const columnLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const location = useLocation();
  const navigate = useNavigate();
  const { sheetsData } = location.state as {
    sheetsData: Record<string, (string | number | null | undefined)[][]>;
  };
  const [currentSheet, setCurrentSheet] = useState<string>(Object.keys(sheetsData)[0] || '');
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [poNumber, setPONumber] = useState<string>('');
  const spreadsheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sheetData = sheetsData[currentSheet];
    if (sheetData) {
      const foundPONumber = findPONumber(sheetData);
      setPONumber(foundPONumber);
    }
  }, [currentSheet, sheetsData]);

  const renderSpreadsheet = (data: (string | number | null | undefined)[][]) => {
    return (
      <div
        ref={spreadsheetRef}
        className="border border-gray-300 rounded-lg bg-white p-6 shadow-lg w-auto h-auto">
        {data?.length > 0 ? (
          <div className="w-auto h-auto">
            <Spreadsheet
              data={convertToSpreadsheetData(data)}
              columnLabels={columnLabels}
              className="table-fixed w-auto h-auto"
            />
          </div>
        ) : (
          <p className="text-gray-600">No data to display</p>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Purchase Order Preview</h1>
        {poNumber && <h2 className="text-xl font-semibold text-gray-600">PO Number: {poNumber}</h2>}
      </div>

      {/* Tabs to switch between sheets */}
      <Tabs value={currentSheet} onValueChange={setCurrentSheet}>
        <TabsList>
          {Object.keys(sheetsData).map((sheetName) => (
            <TabsTrigger
              key={sheetName}
              value={sheetName}
              className="px-4 py-2 font-medium text-gray-600 hover:bg-gray-100">
              {sheetName}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(sheetsData).map(([sheetName, data]) => (
          <TabsContent key={sheetName} value={sheetName} className="bg-gray-50 p-6">
            <div className="flex justify-center items-center">{renderSpreadsheet(data)}</div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-4 space-x-5">
        <Button
          onClick={() => {
            setIsCancelDialogOpen(true);
          }}
          className="bg-white text-primaryLight ring-1 ring-primaryLight hover:text-slate-600 hover:bg-slate-400 hover:ring-slate-400">
          Cancel
        </Button>
        <Button className="bg-primaryLight text-white px-4 py-2 rounded-md">Save purchase</Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="max-w-lg mx-auto p-4 rounded-lg shadow-lg">
          {/* Accessible Dialog Title */}
          <DialogTitle className="text-xl font-semibold  text-center text-red-500 flex flex-col gap-3">
            <AlertCircle size={48} className=" mx-auto " />
            Are you sure you want to cancel the file?
          </DialogTitle>

          <DialogHeader className="text-center flex flex-col gap-3">
            <p className="text-gray-600 text-center">
              The file will be removed. Are you sure you want to cancel? This action cannot be
              undone.
            </p>
          </DialogHeader>

          <div className="flex flex-col space-y-5">
            <Button
              onClick={() => {
                setIsCancelDialogOpen(false);
              }}
              className="bg-white text-primaryLight ring-1 ring-primaryLight hover:text-slate-600 hover:bg-slate-400 hover:ring-slate-400">
              No, Go Back
            </Button>
            <Button
              onClick={() => {
                setIsCancelDialogOpen(false);
                navigate('/PODemo');
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md">
              Yes, Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default POPreview;
