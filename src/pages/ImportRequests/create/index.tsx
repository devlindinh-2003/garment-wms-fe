import { BreadcrumbResponsive } from '@/components/common/BreadcrumbReponsive';
import NewImportRequest from './components/NewImportRequest';

type Props = {};

const CreateImportRequest = (props: Props) => {
  const breadcrumbItems = [
    { href: '/purchase-staff/import-request', label: 'Import Request' },
    { href: `/purchase-staff/import-request/create}`, label: `Create Import Request` }
  ];
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border ">
      <div className="px-4">
        <BreadcrumbResponsive breadcrumbItems={breadcrumbItems} itemsToDisplay={2} />
      </div>
      <NewImportRequest />
    </div>
  );
};

export default CreateImportRequest;
