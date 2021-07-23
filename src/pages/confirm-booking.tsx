import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Popup } from 'components/common';
import {
  BookingInfo,
  CustomerInfo,
  ReviewInfo,
} from 'components/section/confirm-booking';
import { ICustomerInfo, IBookingInfo } from 'interfaces/booking.interface';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';

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
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();

  async function fetchRoom() {
    const path = location.pathname.split('/');
    const roomID = path[path.length - 1];
    const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
    setRoomDetails(response.data.room);
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
    >
      {roomDetails ? (
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
          <ReviewInfo
            bookingDetail={bookingDetail}
            customer={customerInfo}
            room={roomDetails}
          />
        </div>
      ) : (
        <Popup>Loading...</Popup>
      )}
    </Layout>
  );
}
