import { Textarea } from '@/components/ui/Textarea'
import React from 'react'
import { Link } from 'react-router-dom'
import SupplierWarehouseInfo from './SupplierWarehouseInfo'
import Process from './Process'
import ImportRequestDetails from './ImportRequestDetails'

type Props = {}


const ImportRequestSheet = (props: Props) => {
  return (
    <div className='flex flex-col gap-4 border-2 shadow-sm rounded-xl px-4'>
        <div className='font-primary text-3xl flex justify-center items-center font-bold my-5'>
            Import Request
        </div>

        <div className='flex flex-col gap-4
        md:grid grid-cols-2 w-full'>
            <div className='flex flex-col gap-2'>
                <div className='font-primary font-semibold text-sm'>
                    Purchase Order: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>PO-2021-0001</Link>
                </div>
                <div className='font-primary font-semibold text-sm'>
                    PO delivery: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>POD-210</Link>
                </div>
                <div className='font-primary font-semibold text-sm'>
                    Production plan: <Link to={'/'} className='text-bluePrimary underline underline-offset-2'>PL-201</Link>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <div className='font-primary font-semibold text-sm'>
                    Good Import Type: Material
                </div>
                <div className='font-primary font-semibold text-sm'>
                    Plan Delivery Date: 20/09/2024
                </div>
                <div className='font-primary font-semibold text-sm'>
                Actual Delivery Date: 20/09/2024
                </div>
            </div>
        </div>
        <div>
            <div className='font-primary font-semibold text-sm'>Note</div>
            <Textarea placeholder='Note' className='w-full h-20 mt-2'/>
        </div>
        <SupplierWarehouseInfo/>
        <Process/>
        <ImportRequestDetails/>
    </div>
  )
}

export default ImportRequestSheet