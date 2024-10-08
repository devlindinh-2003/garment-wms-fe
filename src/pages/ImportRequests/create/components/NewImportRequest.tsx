import DeliveryForm from './DeliveryForm';

import ImportRequestDetails from './ImportRequestDetails';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetAllPurchaseOrder } from '@/hooks/useGetAllPurchaseOrder';
import { useEffect, useState } from 'react';
import { PODelivery, PODeliveryDetail, PurchaseOrder } from '@/types/purchaseOrder';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/AlertDialog';
import { toast, useToast } from '@/hooks/use-toast';
import { importRequestApi } from '@/api/services/importRequestApi';
type Props = {};
const WarehouseInfo = {
  name: 'Warehouse 1',
  address: '123, abc, xyz',
  phone: '1234567890',
  email: 'warehouse@gmail.com',
  fax: '1234567890'
};

const deliveryFormSchema = z.object({
  purchaseOrder: z.string().min(1, 'Please select a supplier.'),
  purchaseOrderBatch: z.string().min(1, 'Please select a supplier batch.'),
  deliveryDate: z.date({
    required_error: 'A date of delivery is required.'
  }),
  description: z.string().optional()
});
const NewImportRequest = (props: Props) => {
  const form = useForm<z.infer<typeof deliveryFormSchema>>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      purchaseOrder: '',
      purchaseOrderBatch: '',
      deliveryDate: undefined,
      description: ''
    }
  });
  const { data } = useGetAllPurchaseOrder();
  const [dialogOpen, setDialogOpen] = useState(false); // State to control AlertDialog open/close
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder>();
  const [selectedPoDelivery, setSelectedPoDelivery] = useState<PODelivery>();
  const [poDeliveryDetails, setPoDeliverydetails] = useState<PODeliveryDetail[]>([]);
  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof deliveryFormSchema>) => {
    try {
      console.log('Submitting data:', data);

      const response = await importRequestApi.create(
        data.purchaseOrderBatch,
        data.description as string,
        poDeliveryDetails,
        'MATERIAL_BY_PO'
      );

      console.log('API response:', response);
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: error.message || 'There was a problem with your request.'
      });
    }
  };
  // Re-render ImportRequestDetails when poDeliveryDetails changes
  useEffect(() => {}, [poDeliveryDetails]);
  const handleFormSubmit = () => {
    form.handleSubmit(onSubmit)();
    setDialogOpen(false); // Close the dialog after submit
  };
  return (
    <div className="w-full pt-4 flex flex-col gap-4">
      <div
        className=" font-extrabold font-primary flex justify-center  text-bluePrimary text-md
        md:text-3xl
        ">
        NEW MATERIAL IMPORT REQUEST
      </div>
      <div className="w-full px-4">
        <div className="flex flex-col gap-4">
          <div className="font-primary font-bold text-xl mb-4">Delivery</div>

          <DeliveryForm
            form={form}
            onSubmit={onSubmit}
            data={data}
            setSelectedPO={setSelectedPO}
            selectedPO={selectedPO}
            setSelectedPoDelivery={setSelectedPoDelivery}
            setPoDeliverydetails={setPoDeliverydetails}
          />
        </div>
      </div>
      <div
        className="
        flex flex-col gap-4
        md:grid grid-cols-2 w-full px-4">
        <div className="flex flex-col gap-4">
          <div className="font-primary font-bold text-xl mb-4">Supplier</div>

          {/* <SuppierForm/> */}
          {selectedPO?.supplier ? (
            <div className="flex flex-col gap-4">
              <div className="font-primary font-semibold text-sm">
                Warehouse name: {selectedPO?.supplier.supplierName || 'Unknown'}
              </div>
              <div className="font-primary font-semibold text-sm">
                Address: {selectedPO?.supplier.address || 'Unknown'}
              </div>
              <div className="font-primary font-semibold text-sm">
                Phone: {selectedPO?.supplier.phoneNumber || 'Unknown'}
              </div>
              <div className="font-primary font-semibold text-sm">
                Email: {selectedPO?.supplier.email || 'Unknown'}
              </div>
              <div className="font-primary font-semibold text-sm">
                Fax: {selectedPO?.supplier.fax || 'Unknown'}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 text-xl border border-gray-300 rounded-md p-4 h-full">
              <div className="font-bold text-lg text-center">Choose the PO first</div>
              {/* Add your content inside this div */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="font-primary font-bold text-xl mb-4">Warehouse</div>
          <div className="flex flex-col gap-4">
            <div className="font-primary font-semibold text-sm">
              Warehouse name: {WarehouseInfo.name}
            </div>
            <div className="font-primary font-semibold text-sm">
              Address: {WarehouseInfo.address}
            </div>
            <div className="font-primary font-semibold text-sm">Phone: {WarehouseInfo.phone}</div>
            <div className="font-primary font-semibold text-sm">Email: {WarehouseInfo.email}</div>
            <div className="font-primary font-semibold text-sm">Fax: {WarehouseInfo.fax}</div>
          </div>
        </div>
      </div>

      <ImportRequestDetails data={poDeliveryDetails} setPoDeliverydetails={setPoDeliverydetails} />

      <div className="flex justify-center items-center pb-4">
        <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <AlertDialogTrigger asChild>
            <Button type="button">Create Import Request</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Import Request Creation</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to create this import request? Please review the details
                before proceeding. Once submitted, the request will be processed and cannot be
                modified.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleFormSubmit} type="submit">
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default NewImportRequest;
