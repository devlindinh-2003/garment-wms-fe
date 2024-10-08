import Loading from '@/components/Loading';
import Home from '@/pages/home';
import TestPage from '@/pages/test';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import WarehouseManagerRoute from './WarehouseManagerRoute';
import WarehouseManagerLayout from '@/layouts/WarehouseManagerLayout';
import WarehouseStaffRoute from './WarehouseStaffRoute';
import WarehouseStaffLayout from '@/layouts/WarehouseStaffLayout';
import PurchaseStaffRoute from './PurchaseStaffRoute';
import PurchaseStaffLayout from '@/layouts/PurchaseStaffLayout';
import ProductionStaffRoute from './ProductionStaffRoute';
import ProductionStaffLayout from '@/layouts/ProductionStaffLayout';
import POPreview from '@/pages/poPreview';
import ImportPurchaseOrder from '@/pages/demoPO';
import DeliveryNotesManagement from '@/pages/Delivery Notes/management';
import Demo from '@/pages/demo';
import PurchaseOrderManagement from '@/pages/Purchase Order/management';
import PurchaseOrderPreview from '@/pages/Purchase Order/preview';
import StepperDemo from '@/pages/demoStepper';
import PurchaseOrderDetails from '@/pages/Purchase Order/detail';
import PurchaseOrderDeliveryDetails from '@/pages/Purchase Order Delivery/detail';

const RouterComponent: React.FC = () => {
  const router = createBrowserRouter([
    { path: '/', element: <Navigate to="home" /> },

    {
      path: '/home',
      element: <Home />
    },

    {
      path: '/demo',
      element: <Demo />
    },

    {
      path: '/test',
      element: <TestPage />
    },
    {
      element: <WarehouseManagerRoute />,
      children: [
        {
          element: <WarehouseManagerLayout />,
          children: [
            {
              path: '/warehouse-manager/home',
              element: <Home />
            }
          ]
        }
      ]
    },
    // {
    //   path: '/login',
    //   element: <Login />,
    // },

    {
      path: '/',
      element: <WarehouseStaffRoute />,
      children: [
        {
          element: <WarehouseStaffLayout />,
          children: [
            {
              path: '/warehouse-staff/home',
              element: <Home />
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <PurchaseStaffRoute />,
      children: [
        {
          element: <PurchaseStaffLayout />,
          children: [
            {
              path: '/purchase-staff/home',
              element: <Home />
            }
          ]
        },
        {
          element: <PurchaseStaffLayout />,
          children: [
            {
              path: '/purchase-staff/delivery-note',
              element: <DeliveryNotesManagement />
            },
            {
              path: '/purchase-staff/purchase-order',
              element: <PurchaseOrderManagement />
            },
            {
              path: '/purchase-staff/purchase-order/detail',
              element: <PurchaseOrderDetails />
            },
            {
              path: '/purchase-staff/purchase-order/detail/:id',
              element: <PurchaseOrderDetails />
            },
            {
              path: '/purchase-staff/purchase-order/detail/delivery',
              element: <PurchaseOrderDeliveryDetails />
            }
          ]
        }
      ]
    },
    {
      path: '/',
      element: <ProductionStaffRoute />,
      children: [
        {
          element: <ProductionStaffLayout />,
          children: [
            {
              path: '/production-staff/home',
              element: <Home />
            }
          ]
        }
      ]
    },

    {
      path: '/PODemo',
      element: <ImportPurchaseOrder />
    },

    {
      path: '/popreview',
      element: <POPreview />
    },

    {
      path: '/stepperdemo',
      element: <StepperDemo />
    }

    // { path: '*', element: <ErrorPage /> },
  ]);
  return <RouterProvider fallbackElement={<Loading />} router={router} />;
};
export default RouterComponent;
