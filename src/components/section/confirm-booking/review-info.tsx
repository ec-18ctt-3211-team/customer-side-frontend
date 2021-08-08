import { Button } from 'components/common';
import { IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';
import { getAddressString } from 'utils/format.utils';
import PayPal from 'components/common/paypal';

interface Props {
  customer: IUserInfo;
  bookingDetail: IBookingInfo;
  room: IRoomDetail;
}

export default function ReviewInfo(props: Props): JSX.Element {
  const history = useHistory();
  const [price, setPrice] = useState(props.room.normal_price);
  const [succeed, setSucceed] = useState<boolean>(false);

  useEffect(() => {
    const start = props.bookingDetail.fromDate.getTime();
    const end = props.bookingDetail.toDate.getTime();
    if (end - start < 0) return;
    setPrice(props.room.normal_price * Math.round((end - start) / 86400000));
  }, [props.bookingDetail, props.room]);

  useEffect(() => {
    if (succeed) history.push(SITE_PAGES.SUCCESS_BOOKING.path);
  }, [succeed]);

  return (
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
          <strong>From:</strong> {getDateString(props.bookingDetail.fromDate)}
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
        <div className="uppercase">{props.bookingDetail.payment_method}</div>
      </div>
      {props.bookingDetail.payment_method === 'paypal' ? (
        <div className="py-4">
          <PayPal amount={price} setSucceed={setSucceed} />
        </div>
      ) : (
        <Button onClick={() => history.push(SITE_PAGES.SUCCESS_BOOKING.path)}>
          Confirm
        </Button>
      )}
    </div>
  );
}
