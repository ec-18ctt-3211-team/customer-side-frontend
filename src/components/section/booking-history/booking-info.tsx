import { DivPx } from 'components/common';
import { getDateString } from 'utils/datetime.utils';
import { IBookingInfo } from 'interfaces/booking.interface';

interface Props {
  bookingDetail: IBookingInfo;
}

export default function BookingInfo(props: Props): JSX.Element {
  return (
    <div className="uppercase">
      <div className="font-bold uppercase py-3 text-lg text-brown">
        booking information
      </div>
      <div className="px-4 py-2 flex flex-wrap justify-between">
        <div className="py-2">Number of guests: </div>
        <div className="py-2 w-full xl:w-1/3 flex flex-col items-end">
          <div>{props.bookingDetail.totalAdults} Adults</div>
          <DivPx size={12} />
          <div>{props.bookingDetail.totalKids} Kids</div>
        </div>
      </div>
      <div className="px-4 flex flex-wrap justify-between items-center">
        <div className="py-2">from date:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col items-end">
          {getDateString(props.bookingDetail.fromDate)}
        </div>
      </div>
      <div className="px-4 flex flex-wrap justify-between items-center">
        <div className="py-2">to date:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col items-end">
          {getDateString(props.bookingDetail.toDate)}
        </div>
      </div>
    </div>
  );
}
