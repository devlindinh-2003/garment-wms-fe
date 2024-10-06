import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getMaterialColumns } from './MaterialColumns';
import DataTable from '@/components/common/EditableTable/DataTable';
import { Button } from '@/components/ui/button';
import { PODeliveryDetail } from '@/types/purchaseOrder';
type Props = {
  data: PODeliveryDetail[] | undefined;
};

const ImportRequestDetails = ({ data }: Props) => {
  console.log(data);
  const [details, setDetails] = useState(data);
  const [isEditDetail, setEditDetail] = useState<Boolean>(false);

  const handleToogleDialog = () => {
    if (isEditDetail) {
      setDetails([...data]);
      setEditDetail(false);
    } else {
      setEditDetail(true);
    }
  };

  const handleSave = () => {
    setEditDetail(false);
  };
  const columns = useMemo(() => getMaterialColumns({}), []);
  return (
    <div className="px-4">
      <div className="flex flex-col gap-4">
        <div className="font-primary font-bold text-xl mb-4">Import Request Details</div>
      </div>

      <div className="flex justify-end mb-4">
        {isEditDetail && (
          <Button className="mr-4" onClick={handleSave}>
            Save
          </Button>
        )}
        <Button onClick={handleToogleDialog}>{isEditDetail ? 'Cancel' : 'Edit'}</Button>
      </div>

      {details && (
        <DataTable data={details} columns={columns} isEdit={isEditDetail} setDetails={setDetails} />
      )}
    </div>
  );
};

export default ImportRequestDetails;
