import { Textarea } from '@/components/ui/Textarea'
import { ImportRequest } from '@/types/ImportRequestType'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ImportRequestDetails from './ImportRequestDetails'
import Process from './Process'
import SupplierWarehouseInfo from './SupplierWarehouseInfo'
import importRequestSelector from '../../slice/selector'


type Props = {}


const ImportRequestSheet = (props: Props) => {
    const  importRequest: ImportRequest  = useSelector(importRequestSelector.importRequest);
    let poDeliveryId = importRequest?.poDelivery?.id
    let purchaseOrder = importRequest?.poDelivery?.purchaseOrder.poNumber
    let planDeliveryDate = importRequest?.poDelivery?.expectedDeliverDate
    let actualDeliveryDate = importRequest?.poDelivery?.deliverDate
    const status = importRequest?.status as string
  return (
    <div className='flex flex-col gap-4 border-2 shadow-sm rounded-xl px-4'>
        <div className='font-primary text-3xl flex justify-center items-center font-bold my-5'>
            Import Request
        </div>

        <div className='flex flex-col gap-4
        md:grid grid-cols-2 w-full'>
            <div className='flex flex-col gap-2'>
                <div className='font-primary font-semibold text-sm'>
                    Purchase Order: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>{purchaseOrder}</Link>
                </div>
                <div className='font-primary font-semibold text-sm'>
                    PO delivery: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>{poDeliveryId?.slice(0,8)}</Link>
                </div>
                {/* <div className='font-primary font-semibold text-sm'>
                    Production plan: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>PL-201</Link>
                </div> */}
            </div>
            <div className='flex flex-col gap-2'>
                <div className='font-primary font-semibold text-sm'>
                    Good Import Type: Material
                </div>
                <div className='font-primary font-semibold text-sm'>
                    Plan Delivery Date: {planDeliveryDate ? new Date(planDeliveryDate).toLocaleDateString() : 'Not yet'}
                </div>
                <div className='font-primary font-semibold text-sm'>
                Actual Delivery Date:  {actualDeliveryDate ? new Date(actualDeliveryDate).toLocaleDateString() : 'Not yet'}
                </div>
            </div>
        </div>
        <div>
            <div className='font-primary font-semibold text-sm'>Note</div>
            <Textarea placeholder='Note' className='w-full h-20 mt-2'/>
        </div>
        <SupplierWarehouseInfo/>
        <Process currentStatus={status}/>
        <ImportRequestDetails/>
    </div>
  )
}

export default ImportRequestSheet