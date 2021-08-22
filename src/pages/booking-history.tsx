import { useState, useEffect } from 'react';
import { Layout, Loading } from 'components/common';
import {
  BookingInfo,
  BriefInfo,
  CustomerInfo,
} from 'components/section/booking-history';
import { IBookingInfo, IOrderInfo } from 'interfaces/booking.interface';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { useLocation } from 'react-router';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { formatDateString } from 'utils/datetime.utils';

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function BookingHistory(): JSX.Element {
  const location = useLocation();
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>();
  const [customerInfo, setCustomerInfo] = useState<IUserInfo>();
  const [room, setRoom] = useState<IRoomDetail>();

  async function fetchRoom(id: string) {
    try {
      const response = await GET(ENDPOINT_URL.GET.getRoomsByID(id));
      if (response.data.valid) {
        setRoom(response.data.room);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchOrder() {
    try {
      const path = location.pathname.split('/');
      const response = await GET(
        ENDPOINT_URL.GET.getOrderByID(path[path.length - 1]),
      );
      if (response.data.valid) {
        const order = response.data.order as IOrderInfo;
        setBookingDetail({
          totalAdults: order.num_adult,
          totalKids: order.num_kid,
          fromDate: formatDateString(order.day_start),
          toDate: formatDateString(order.day_end),
          payment_method: 'paypal',
        });
        setCustomerInfo({
          ...defaultCustomer,
          name: order.customer_name,
          phone: order.customer_phone,
          email: order.email,
        });
        fetchRoom(order.room_id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

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
