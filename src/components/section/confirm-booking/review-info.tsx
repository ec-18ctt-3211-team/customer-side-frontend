import { Button } from 'components/common';
import { ICustomerInfo, IBookingInfo } from 'interfaces/booking.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  customer: ICustomerInfo;
  bookingDetail: IBookingInfo;
  room: IRoomDetail;
}

export default function ReviewInfo(props: Props): JSX.Element {
  const [price, setPrice] = useState(props.room.price);
  useEffect(() => {
    const start = props.bookingDetail.fromDate.getTime();
    const end = props.bookingDetail.toDate.getTime();
    if (end - start < 0) return;
    setPrice(props.room.price * Math.round((end - start) / 86400000));
  }, [props.bookingDetail, props.room]);

  return (
    <div className="h-[500px] w-[400px] flex flex-col items-center justify-evenly p-8 rounded-xl shadow-lg">
      <div className="font-bold text-xl uppercase">{props.room.room_name}</div>
      <div className="lowercase italic">
        {props.room.room_type} - {props.room.total_bedrooms} bedrooms
      </div>
      <div className="flex justify-evenly w-full">
        <strong>Customer: </strong> {props.customer.customer_name}
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
        <div className="uppercase">{props.customer.payment_method}</div>
      </div>
      <Link to={SITE_PAGES.SUCCESS_BOOKING.path} className="w-2/3 h-12">
        <Button>Confirm</Button>
      </Link>
    </div>
  );
}
