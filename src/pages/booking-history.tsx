import { useState, useEffect } from 'react';
import { Layout, Loading } from 'components/common';
import {
  BookingInfo,
  BriefInfo,
  CustomerInfo,
} from 'components/section/booking-history';
import { defaultBooking, IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';

export default function BookingHistory(): JSX.Element {
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>();
  const [customerInfo, setCustomerInfo] = useState<IUserInfo>();
  const [room, setRoom] = useState<IRoomDetail>();

  function getBookingHistory() {
    setBookingDetail(defaultBooking);
    setCustomerInfo(defaultCustomer);
    // setRoom()
  }

  useEffect(() => getBookingHistory(), []);

  return (
    <Layout>
      {bookingDetail && customerInfo && room ? (
        <div className="flex justify-between w-full">
          {/* edit data */}
          <div className="w-1/3 flex flex-col">
            <BookingInfo bookingDetail={bookingDetail} />
            <div className="mt-auto">
              <CustomerInfo
                customerInfo={customerInfo}
                bookingInfo={bookingDetail}
              />
            </div>
          </div>

          {/* confirm data */}
          <BriefInfo
            customerInfo={customerInfo}
            bookingDetail={bookingDetail}
            room={room}
          />
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
