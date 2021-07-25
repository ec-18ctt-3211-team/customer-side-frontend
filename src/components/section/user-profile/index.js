import BookingTable from './booking-table';

export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};

export { BookingTable };
