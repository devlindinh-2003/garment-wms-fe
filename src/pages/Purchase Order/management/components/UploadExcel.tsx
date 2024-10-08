import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogFooter } from '@/components/ui/Dialog';
import { Progress } from '@/components/ui/progress';
import { CircleCheckBig, FileUp, Trash, XCircle } from 'lucide-react';
import Colors from '@/constants/color';
import ExcelIcon from '@/assets/images/ExcelFile_Icon.png';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Step, Stepper } from 'react-form-stepper';
import { uploadPurchaseOrderExcel } from '@/api/services/purchaseOrderSample';
import { AxiosProgressEvent } from 'axios';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isUploadComplete, setIsUploadComplete] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [poId, setPoID] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState(1);

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
      const fileSizeKB = file.size / 1024;
      if (fileSizeKB > MAX_FILE_SIZE_KB) {
        setUploadError(`The file must not be over ${MAX_FILE_SIZE_KB} KB`);
        return;
      }
      setSelectedFile(file);
      setIsUploading(true);
      setActiveStep(1);
      uploadFileToServer(file);
    }
  };

  const uploadFileToServer = async (file: File) => {
    try {
      const response = await uploadPurchaseOrderExcel(file, (progressEvent: AxiosProgressEvent) => {
        const total = progressEvent.total || 0;
        const progress = Math.round((progressEvent.loaded * 100) / total);
        setUploadProgress(progress);
      });

      if (response.statusCode === 400) {
        if (response.message === 'Invalid file format') {
          setUploadError('The file format is invalid. Please upload a valid Excel (.xlsx) file.');
        } else if (response.message === 'Invalid format') {
          setUploadError(
            'The uploaded file does not match the required template format. Please use the correct template and try again.'
          );
        } else if (response.message === 'There is error in the file' && response.errors) {
          setUploadError(
            `We found issues in the uploaded file. <a href="${response.errors}" target="_blank" class="underline text-blue-600">Click here</a> to download the file with errors and correct them.`
          );
        } else {
          setUploadError('An unknown error occurred. Please try again.');
        }
        console.error('Error from server:', response.message);
        setActiveStep(1);
      } else if (response.statusCode === 409) {
        setUploadError(
          `A unique constraint was violated. Please ensure the Purchase Order (PO) number is unique.`
        );
        console.error('Unique constraint violation:', response.message);
        setActiveStep(1);
      } else {
        console.log('Server response:', response);
        setIsUploadComplete(true);
        setActiveStep(2);
        if (response?.data?.data?.id) {
          setPoID(response?.data?.data?.id);
        }
      }
    } catch (error) {
      setUploadError('Failed to upload file. Please try again.');
      console.error('Failed to upload file:', error);
      setActiveStep(1);
    }
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

  // active = 1
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

        {selectedFile && !isUploadComplete && (
          <div className="flex flex-col bg-gray-100 border border-dashed border-gray-300 rounded-lg mt-4 pb-3">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center">
                <img src={ExcelIcon} alt="Excel Icon" className="w-10 h-10 mr-4" />
                <div className="flex flex-col">
                  <p className="font-semibold">{selectedFile.name}</p>
                </div>
              </div>
              <Trash
                size={20}
                color="red"
                className="cursor-pointer hover:opacity-30 ml-9"
                onClick={handleDeleteFile}
              />
            </div>
            <div className="px-4 w-full ">
              {isUploading ? (
                <Progress value={uploadProgress} className="h-2 bg-gray-200 mt-2 w-full" />
              ) : uploadError ? (
                <p className="text-red-600 mt-2">Upload failed</p>
              ) : (
                <p className="text-green-600 mt-2">Upload successful</p>
              )}
            </div>
          </div>
        )}

        {/* Show detailed upload error message */}
        {uploadError && (
          <div className="mt-4 flex flex-col bg-red-100 p-4 rounded-lg border border-red-300">
            <div className="flex items-center mb-2">
              <XCircle size={30} color="red" />
              <p className="ml-2 text-sm font-semibold text-red-600">{selectedFile?.name}</p>
            </div>
            <p className="text-sm text-red-600" dangerouslySetInnerHTML={{ __html: uploadError }} />
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
          <Step label="Upload successfully" />
        </Stepper>

        {/* Render components based on step */}
        {activeStep === 0 && renderProductionPlan()}
        {activeStep === 1 && renderUploadExcel()}
        {activeStep === 2 && renderUploadSuccessfully()}

        {activeStep === 2 && (
          <div className="flex justify-center items-center gap-5 mt-6">
            <Button className="bg-white text-red-500 ring-1 ring-red-500 w-32">Close</Button>
            <Button
              className="w-32"
              onClick={() => {
                if (poId) {
                  navigate(`/purchase-staff/purchase-order/detail/${poId}`);
                }
              }}>
              Open file
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UploadExcel;
