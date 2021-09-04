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
import { IRoomDetail } from 'interfaces/room.interface';
import { GET } from 'utils/fetcher.utils';
import { formatDateString } from 'utils/datetime.utils';
import { ENDPOINT_URL } from 'constants/api.const';

export default function ConfirmBooking(): JSX.Element {
  const location = useLocation();
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>(
    getBookingDetails(),
  );
  const [customerInfo, setCustomerInfo] = useState<IUserInfo>(defaultCustomer);
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();
  const [loading, setLoading] = useState(false);

  async function fetchRoom() {
    try {
      setLoading(true);
      const path = location.pathname.split('/');
      const roomID = path[path.length - 1];
      const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
      if (response.data.valid) setRoomDetails(response.data.room);
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUser() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(userID));
      if (response.data.valid) {
        setCustomerInfo(response.data.customer);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function getBookingDetails(): IBookingInfo {
    const storage = localStorage.getItem('bookingDetails');
    let data;
    if (storage) data = JSON.parse(storage);
    return {
      totalAdults: data.totalAdults,
      totalKids: data.totalKids,
      fromDate: formatDateString(data.fromDate),
      toDate: formatDateString(data.toDate),
      payment_method: data.payment_method ?? 'paypal',
    };
  }

  useEffect(() => {
    fetchUser();
    fetchRoom();
  }, []);

  return (
    <Layout>
      {!loading && roomDetails ? (
        <div className="flex flex-wrap-reverse justify-between w-full">
          {/* edit data */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
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
          <div className="w-full lg:w-2/3 flex justify-center lg:justify-end">
            <ReviewInfo
              bookingDetail={bookingDetail}
              customerInfo={customerInfo}
              room={roomDetails}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
