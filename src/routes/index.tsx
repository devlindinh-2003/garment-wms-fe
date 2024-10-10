import ProductionStaffLayout from '@/layouts/ProductionStaffLayout';
import PurchaseStaffLayout from '@/layouts/PurchaseStaffLayout';
import WarehouseManagerLayout from '@/layouts/WarehouseManagerLayout';
import WarehouseStaffLayout from '@/layouts/WarehouseStaffLayout';
import Home from '@/pages/home';
import TestPage from '@/pages/test';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import ProductionStaffRoute from './ProductionStaffRoute';
import PurchaseStaffRoute from './PurchaseStaffRoute';
import WarehouseManagerRoute from './WarehouseManagerRoute';
import WarehouseStaffRoute from './WarehouseStaffRoute';

import Loading from '@/components/common/Loading';
import ImportRequestManagement from '@/pages/ImportRequests/management';
import ViewImportRequest from '@/pages/ImportRequests/view';
import Demo from '@/pages/demo';
import CreateImportRequest from '@/pages/ImportRequests/create';
import CreateImportRequestMenu from '@/pages/ImportRequests/menu';

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
              path: '/purchase-staff/import-request/create/material',
              element: <CreateImportRequest />
            },
            {
              path: '/purchase-staff/import-request/create',
              element: <CreateImportRequestMenu />
            },
            {
              path: '/purchase-staff/import-request/:id',
              element: <ViewImportRequest/>,
            },
            {
              path: '/purchase-staff/import-request',
              element: <ImportRequestManagement/>,
            },
            {
              path: '/purchase-staff/home',
              element: <Home />
            }
          ],
        },
      ],
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
    }

    // { path: '*', element: <ErrorPage /> },
  ]);
  return <RouterProvider fallbackElement={<Loading />} router={router} />;
};
export default RouterComponent;
