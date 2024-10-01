import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { FileUp, Trash, XCircle } from 'lucide-react';
import Colors from '@/constants/color';
import ExcelIcon from '@/assets/images/ExcelFile_Icon.png';
import { DialogTitle } from '@radix-ui/react-dialog';

const MAX_FILE_SIZE_KB = 100;

type UploadExcelProps = {
  fileName: string;
  onUploadComplete: (data: any[][]) => void;
  continueButtonLabel?: string;
  onContinue: () => void;
  triggerButtonLabel?: string;
};

const UploadExcel: React.FC<UploadExcelProps> = ({
  fileName,
  onUploadComplete,
  onContinue,
  continueButtonLabel = 'Open File',
  triggerButtonLabel = 'Import'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadComplete, setIsUploadComplete] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Handle file change when a user selects a file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    processFile(file);
  };

  // Handle drag over the drop area
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave from the drop area
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Handle file drop into the drop area
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  // Process file for validation and upload
  const processFile = (file: File | null) => {
    if (file) {
      setUploadError(null);
      // Check file type (only accept .xlsx)
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        setUploadError('Only .xlsx files are allowed');
        return;
      }
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > MAX_FILE_SIZE_KB) {
        setUploadError(`The file must not be over ${MAX_FILE_SIZE_KB} KB`);
        return;
      }
      setSelectedFile(file);
      setIsUploading(true);
      simulateUploadProgress(file);
    }
  };

  // Simulate a file upload progress
  const simulateUploadProgress = (file: File) => {
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        setIsUploadComplete(true);
        readExcel(file);
      }
    }, 500);
  };

  // Read the Excel file and parse it to JSON
  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      console.log('Parsed Data:', jsonData);
      onUploadComplete(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  // Handle file deletion and reset the file input field
  const handleDeleteFile = () => {
    setSelectedFile(null);
    setIsUploadComplete(false);
    setUploadProgress(0);
    setUploadError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button>{triggerButtonLabel}</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}>
        <DialogTitle>
          <h1 className="text-xl font-semibold capitalize">Upload {fileName}</h1>
        </DialogTitle>

        {/* File upload area */}
        {!selectedFile && !uploadError && (
          <div
            className={`flex flex-col gap-5 justify-center items-center border-2 ${
              isDragging ? 'border-blue-700 bg-blue-50' : 'border-dashed border-blue-500'
            } rounded-lg p-10 cursor-pointer bg-gray-50`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}>
            <input
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              ref={fileInputRef}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-700 hover:text-blue-800 flex flex-col gap-5 items-center">
              <FileUp size={45} color={Colors.primaryLightBackgroundColor} />
              <span className="font-semibold">Click or drag file to this area to upload</span>
            </label>
            <span className="text-sm text-gray-500">
              Formats accepted: .xlsx (Max size: {MAX_FILE_SIZE_KB} KB)
            </span>
          </div>
        )}

        {/* Show upload error message */}
        {uploadError && (
          <div className="mt-4 flex items-center justify-between bg-red-100 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <XCircle size={24} color="red" />
              <div>
                <p className="text-sm text-gray-700">{selectedFile?.name}</p>
                <p className="text-xs text-red-600">{uploadError}</p>
              </div>
            </div>
            <Trash size={24} color="red" className="cursor-pointer" onClick={handleDeleteFile} />
          </div>
        )}

        {/* Show upload progress using Shadcn Progress component */}
        {isUploading && (
          <div className="w-full mt-4">
            <Progress value={uploadProgress} className="h-4 bg-gray-200" />
            <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploading...</p>
          </div>
        )}

        {/* Show success message and file info after upload */}
        {isUploadComplete && !uploadError && selectedFile && (
          <div className="mt-4 flex items-center justify-between bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center space-x-3">
              <img src={ExcelIcon} alt="Excel Icon" className="w-8 h-8" />
              <div>
                <p className="text-sm text-gray-700 font-bold">{selectedFile.name}</p>
                <p className="text-xs text-green-600">Upload successfully</p>
              </div>
            </div>
            <Trash size={24} color="red" className="cursor-pointer" onClick={handleDeleteFile} />
          </div>
        )}

        {/* Conditionally render buttons only after upload starts */}
        {selectedFile && (
          <DialogFooter>
            <Button
              className="bg-white text-primaryLight ring-1 ring-primaryLight hover:text-slate-600 hover:bg-slate-400 hover:ring-slate-400"
              onClick={handleDeleteFile}
              disabled={isUploading}>
              Cancel
            </Button>
            <Button
              className={`bg-blue-600 text-white ${
                !isUploadComplete || uploadError ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={!isUploadComplete || !!uploadError}
              onClick={onContinue}>
              {continueButtonLabel}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadExcel;
