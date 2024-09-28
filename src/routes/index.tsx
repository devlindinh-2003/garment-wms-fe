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
import Demo from '@/pages/demo';

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
    }

    // { path: '*', element: <ErrorPage /> },
  ]);
  return <RouterProvider fallbackElement={<Loading />} router={router} />;
};
export default RouterComponent;
