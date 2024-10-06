interface KeyValueDisplayProps {
  name: string;
  value: string;
}

const KeyValueDisplay: React.FC<KeyValueDisplayProps> = ({ name, value }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="">{name}:</span>
      <span className="font-semibold ">{value}</span>
    </div>
  );
};
const OrderToDetails = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-primaryDark">Order By (Your Details)</h1>
        <div className="flex flex-col gap-2">
          <KeyValueDisplay name="Warehouse Name" value="WPS Warehouse" />
          <KeyValueDisplay name="Warehouse Email" value="warehouse@gmail.com" />
          <KeyValueDisplay name="Address" value="297/24B Bui Dinh tuy " />
          <KeyValueDisplay name="Warehouse mobile number" value="+84 838631706" />
          <KeyValueDisplay name="Fax number:" value="+84 838631706" />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold text-primaryDark">Order By (Your Details)</h1>
        <div className="flex flex-col gap-2">
          <KeyValueDisplay name="Warehouse Name" value="WPS Warehouse" />
          <KeyValueDisplay name="Warehouse Email" value="warehouse@gmail.com" />
          <KeyValueDisplay name="Address" value="297/24B Bui Dinh tuy " />
          <KeyValueDisplay name="Warehouse mobile number" value="+84 838631706" />
          <KeyValueDisplay name="Fax number:" value="+84 838631706" />
        </div>
      </div>
    </div>
  );
};

export default OrderToDetails;
