import { PurchaseOrderResponse } from '@/types/GetPurchaseOrder';
import axios, { AxiosProgressEvent } from 'axios';

const backend_url = 'https://garment-wms-be.onrender.com';
const BACKEND_HOST = 'http://localhost:8000';

export const getAllPurchaseOrders: () => Promise<PurchaseOrderResponse> = async () => {
  const res = await axios.get(`${backend_url}/purchase-order`);
  return res.data;
};

// export const uploadPurchaseOrderExcel: (file: File) => Promise<PurchaseOrderResponse> = async (
//   file
// ) => {
//   const formData = new FormData();
//   formData.append('file', file);
//   try {
//     const response = await axios.post(`${BACKEND_HOST}/purchase-order`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     });
//     return {
//       statusCode: response.status,
//       data: response.data?.data || null,
//       message: response.data?.message || 'Upload successful',
//       errors: null
//     } as PurchaseOrderResponse;
//   } catch (error: any) {
//     console.error('Failed to upload file:', error);

//     if (axios.isAxiosError(error) && error.response) {
//       return {
//         statusCode: error.response.status,
//         data: null,
//         message: error.response.data?.message || 'Invalid format',
//         errors: error.response.data?.errors || null
//       } as PurchaseOrderResponse;
//     }

//     return {
//       statusCode: 500,
//       data: null,
//       message: 'Something went wrong during file upload',
//       errors: null
//     } as PurchaseOrderResponse;
//   }
// };

export const uploadPurchaseOrderExcel: (
  file: File,
  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
) => Promise<PurchaseOrderResponse> = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const response = await axios.post(`${BACKEND_HOST}/purchase-order`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress // Use the onUploadProgress callback if provided
    });

    return {
      statusCode: response.status,
      data: response.data?.data || null,
      message: response.data?.message || 'Upload successful',
      errors: null
    } as PurchaseOrderResponse;
  } catch (error: any) {
    console.error('Failed to upload file:', error);

    if (axios.isAxiosError(error) && error.response) {
      return {
        statusCode: error.response.status,
        data: null,
        message: error.response.data?.message || 'Invalid format',
        errors: error.response.data?.errors || null
      } as PurchaseOrderResponse;
    }

    return {
      statusCode: 500,
      data: null,
      message: 'Something went wrong during file upload',
      errors: null
    } as PurchaseOrderResponse;
  }
};
