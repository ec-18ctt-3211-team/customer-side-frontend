import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { Button, InputGuests } from 'components/common';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString, getDateString } from 'utils/datetime.utils';

interface Props {
  roomDetails: IRoomDetail;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export default function Dialogue(props: Props): JSX.Element {
  const [total, setTotal] = useState(props.roomDetails.normal_price);
  const [dayStart, setStart] = useState<Date>(today);
  const [dayEnd, setEnd] = useState<Date>(tomorrow);
  const [totalAdults, setTotalAdults] = useState<number>(1);
  const [totalKids, setTotalKids] = useState<number>(0);
  const bookedDate = props.roomDetails.bookingDates?.map((date) =>
    formatDateString(date.date),
  );

  useEffect(() => {
    if (!dayStart || !dayEnd) {
      setTotal(props.roomDetails.normal_price);
      return;
    }
    const start = dayStart.getTime();
    const end = dayEnd.getTime();
    if (end - start < 0) return;
    setTotal(
      props.roomDetails.normal_price * Math.round((end - start) / 86400000),
    );
  }, [dayStart, dayEnd]);

  useEffect(() => {
    const bookingDetails = {
      totalAdults,
      totalKids,
      fromDate: getDateString(dayStart),
      toDate: getDateString(dayEnd),
      payment_method: 'paypal',
    };
    localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
  }, [dayStart, dayEnd, totalAdults, totalKids]);

  return (
    <div className="border rounded-md w-full h-[350px] flex flex-col justify-between items-center px-2 py-10">
      <div className="w-full px-6">${total} / night</div>
      <div className="flex flex-wrap h-1/5 justify-center items-center">
        <div className="flex items-center justify-center">
          <div className="pr-2">from:</div>
          <DatePicker
            placeholderText="Enter start date"
            selected={dayStart}
            dateFormat="dd/MM/yyyy"
            minDate={today}
            excludeDates={bookedDate ?? []}
            onChange={(date: Date) => setStart(date)}
          />
        </div>
        <div className="flex items-center justify-center">
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
      <div className="flex h-1/5 w-full items-center px-6">
        <div className="pr-3">guests:</div>
        <InputGuests
          totalAdults={totalAdults}
          setTotalAdults={setTotalAdults}
          totalKids={totalKids}
          setTotalKids={setTotalKids}
        />
      </div>
      <Link
        to={SITE_PAGES.CONFIRM_BOOKING.path + `/${props.roomDetails._id}`}
        className="w-2/3 h-1/5 px-6"
      >
        <Button>Book now</Button>
      </Link>
    </div>
  );
}
