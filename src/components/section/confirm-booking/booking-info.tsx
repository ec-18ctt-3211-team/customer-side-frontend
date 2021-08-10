import DatePicker from 'react-datepicker';
import { IBookingInfo, PaymentType } from 'interfaces/booking.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString } from 'utils/datetime.utils';
import { useState, useEffect } from 'react';
import { DivPx, InputGuests, SelectOption } from 'components/common';

interface Props {
  bookingDetail: IBookingInfo;
  setBookingDetail: (detail: IBookingInfo) => void;
  roomDetails: IRoomDetail;
}

export default function BookingInfo(props: Props): JSX.Element {
  const [payment_method, setPaymentMethod] = useState<PaymentType>(
    props.bookingDetail.payment_method,
  );

  useEffect(() => {
    props.setBookingDetail({
      ...props.bookingDetail,
      payment_method: payment_method,
    });
  }, [payment_method]);

  return (
    <div className="font-medium uppercase">
      <div className="font-bold py-3 text-lg">booking information</div>
      <div className="p-4">number of guests:</div>
      <InputGuests
        totalAdults={props.bookingDetail.totalAdults}
        setTotalAdults={(totalAdults) =>
          props.setBookingDetail({ ...props.bookingDetail, totalAdults })
        }
        totalKids={props.bookingDetail.totalKids}
        setTotalKids={(totalKids) =>
          props.setBookingDetail({ ...props.bookingDetail, totalKids })
        }
      />
      <DivPx size={28} />
      <div className="flex h-1/5 w-full justify-between items-center px-4">
        <div className="pr-2">from:</div>
        <DatePicker
          placeholderText="Enter start date"
          selected={props.bookingDetail.fromDate}
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          excludeDates={
            props.roomDetails.bookingDates?.map((date) =>
              formatDateString(date.date),
            ) ?? []
          }
          onChange={(fromDate: Date) =>
            props.setBookingDetail({ ...props.bookingDetail, fromDate })
          }
          className="border outline-none py-1 px-4 rounded"
        />
        <div className="pr-2 ml-4">to:</div>
        <DatePicker
          placeholderText="Enter end date"
          selected={props.bookingDetail.toDate}
          dateFormat="dd/MM/yyyy"
          minDate={props.bookingDetail.fromDate}
          excludeDates={
            props.roomDetails.bookingDates?.map((date) =>
              formatDateString(date.date),
            ) ?? []
          }
          onChange={(toDate: Date) =>
            props.setBookingDetail({ ...props.bookingDetail, toDate })
          }
          className="border outline-none py-1 px-4 rounded"
        />
      </div>
      <DivPx size={28} />
      <div className="w-2/3 px-4">
        <SelectOption<PaymentType>
          label="payment method"
          options={[{ value: 'paypal', label: 'Paypal' }]}
          currentOptions={payment_method}
          setCurrentOptions={(value) => setPaymentMethod(value)}
        />
      </div>
    </div>
  );
}
