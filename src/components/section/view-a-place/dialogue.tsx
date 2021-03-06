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
    <div className="border rounded-md w-full min-h-[350px] flex flex-col justify-between px-2 py-8">
      <div className="w-full py-2 text-center">${total} / night</div>
      <div className="md:px-4 flex flex-wrap justify-around items-center">
        <div className="py-2 w-28">From date:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col items-center md:items-end">
          <DatePicker
            placeholderText="Enter start date"
            selected={dayStart}
            dateFormat="dd/MM/yyyy"
            minDate={today}
            excludeDates={bookedDate ?? []}
            onChange={(date: Date) => setStart(date)}
            className="border outline-none py-1 rounded text-center"
          />
        </div>
      </div>
      <div className="md:px-4 flex flex-wrap justify-around items-center">
        <div className="py-2 w-28">To date:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col  items-center md:items-end">
          <DatePicker
            placeholderText="Enter end date"
            selected={dayEnd}
            dateFormat="dd/MM/yyyy"
            minDate={dayStart}
            excludeDates={bookedDate ?? []}
            onChange={(date: Date) => setEnd(date)}
            className="border outline-none py-1 rounded text-center"
          />
        </div>
      </div>
      <div className="py-2">
        <InputGuests
          totalAdults={totalAdults}
          setTotalAdults={setTotalAdults}
          totalKids={totalKids}
          setTotalKids={setTotalKids}
        />
      </div>
      <div className="flex justify-center h-1/5">
        <Link
          to={SITE_PAGES.CONFIRM_BOOKING.path + `/${props.roomDetails._id}`}
          className="w-full md:w-2/3 px-6 py-2"
        >
          <Button>Book now</Button>
        </Link>
      </div>
    </div>
  );
}
