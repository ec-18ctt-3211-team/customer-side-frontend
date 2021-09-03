import { IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  bookingDetail: IBookingInfo;
  customerInfo: IUserInfo;
  room: IRoomDetail;
}

export default function BriefInfo(props: Props): JSX.Element {
  return (
    <div className="h-[500px] w-[400px] flex flex-col justify-evenly md:items-center p-8 rounded-xl shadow-lg">
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
        <strong>From: </strong> {getDateString(props.bookingDetail.fromDate)}
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
        <strong>Total:</strong> <div>${props.bookingDetail.price}</div>
      </div>
      <div className="w-full flex justify-between md:justify-evenly">
        <strong>Payment method:</strong>
        <div className="uppercase">{props.bookingDetail.payment_method}</div>
      </div>
    </div>
  );
}
