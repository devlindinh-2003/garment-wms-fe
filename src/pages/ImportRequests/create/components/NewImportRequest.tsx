import DeliveryForm from './DeliveryForm';

import ImportRequestDetails from './ImportRequestDetails';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetAllPurchaseOrder } from '@/hooks/useGetAllPurchaseOrder';
import { useState } from 'react';
import { PODelivery, PODeliveryDetail, PurchaseOrder } from '@/types/purchaseOrder';

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
  productionPlan: z.string().min(1, 'Supplier mobile number is required.')
});
const NewImportRequest = (props: Props) => {
  const form = useForm<z.infer<typeof deliveryFormSchema>>({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      purchaseOrder: '',
      purchaseOrderBatch: '',
      deliveryDate: undefined,
      productionPlan: ''
    }
  });
  const { data } = useGetAllPurchaseOrder();
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder>();
  const [selectedPoDelivery, setSelectedPoDelivery] = useState<PODelivery>();
  const [poDeliveryDetails, setPoDeliverydetails] = useState<PODeliveryDetail[]>();
  const onSubmit = (data: z.infer<typeof deliveryFormSchema>) => {
    console.log(data);
  };
  return (
    <div className="w-full pt-4 flex flex-col gap-4">
      <div
        className=" font-extrabold font-primary flex justify-center  text-bluePrimary text-md
        md:text-3xl
        ">
        NEW IMPORT REQUEST
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

      {poDeliveryDetails && (
        <ImportRequestDetails
          data={poDeliveryDetails}
          setPoDeliverydetails={setPoDeliverydetails}
        />
      )}

      <div className="flex justify-center items-center pb-4">
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Create Import Request
        </Button>
      </div>
    </div>
  );
};

export default NewImportRequest;
