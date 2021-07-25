export interface IBookingInfo {
  totalAdults: number;
  totalKids: number;
  fromDate: Date;
  toDate: Date;
  payment_method: string;
}

export interface IStatus {
  label: string;
  color: string;
}

export interface IBookingTable {
  orderID: string;
  roomID: string;
  order_status: IStatus;
}

const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

export const defaultBooking: IBookingInfo = {
  totalAdults: 0,
  totalKids: 0,
  fromDate: today,
  toDate: tomorrow,
  payment_method: 'paypal',
};
