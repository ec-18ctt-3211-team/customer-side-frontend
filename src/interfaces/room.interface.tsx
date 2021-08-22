import { IImage } from './image.interface';

export interface IRoomAddress {
  number: string;
  street: string;
  ward: string;
  district: string;
  city: string;
}

export interface IBookingDate {
  date: string;
  room_id: string;
  __id: string;
  _v: number;
}

export interface ISpecialPrice {
  date: string;
  price: number;
  room_id: string;
  __v: number;
  _id: string;
}

export interface IRoomDetail {
  _id: string;
  title: string;
  thumnail: string;
  photos?: IImage[];
  max_guest: number;
  host_id: string;
  address: IRoomAddress;
  description: string;
  normal_price: number;
  weekend_price: number;
  extraPrices?: ISpecialPrice[];
  bookingDates?: IBookingDate[];
  created_at: string;
  deleted_at: null;
  __v: number;
}

export interface IResponse {
  valid: boolean;
  rooms: IRoomDetail[];
  total: number;
}

export type SortType = 'inc' | 'dec';
