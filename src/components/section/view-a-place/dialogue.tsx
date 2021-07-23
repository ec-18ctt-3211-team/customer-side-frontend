import { SITE_PAGES } from 'constants/pages.const';
import { useEffect, useState } from 'react';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { Link } from 'react-router-dom';
import { Button, InputGuests } from 'components/common';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString } from 'utils/datetime.utils';

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
    formatDateString(date.date).getTime(),
  );
  const [message, setMessage] = useState('');

  useEffect(() => {
    const start = dayStart.getTime();
    const end = dayEnd.getTime();
    if (end - start < 0) return;
    setTotal(
      props.roomDetails.normal_price * Math.round((end - start) / 86400000),
    );
  }, [dayStart, dayEnd]);

  return (
    <div className="border rounded-md w-full h-[350px] flex flex-col justify-between items-center px-8 py-10">
      <div className="w-full">${total} / night</div>
      <div className="flex h-1/5 w-full justify-between items-center">
        <div>from:</div>
        <div className="w-1/3">
          <DatePickerComponent
            placeholder="Enter start date"
            value={dayStart}
            format="dd/MM/yyyy"
            min={today}
            onChange={(data: any) => {
              const date: Date = data.value;
              date.setHours(0, 0, 0, 0);
              if (bookedDate?.includes(date.getTime())) {
                alert('booked');
                return;
              }
              setStart(date);
            }}
          />
        </div>
        <div>to:</div>
        <div className="w-1/3">
          <DatePickerComponent
            placeholder="Enter end date"
            value={dayEnd}
            format="dd/MM/yyyy"
            min={dayStart}
            onChange={(date: any) => setEnd(date.value)}
          />
        </div>
      </div>
      <div className="flex h-1/5 w-full items-center">
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
        className="w-2/3 h-1/5"
      >
        <Button>Book now</Button>
      </Link>
    </div>
  );
}
