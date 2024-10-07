import React, { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/Dialog';
import { Progress } from '@/components/ui/progress';
import { CircleCheckBig, FileUp, Trash, XCircle } from 'lucide-react';
import Colors from '@/constants/color';
import ExcelIcon from '@/assets/images/ExcelFile_Icon.png';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Step, Stepper } from 'react-form-stepper';
import { uploadPurchaseOrderExcel } from '@/api/services/purchaseOrderSample';

const MAX_FILE_SIZE_KB = 100;

type SheetRow = (string | number | null)[];

type UploadExcelProps = {
  fileName: string;
  onUploadComplete: (sheets: Record<string, SheetRow[]>) => void;
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
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(0);

  // Handle file change when user selects a file
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    processFile(file);
  };

  // Handle drag over the drop area
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
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
      setActiveStep(1);
      simulateUploadProgress(file);
    }
  };

  // Simulate file upload progress
  const simulateUploadProgress = (file: File) => {
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(uploadInterval);
        setIsUploading(false);
        uploadFileToServer(file);
      }
    }, 500);
  };

  // Upload file to the server using the imported API
  const uploadFileToServer = async (file: File) => {
    try {
      const response = await uploadPurchaseOrderExcel(file);
      if (response.statusCode === 400) {
        setUploadError(response.message || 'Invalid file format. Please try again.');
        console.error('Error from server:', response.message);
        setActiveStep(1);
      } else {
        console.log('Server response:', response);
        setIsUploadComplete(true);
        setActiveStep(2);
      }
      console.log(response);
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      setActiveStep(1);
    }
  };

  // Read the Excel file and pass all sheets to onUploadComplete handler
  const readExcel = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      const data = new Uint8Array(arrayBuffer);
      const binaryStr = data.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetsData: Record<string, SheetRow[]> = {};
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = XLSX.utils.sheet_to_json<SheetRow>(workbook.Sheets[sheetName], { header: 1 });
        sheetsData[sheetName] = sheet;
      });
      onUploadComplete(sheetsData);
      setIsUploadComplete(true);
      setActiveStep(2);
    };
    reader.onerror = () => {
      setUploadError('Error reading the file');
      setActiveStep(1);
    };
    reader.readAsArrayBuffer(file);
  };

  // Handle file deletion and reset the file input field
  const handleDeleteFile = () => {
    setSelectedFile(null);
    setIsUploadComplete(false);
    setUploadProgress(0);
    setUploadError(null);
    setActiveStep(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // active = 0
  const renderProductionPlan = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl">Production Plan</h1>
        <Button
          onClick={() => {
            setActiveStep((prevStep) => prevStep + 1);
          }}>
          Next
        </Button>
      </div>
    );
  };

  //active = 1
  const renderUploadExcel = () => {
    return (
      <div>
        {/* File upload area */}
        {!selectedFile && !uploadError && (
          <div
            className={`flex flex-col gap-5 justify-center items-center border-2 ${
              isDragging ? 'border-blue-700 bg-blue-50' : 'border-dashed border-blue-500'
            } rounded-lg p-10 cursor-pointer bg-gray-50`}
            onDragOver={handleDragOver}
            onDragLeave={() => {
              setIsDragging(false);
            }}
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
            <Trash
              size={24}
              color="red"
              className="cursor-pointer hover:opacity-30"
              onClick={handleDeleteFile}
            />
          </div>
        )}

        {/* Show upload progress */}
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
            <Trash
              size={25}
              color="red"
              className="cursor-pointer hover:opacity-30"
              onClick={handleDeleteFile}
            />
          </div>
        )}
      </div>
    );
  };

  // active = 2
  const renderUploadSuccessfully = () => {
    return (
      <main>
        <div className="flex justify-center flex-col items-center">
          <CircleCheckBig color={Colors.success} size={60} className="text-center mb-5" />
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold text-2xl text-center text-green-500">Upload successfully</h1>
            <h2>Your file has been uploaded successfully</h2>
          </div>
        </div>
        <div className="flex justify-end items-center gap-5 mt-6">
          <Button
            className="bg-white text-red-500 ring-1 ring-red-500 "
            onClick={() => {
              handleDeleteFile();
              setActiveStep(0);
            }}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              onContinue();
            }}>
            Preview
          </Button>
        </div>
      </main>
    );
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
          <h1 className="text-xl font-semibold capitalize ">Upload {fileName}</h1>
        </DialogTitle>

        {/* Stepper component */}
        <Stepper
          activeStep={activeStep}
          styleConfig={{
            activeBgColor:
              uploadError && activeStep === 1 ? 'red' : Colors.primaryLightBackgroundColor,
            activeTextColor: Colors.commonBtnText,
            completedBgColor: Colors.primaryDarkBackgroundColor,
            completedTextColor: Colors.commonBtnText,
            inactiveBgColor: Colors.greyText,
            inactiveTextColor: Colors.commonBtnText,
            size: '30px',
            circleFontSize: '16px',
            labelFontSize: '13px',
            borderRadius: '20px',
            fontWeight: '300'
          }}>
          <Step label="Choose production plan" />
          <Step label="Upload Excel" />
          <Step label="Update successfully" />
        </Stepper>

        {/* Render components based on step */}
        {activeStep === 0 && renderProductionPlan()}
        {activeStep === 1 && renderUploadExcel()}
        {activeStep === 2 && renderUploadSuccessfully()}
      </DialogContent>
    </Dialog>
  );
};

export default UploadExcel;
