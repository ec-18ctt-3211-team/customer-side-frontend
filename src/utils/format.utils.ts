import { IRoomAddress } from 'interfaces/room.interface';
export const getAddressString = (address: IRoomAddress) => {
  return [
    address.number,
    address.street,
    address.ward,
    address.district,
    address.city,
  ].join(' ');
};
