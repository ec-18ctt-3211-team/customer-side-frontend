import { IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';

interface Props {
  customerInfo: IUserInfo;
  bookingInfo: IBookingInfo;
}

export default function CustomerInfo(props: Props): JSX.Element {
  return (
    <div className="font-medium uppercase">
      <div className="py-3 font-bold text-lg text-brown">
        Customer information
      </div>
      <div className="p-4 flex">
        <div className="pb-2 w-full">Customer name: </div>
        <div className="border-b-2 w-full text-right">
          {props.customerInfo.username}
        </div>
      </div>
      <div className="p-4 flex">
        <div className="pb-2 w-full">Phone number: </div>
        <div className="border-b-2 w-full text-right">
          {props.customerInfo.phone_number}
        </div>
      </div>
      <div className="p-4 flex">
        <div className="pb-2 w-full">Email: </div>
        <div className="border-b-2 w-full text-right">
          {props.customerInfo.email}
        </div>
      </div>
      <div className="p-4 flex">
        <div className="pb-2 w-full">Payment Method: </div>
        <div className="border-b-2 w-full text-right">
          {props.bookingInfo.payment_method}
        </div>
      </div>
    </div>
  );
}
