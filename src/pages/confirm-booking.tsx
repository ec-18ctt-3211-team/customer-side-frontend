import React, { useState } from 'react';
import { Layout } from 'components/common';
import {
  BookingInfo,
  CustomerInfo,
  ReviewInfo,
} from 'components/section/confirm-booking';
import { ICustomerInfo, IBookingInfo } from 'interfaces/booking.interface';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function ConfirmBooking(props: Props): JSX.Element {
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>({
    totalAdults: 0,
    totalKids: 0,
    fromDate: today,
    toDate: tomorrow,
  });
  const [customerInfo, setCustomerInfo] = useState<ICustomerInfo>({
    customer_name: 'nhily',
    phone_number: '0123456789',
    email: '123@gmail.com',
    payment_method: 'paypal',
  });

  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
    >
      <div className="flex justify-between w-full">
        {/* edit data */}
        <div className="lg:w-1/3 flex flex-col">
          <BookingInfo
            bookingDetail={bookingDetail}
            setBookingDetail={setBookingDetail}
          />
          <div className="mt-auto pt-12">
            <CustomerInfo
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>
        </div>

        {/* confirm data */}
        {/* <ReviewInfo
          bookingDetail={bookingDetail}
          customer={customerInfo}
          room={ROOMS_DATA[0]}
        /> */}
      </div>
    </Layout>
  );
}
