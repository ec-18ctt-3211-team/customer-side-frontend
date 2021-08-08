import { useState, useEffect } from 'react';
import { DivPx, InputGuests } from 'components/common';
import DatePicker from 'react-datepicker';
import { defaultBooking, IBookingInfo } from 'interfaces/booking.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString } from 'utils/datetime.utils';

interface Props {
  bookingDetail: IBookingInfo;
  setBookingDetail: (detail: IBookingInfo) => void;
  roomDetails: IRoomDetail;
}

export default function BookingInfo(props: Props): JSX.Element {
  const [totalAdults, setTotalAdults] = useState<number>(
    props.bookingDetail.totalAdults,
  );
  const [totalKids, setTotalKids] = useState<number>(
    props.bookingDetail.totalKids,
  );
  const [dayStart, setStart] = useState<Date>(props.bookingDetail.fromDate);
  const [dayEnd, setEnd] = useState<Date>(props.bookingDetail.toDate);
  const bookedDate = props.roomDetails.bookingDates?.map((date) =>
    formatDateString(date.date),
  );

  useEffect(() => {
    props.setBookingDetail(defaultBooking);
  }, [totalAdults, totalKids, dayStart, dayEnd]);

  return (
    <div className="font-medium uppercase">
      <div className="font-bold py-3 text-lg">booking information</div>
      <div className="p-4">number of guests:</div>
      <InputGuests
        totalAdults={totalAdults}
        setTotalAdults={setTotalAdults}
        totalKids={totalKids}
        setTotalKids={setTotalKids}
      />
      <DivPx size={28} />
      <div className="flex h-1/5 w-full justify-between items-center">
        <div className="pr-2">from:</div>
        <DatePicker
          placeholderText="Enter start date"
          selected={dayStart}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          excludeDates={bookedDate ?? []}
          onChange={(date: Date) => setStart(date)}
        />
        <div className="pr-2">to:</div>
        <DatePicker
          placeholderText="Enter end date"
          selected={dayEnd}
          dateFormat="dd/MM/yyyy"
          minDate={dayStart}
          excludeDates={bookedDate ?? []}
          onChange={(date: Date) => setEnd(date)}
        />
      </div>
    </div>
  );
}
