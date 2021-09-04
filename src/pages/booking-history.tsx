import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { Layout, Loading } from 'components/common';
import {
  BookingInfo,
  BriefInfo,
  CustomerInfo,
} from 'components/section/booking-history';
import { IBookingInfo, IOrderInfo } from 'interfaces/booking.interface';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { ENDPOINT_URL } from 'constants/api.const';
import { GET } from 'utils/fetcher.utils';
import { formatDateString } from 'utils/datetime.utils';

export default function BookingHistory(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.split('/');
  const [bookingDetail, setBookingDetail] = useState<IBookingInfo>();
  const [customerInfo, setCustomerInfo] = useState<IUserInfo>();
  const [room, setRoom] = useState<IRoomDetail>();
  const [loading, setLoading] = useState(false);

  async function fetchRoom(id: string) {
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getRoomsByID(id));
      if (response.data.valid) {
        setRoom(response.data.room);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchOrder() {
    try {
      setLoading(true);
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
          price: order.price,
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
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <Layout>
      {!loading && bookingDetail && customerInfo && room ? (
        <div className="flex flex-wrap-reverse justify-between w-full">
          {/* edit data */}
          <div className="w-full lg:w-1/3 flex flex-col justify-between">
            <BookingInfo bookingDetail={bookingDetail} />
            <CustomerInfo
              customerInfo={customerInfo}
              bookingInfo={bookingDetail}
            />
          </div>

          {/* confirm data */}
          <div className="w-full lg:w-2/3 flex justify-center lg:justify-end">
            <BriefInfo
              customerInfo={customerInfo}
              bookingDetail={bookingDetail}
              room={room}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
