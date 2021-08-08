import { useState, useEffect } from 'react';
import { DivPx, Input, SelectOption } from 'components/common';
import { IBookingInfo, PaymentType } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';

interface Props {
  customerInfo: IUserInfo;
  setCustomerInfo: (detail: IUserInfo) => void;
  bookingInfo: IBookingInfo;
  setBookingInfo: (detail: IBookingInfo) => void;
}

export default function CustomerInfo(props: Props): JSX.Element {
  const [currentOption, setCurrentOption] = useState(
    props.bookingInfo.payment_method,
  );

  useEffect(() => {
    props.setBookingInfo({
      ...props.bookingInfo,
      payment_method: currentOption,
    });
  }, [currentOption]);

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
        <DivPx size={28} />
        <SelectOption
          label="payment method"
          options={['paypal', 'cash']}
          currentOptions={currentOption}
          setCurrentOptions={(value) => setCurrentOption(value as PaymentType)}
        />
      </div>
    </div>
  );
}
