export interface IUserInfo {
  ava: string;
  is_host: boolean;
  payment_number?: string;
  ci?: string;
  _id: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  __v: number;
}

export const defaultCustomer: IUserInfo = {
  ava: '',
  is_host: false,
  _id: '',
  email: '',
  name: '',
  password: '',
  phone: '',
  __v: 0,
};
