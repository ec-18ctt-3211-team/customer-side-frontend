import { DivPx, Input } from 'components/common';
import { IUserInfo } from 'interfaces/user.interface';

interface Props {
  customerInfo: IUserInfo;
  setCustomerInfo: (detail: IUserInfo) => void;
}

export default function CustomerInfo(props: Props): JSX.Element {
  return (
    <div className="font-medium uppercase">
      <div className="py-4 font-bold text-lg">Customer information</div>
      <div className="p-4 w-10/12">
        <Input
          border="line"
          type="text"
          value={props.customerInfo.username}
          label={{ value: 'customer name', position: 'top' }}
          onChange={(e) =>
            props.setCustomerInfo({
              ...props.customerInfo,
              username: e.target.value,
            })
          }
        />
        <DivPx size={28} />
        <div className="w-3/4">
          <Input
            border="line"
            type="text"
            value={props.customerInfo.phone_number}
            label={{ value: 'phone number', position: 'top' }}
            onChange={(e) =>
              props.setCustomerInfo({
                ...props.customerInfo,
                phone_number: e.target.value,
              })
            }
          />
        </div>
        <DivPx size={28} />
        <Input
          border="line"
          type="text"
          value={props.customerInfo.email}
          label={{ value: 'email', position: 'top' }}
          onChange={(e) =>
            props.setCustomerInfo({
              ...props.customerInfo,
              email: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
