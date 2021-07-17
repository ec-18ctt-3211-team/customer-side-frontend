export interface IUserInfo {
  userID: string;
  username: string;
  phone_number: string;
  email: string;
  new_password?: string;
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
