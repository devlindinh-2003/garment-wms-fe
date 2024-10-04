import { BreadcrumbResponsive } from '@/components/common/BreadcrumbReponsive';
import React from 'react';
import ImportRequestSheet from './components/ImportRequestSheet';
import ImportRequestStatus from './components/ImportRequestStatus';
import Disscussion from './components/Disscussion';

type Props = {};

const ViewImportRequest = (props: Props) => {
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border">
      <div className="flex flex-col gap-3 px-4">
        <BreadcrumbResponsive />
        <div className="flex flex-col lg:grid lg:grid-cols-8 gap-4">
          <div className="lg:col-span-6">
            <ImportRequestSheet />
          </div>
          <div className="flex lg:col-span-2">
            <ImportRequestStatus/>
          </div>
          <div className='flex lg:col-span-6'>
            <Disscussion/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImportRequest;
