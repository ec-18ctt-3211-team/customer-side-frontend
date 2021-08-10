export type PaymentType = 'paypal';

export interface IBookingInfo {
  totalAdults: number;
  totalKids: number;
  fromDate: Date;
  toDate: Date;
  payment_method: PaymentType;
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

export interface ICreateOrder {
  room_id: string;
  host_id: string;
  customer_name: string;
  customer_phone: string;
  email: string;
  num_adult: number;
  num_kid: number;
  created_at: string;
  day_start: string;
  day_end: string;
  status: string;
  customer_id: string | null;
  payment_number?: string;
}
