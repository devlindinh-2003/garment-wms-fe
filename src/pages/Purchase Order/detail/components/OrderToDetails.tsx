import { Supplier } from '@/types/Supplier';

interface KeyValueDisplayProps {
  name: string;
  value: string;
}
interface OrderToDetailsProps {
  supplier: Supplier;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="">{name}:</span>
      <span className="font-semibold ">{value}</span>
    </div>
  );
};
const OrderToDetails: React.FC<OrderToDetailsProps> = ({ supplier }) => {
  const { supplierName, address, email, phoneNumber, fax } = supplier;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-primaryDark">Order By (Your Details)</h1>
        <div className="flex flex-col gap-2">
          <KeyValueDisplay name="Warehouse Name" value="WPS Warehouse" />
          <KeyValueDisplay name="Warehouse Email" value="warehouse@gmail.com" />
          <KeyValueDisplay name="Warehouse Address" value="297/24B Bui Dinh tuy " />
          <KeyValueDisplay name="Warehouse mobile number" value="+84 838631706" />
          <KeyValueDisplay name=" Warehouse Fax number:" value="+84 838631706" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-primaryDark">Order To (Supplier Details)</h1>

        <div className="flex flex-col gap-2">
          <KeyValueDisplay name="Supplier Name" value={supplierName} />
          <KeyValueDisplay name="Supplier Email" value={email} />
          <KeyValueDisplay name="Supplier Address" value={address} />
          <KeyValueDisplay name="Supplier mobile number" value={phoneNumber} />
          <KeyValueDisplay name="Supplier Fax number:" value={fax} />
        </div>
      </div>
    </div>
  );
};

export default OrderToDetails;
