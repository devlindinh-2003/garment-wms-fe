import React, { useState } from 'react';
import Spreadsheet from 'react-spreadsheet';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { AlertCircle } from 'lucide-react'; // For warning icon

// Utility function to check if a given value is a valid Excel date
const isExcelDate = (value: any): boolean => {
  return typeof value === 'number' && value > 25569 && value < 60000; // Excel date range
};

// Utility function to convert an Excel date serial number to a JavaScript date string (formatted as dd/mm/yyyy)
const convertExcelDateToJSDate = (excelSerial: number): string => {
  const date = new Date((excelSerial - 25569) * 86400 * 1000); // Excel date to JS date conversion
  return date.toLocaleDateString('en-GB'); // Format date as dd/mm/yyyy
};

// Function to convert raw data to the format expected by the react-spreadsheet component
// Here you can mark specific cells as read-only
const convertToSpreadsheetData = (data: any[][]) => {
  return data.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (isExcelDate(cell)) {
        return { value: convertExcelDateToJSDate(cell) };
      }
      if (rowIndex === 0 && colIndex === 0) {
        return { value: cell, readOnly: true }; // Make cell A1 read-only
      }
      return { value: cell }; // Otherwise, keep original cell value
    })
  );
};

const POPreview: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const importedData = location.state?.importedData || [];
  const [spreadsheetData, setSpreadsheetData] = useState(convertToSpreadsheetData(importedData));
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false); // State for the dialog
  const poNumber = spreadsheetData?.[2]?.[6]?.value || 'N/A'; // G2 corresponds to index [2][6]

  console.log('Imported Data:', importedData);

  const handleNewFileUpload = (newData: any[][]) => {
    const parsedData = convertToSpreadsheetData(newData);
    setSpreadsheetData(parsedData); // Update the spreadsheet data directly in the same route
  };

  // Handle the save action (placeholder for actual save logic)
  const handleSave = () => {
    console.log('Saving data...', spreadsheetData);
  };

  // Handle the cancel action
  const handleCancel = () => {
    setIsCancelDialogOpen(true); // Open the cancel confirmation dialog
  };

  // Handle confirmation from the dialog
  const handleConfirmCancel = () => {
    setIsCancelDialogOpen(false);
    navigate(-1); // Navigate back after confirmation
  };

  // Handle closing the dialog without canceling
  const handleCloseDialog = () => {
    setIsCancelDialogOpen(false); // Close dialog without action
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-700">Purchase Order Preview</h1>
      </div>

      {/* Display the extracted PO Number */}
      <div className="mb-6">
        <h2 className="text-xl font-medium">PO Number: {poNumber}</h2>
      </div>

      {/* Spreadsheet Display Section */}
      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
        <div className="border border-gray-300 rounded-lg bg-white p-6 shadow-lg">
          {spreadsheetData.length > 0 ? (
            <Spreadsheet data={spreadsheetData} className="table-fixed w-full border-collapse" />
          ) : (
            <p className="text-gray-600">No data to display</p>
          )}
        </div>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end mt-4 space-x-5">
        {/* Cancel button to open confirmation dialog */}
        <Button
          onClick={handleCancel} // Open the dialog on cancel click
          className="bg-white text-primaryLight ring-1 ring-primaryLight hover:text-slate-600 hover:bg-slate-400 hover:ring-slate-400">
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-primaryLight text-white px-4 py-2 rounded-md">
          Save purchase
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
          className="max-w-lg mx-auto p-4 rounded-lg shadow-lg">
          <DialogHeader className="text-center flex flex-col gap-3">
            <AlertCircle size={48} className="text-red-500 mx-auto " />
            <h3 className="text-xl font-semibold text-red-600 text-center">
              Are you sure want to cancel the file ?
            </h3>
            <p className="text-gray-600 text-center">
              The file will be removed. Are you sure you want to cancel? This action cannot be
              undone.
            </p>
          </DialogHeader>

          <div className="flex flex-col space-y-5">
            <Button
              onClick={handleCloseDialog}
              className="bg-white text-primaryLight ring-1 ring-primaryLight hover:text-slate-600 hover:bg-slate-400 hover:ring-slate-400">
              No, Go Back
            </Button>
            <Button
              onClick={handleConfirmCancel}
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
