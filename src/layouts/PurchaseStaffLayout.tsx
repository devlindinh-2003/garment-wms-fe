import SideBar from '@/components/SideBar'
import { MenuProps } from '@/constants/interface'
import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}
const PurchaseStaffMenu: MenuProps[] = [
  {
    title: 'Home',
    renderIcon: <></>,
    link: '/purchase-staff/home'
  },
  {
    title: 'Purchase Order',
    renderIcon: <></>,
    link: '/purchase-staff/purchase-order'
  },
  {
    title: 'Supplier',
    renderIcon: <></>,
    link: '/purchase-staff/supplier'
  },
  {
    title: 'Product',
    renderIcon: <></>,
    link: '/purchase-staff/product'
  },
  {
    title: 'Report',
    renderIcon: <></>,
    link: '/purchase-staff/report'
  },
]
const PurchaseStaffLayout = (props: Props) => {
  return (
    <div className='flex'>
    <SideBar menu={PurchaseStaffMenu}/>
    <Outlet/>
    </div>
    
  )
}

export default PurchaseStaffLayout