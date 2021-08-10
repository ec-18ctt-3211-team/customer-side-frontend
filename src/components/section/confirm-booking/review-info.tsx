import { Button, Loading } from 'components/common';
import { IBookingInfo, ICreateOrder } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { getAddressString } from 'utils/format.utils';
import PayPal from 'components/common/paypal';
import * as fetch from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

interface Props {
  customer: IUserInfo;
  bookingDetail: IBookingInfo;
  room: IRoomDetail;
}

const emailValidRegex =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function ReviewInfo(props: Props): JSX.Element {
  const history = useHistory();
  const [price, setPrice] = useState(props.room.normal_price);
  const [loading, setLoading] = useState(false);

  function checkInfo() {
    if (
      props.customer.username === '' ||
      props.customer.phone_number === '' ||
      !props.customer.email.match(emailValidRegex)
    )
      return false;
    return true;
  }

  async function createAnOrder(payment_number?: string) {
    try {
      setLoading(true);
      const payload: ICreateOrder = {
        room_id: props.room._id,
        host_id: props.room.host_id,
        customer_name: props.customer.username,
        customer_phone: props.customer.phone_number,
        email: props.customer.email,
        num_adult: props.bookingDetail.totalAdults,
        num_kid: props.bookingDetail.totalKids,
        created_at: getDateString(new Date()),
        day_start: getDateString(props.bookingDetail.fromDate),
        day_end: getDateString(props.bookingDetail.toDate),
        status: 'pending',
        customer_id:
          props.customer.userID !== '' ? props.customer.userID : null,
        payment_number: payment_number,
      };
      const response = await fetch.POST(
        ENDPOINT_URL.POST.createAnOrder,
        payload,
      );
      if (response.data.valid) history.push(SITE_PAGES.SUCCESS_BOOKING.path);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const start = props.bookingDetail.fromDate.getTime();
    const end = props.bookingDetail.toDate.getTime();
    if (end - start < 0) return;
    setPrice(props.room.normal_price * Math.round((end - start) / 86400000));
  }, [props.bookingDetail, props.room]);

  return (
    <div>
      {!loading ? (
        <div className="h-[500px] w-[400px] flex flex-col items-center justify-evenly p-8 rounded-xl shadow-lg">
          <div className="font-bold text-xl uppercase">{props.room.title}</div>
          <div className="lowercase italic text-center">
            {getAddressString(props.room.address)}
          </div>
          <div className="flex justify-evenly w-full">
            <strong>Customer: </strong> {props.customer.username}
          </div>
          <div className="flex justify-between w-full">
            <div>
              <strong>From:</strong>{' '}
              {getDateString(props.bookingDetail.fromDate)}
            </div>
            <div>
              <strong>To:</strong> {getDateString(props.bookingDetail.toDate)}
            </div>
          </div>
          <div className="flex justify-evenly w-3/5">
            <strong>Guests:</strong>
            <div>
              <div>{props.bookingDetail.totalAdults} Adulst</div>
              <div>{props.bookingDetail.totalKids} Kids</div>
            </div>
          </div>
          <div className="flex justify-evenly w-3/5">
            <strong>Total:</strong> <div>${price}</div>
          </div>
          <div className="flex justify-evenly w-full">
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
              Please fill in customer info before continue
            </div>
          )}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
