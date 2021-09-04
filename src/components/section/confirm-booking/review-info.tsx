import { Button, Loading } from 'components/common';
import { IBookingInfo, IOrderInfo } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import PayPal from 'components/common/paypal';
import * as fetch from 'utils/fetcher.utils';
import { ENDPOINT_URL, emailValidRegex } from 'constants/api.const';
import { Link } from 'react-router-dom';

interface Props {
  customerInfo: IUserInfo;
  bookingDetail: IBookingInfo;
  room: IRoomDetail;
}

export default function ReviewInfo(props: Props): JSX.Element {
  const history = useHistory();
  const [price, setPrice] = useState(props.room.normal_price);
  const [loading, setLoading] = useState(false);

  function checkInfo() {
    if (
      props.customerInfo.name === '' ||
      props.customerInfo.phone === '' ||
      !props.customerInfo.email.match(emailValidRegex) ||
      props.bookingDetail.toDate.getDate() -
        props.bookingDetail.fromDate.getDate() <=
        0
    )
      return false;
    return true;
  }

  async function createAnOrder(payment_number?: string) {
    try {
      setLoading(true);
      const payload: IOrderInfo = {
        room_id: props.room._id,
        host_id: props.room.host_id,
        customer_name: props.customerInfo.name,
        customer_phone: props.customerInfo.phone,
        email: props.customerInfo.email,
        num_adult: props.bookingDetail.totalAdults,
        num_kid: props.bookingDetail.totalKids,
        created_at: getDateString(new Date()),
        day_start: getDateString(props.bookingDetail.fromDate),
        day_end: getDateString(props.bookingDetail.toDate),
        status: 'pending',
        customer_id:
          props.customerInfo._id !== '' ? props.customerInfo._id : null,
        payment_number: payment_number,
        price: price,
      };
      const response = await fetch.POST(
        ENDPOINT_URL.POST.createAnOrder,
        payload,
      );
      if (response.data.valid) history.push(SITE_PAGES.SUCCESS_BOOKING.path);
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const start = props.bookingDetail.fromDate.getTime();
    const end = props.bookingDetail.toDate.getTime();
    if (end - start < 0) setPrice(0);
    else
      setPrice(props.room.normal_price * Math.round((end - start) / 86400000));
  }, [props.bookingDetail, props.room]);

  return (
    <div className="w-[400px]">
      {!loading ? (
        <div className="h-[500px] flex flex-col justify-evenly md:items-center p-8 rounded-xl shadow-lg">
          <Link
            to={SITE_PAGES.VIEW_A_PLACE.path + `/${props.room._id}`}
            className="font-bold text-xl uppercase text-center text-brown-400 hover:text-brown-600 hover:underline"
          >
            {props.room.title}
          </Link>
          <div className="w-full flex justify-between md:justify-evenly">
            <strong>Customer: </strong> {props.customerInfo.name}
          </div>
          <div className="w-full md:w-2/3 flex justify-between md:justify-evenly items-center">
            <strong>From: </strong>{' '}
            {getDateString(props.bookingDetail.fromDate)}
          </div>
          <div className="w-full md:w-2/3 flex justify-between md:justify-evenly items-center">
            <strong>To: </strong> {getDateString(props.bookingDetail.toDate)}
          </div>
          <div className="w-full flex justify-between md:justify-evenly">
            <strong>Guests:</strong>
            <div>
              <div>{props.bookingDetail.totalAdults} Adulst</div>
              <div>{props.bookingDetail.totalKids} Kids</div>
            </div>
          </div>
          <div className="w-full flex justify-between md:justify-evenly">
            <strong>Total:</strong> <div>${price}</div>
          </div>
          <div className="w-full flex justify-between md:justify-evenly">
            <strong>Payment method:</strong>
            <div className="uppercase">
              {props.bookingDetail.payment_method}
            </div>
          </div>
          {checkInfo() && props.bookingDetail.payment_method === 'paypal' ? (
            <div className="py-2">
              <PayPal amount={price} createAnOrder={createAnOrder} />
            </div>
          ) : (
            <div className="text-error font-bold text-sm text-center py-2 px-4">
              Please enter valid information before continue
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
