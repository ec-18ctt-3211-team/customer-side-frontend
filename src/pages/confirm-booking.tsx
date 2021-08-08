import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Loading } from 'components/common';
import {
  BookingInfo,
  CustomerInfo,
  ReviewInfo,
} from 'components/section/confirm-booking';
import { IBookingInfo, defaultBooking } from 'interfaces/booking.interface';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString, getDateString } from 'utils/datetime.utils';

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
    // const details = localStorage.getItem('bookingDetails');
    // if (!details) return defaultBooking;
    // try {
    //   const bookingInfo = JSON.parse(details);
    //   return {
    //     ...bookingInfo,
    //     toDate: formatDateString(bookingInfo.toDate),
    //     fromDate: formatDateString(bookingInfo.fromDate),
    //   };
    // } catch (error) {
    //   return defaultBooking;
    // }
    return defaultBooking;
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
          <div className="lg:w-1/3 flex flex-col">
            <BookingInfo
              bookingDetail={bookingDetail}
              setBookingDetail={setBookingDetail}
              roomDetails={roomDetails}
            />
            <div className="mt-auto pt-12">
              <CustomerInfo
                customerInfo={customerInfo}
                setCustomerInfo={setCustomerInfo}
                bookingInfo={bookingDetail}
                setBookingInfo={setBookingDetail}
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
        <Loading />
      )}
    </Layout>
  );
}
