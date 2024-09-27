import SideBar from '@/components/SideBar'
import { MenuProps } from '@/constants/interface'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { FaHome, FaBoxOpen  } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";
import { RiFilePaper2Fill } from "react-icons/ri";
import TopBar from '@/components/TopBar';


type Props = {}
const iconSize = 32;
const PurchaseStaffMenu: MenuProps[] = [
  {
    title: 'Home',
    renderIcon: <FaHome size={iconSize}/>,
    link: '/purchase-staff/home'
  },
  {
    title: 'Purchase Order',
    renderIcon: <FaBoxOpen size={iconSize}/>,
    link: '/purchase-staff/purchase-order'
  },
  {
    title: 'Delivery Note',
    renderIcon: <FaBoxOpen size={iconSize}/>,
    link: '/purchase-staff/delivery-note'
  },
  {
    title: 'Product',
    renderIcon: <GiClothes size={iconSize}/>
    ,
    link: '/purchase-staff/product'
  },
  {
    title: 'Report',
    renderIcon: <RiFilePaper2Fill size={iconSize}/>

    ,
    link: '/purchase-staff/report'
  },
]
const PurchaseStaffLayout = (props: Props) => {
  return (
    <div className='flex'>
    <SideBar menu={PurchaseStaffMenu}/>
    <div className='flex flex-col gap-4 w-full'>
      <TopBar/>
      <Outlet/>
    </div>
    </div>
    
  )
}

export default PurchaseStaffLayout