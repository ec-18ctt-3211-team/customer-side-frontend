import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Loading } from 'components/common';
import {
  BookingInfo,
  CustomerInfo,
  ReviewInfo,
} from 'components/section/confirm-booking';
import { IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString } from 'utils/datetime.utils';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function ConfirmBooking(): JSX.Element {
  const location = useLocation();
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>(
    getBookingDetails(),
  );
  const [customerInfo, setCustomerInfo] = useState<IUserInfo>(defaultCustomer);
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();

  async function fetchRoom() {
    const path = location.pathname.split('/');
    const roomID = path[path.length - 1];
    const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
    setRoomDetails(response.data.room);
  }

  function fetchUser() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    //fetch user info
  }

  function getBookingDetails(): IBookingInfo {
    const storage = localStorage.getItem('bookingDetails');
    let data;
    if (storage) data = JSON.parse(storage);
    return {
      totalAdults: data.totalAdults ?? 1,
      totalKids: data.totalKids ?? 0,
      fromDate: formatDateString(data.fromDate) ?? today,
      toDate: formatDateString(data.toDate) ?? tomorrow,
      payment_method: data.payment_method ?? 'paypal',
    };
  }

  useEffect(() => {
    fetchUser();
    fetchRoom();
  }, []);

  return (
    <Layout>
      {roomDetails ? (
        <div className="flex justify-between w-full">
          {/* edit data */}
          <div className="lg:w-1/3 h-full flex flex-col">
            <BookingInfo
              bookingDetail={bookingDetail}
              setBookingDetail={setBookingDetail}
              roomDetails={roomDetails}
            />
            <CustomerInfo
              customerInfo={customerInfo}
              setCustomerInfo={setCustomerInfo}
            />
          </div>

          {/* confirm data */}
          <ReviewInfo
            bookingDetail={bookingDetail}
            customer={customerInfo}
            room={roomDetails}
          />
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
