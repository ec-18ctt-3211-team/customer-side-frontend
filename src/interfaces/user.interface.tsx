export interface IUserInfo {
  userID: string;
  username: string;
  phone_number: string;
  email: string;
  password?: string;
  ava?: string;
  payment: string;
}

export const defaultCustomer: IUserInfo = {
  userID: '',
  username: '',
  phone_number: '',
  email: '',
  payment: '',
};
