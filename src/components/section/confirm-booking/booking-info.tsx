import DatePicker from 'react-datepicker';
import { IBookingInfo, PaymentType } from 'interfaces/booking.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { formatDateString } from 'utils/datetime.utils';
import { DivPx, InputGuests, SelectOption } from 'components/common';

interface Props {
  bookingDetail: IBookingInfo;
  setBookingDetail: (detail: IBookingInfo) => void;
  roomDetails: IRoomDetail;
}

export default function BookingInfo(props: Props): JSX.Element {
  return (
    <div className="uppercase">
      <div className="font-bold uppercase py-3 text-lg text-brown">
        booking information
      </div>
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
      <DivPx size={24} />
      <div className="px-4 flex flex-wrap justify-between items-center">
        <div className="py-2">from:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col items-end">
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
            className="border outline-none py-1 rounded text-center"
          />
        </div>
      </div>
      <div className="px-4 flex flex-wrap justify-between items-center">
        <div className="py-2">to:</div>
        <div className="py-2 w-full md:w-1/3 flex flex-col items-end">
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
            className="border outline-none py-1 rounded text-center"
          />
        </div>
      </div>
      <DivPx size={24} />
      <div className="w-full px-4">
        <SelectOption<PaymentType>
          label="payment method:"
          options={[{ value: 'paypal', label: 'Paypal' }]}
          currentOptions={props.bookingDetail.payment_method}
          setCurrentOptions={(value) =>
            props.setBookingDetail({
              ...props.bookingDetail,
              payment_method: value,
            })
          }
        />
      </div>
    </div>
  );
}
