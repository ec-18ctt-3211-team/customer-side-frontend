import { IBookingInfo } from 'interfaces/booking.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { getDateString } from 'utils/datetime.utils';

interface Props {
  bookingDetail: IBookingInfo;
  customerInfo: IUserInfo;
  room: IRoomDetail;
}

export default function BriefInfo(props: Props): JSX.Element {
  const price = 0;
  return (
    <div className="h-[500px] w-[400px] flex flex-col items-center justify-evenly p-8 rounded-xl shadow-lg">
      <div className="font-bold text-xl uppercase text-brown-400">
        {props.room.title}
      </div>
      <div className="lowercase italic text-center">
        {props.room.max_guest} guest(s)
      </div>
      <div className="flex justify-evenly w-full">
        <strong>Customer: </strong> {props.customerInfo.username}
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
    </div>
  );
}
