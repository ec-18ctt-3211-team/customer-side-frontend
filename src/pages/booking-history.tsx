import { Layout } from 'components/common';
import {
  BookingInfo,
  BriefInfo,
  CustomerInfo,
} from 'components/section/booking-history';
import { ICustomerInfo, IBookingInfo } from 'interfaces/booking.interface';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function BookingHistory(props: Props): JSX.Element {
  const bookingDetail: IBookingInfo = {
    totalAdults: 0,
    totalKids: 0,
    fromDate: new Date(),
    toDate: new Date(),
  };
  const customerInfo: ICustomerInfo = {
    customer_name: 'ly ngoc nhi',
    phone_number: '0123456789',
    email: '123@gmail.com',
    payment_method: 'paypal',
  };

  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
    >
      <div className="flex justify-between w-full">
        {/* edit data */}
        <div className="w-1/3 flex flex-col">
          <BookingInfo bookingDetail={bookingDetail} />
          <div className="mt-auto">
            <CustomerInfo customerInfo={customerInfo} />
          </div>
        </div>

        {/* confirm data */}
        {/* <BriefInfo
          bookingDetail={bookingDetail}
          customer={customerInfo}
          room={ROOMS_DATA[0]}
        /> */}
      </div>
    </Layout>
  );
}
