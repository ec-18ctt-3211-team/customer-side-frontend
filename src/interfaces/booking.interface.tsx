export type PaymentType = 'paypal';

export const OrderStatusLabels = {
  pending: { label: 'pending', color: 'text-gray' },
  accepted: { label: 'accepted', color: 'text-success' },
  rejected: { label: 'rejected', color: 'text-error' },
};

export type OrderStatus = 'pending' | 'accepted' | 'rejected';

export interface IBookingInfo {
  totalAdults: number;
  totalKids: number;
  fromDate: Date;
  toDate: Date;
  payment_method: PaymentType;
  price?: number;
}

export interface IStatus {
  label: string;
  color: string;
}

export interface IOrderInfo {
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
  status: OrderStatus;
  customer_id: string | null;
  payment_number?: string;
  price: number;
  _id?: string;
}
