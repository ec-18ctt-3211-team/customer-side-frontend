import { SortType } from 'interfaces/room.interface';

export const ENDPOINT_URL = {
  GET: {
    getRoomsByCity: (
      itemsPerPage: number,
      pageNumber: number,
      sort?: SortType,
      city?: string,
      search?: string,
    ) => {
      const params = new URLSearchParams();
      if (sort) params.append('sort', sort);
      params.append('limit', itemsPerPage.toString());
      params.append('page', pageNumber.toString());
      if (city) {
        params.append('city', city);
        return `/rooms?${params.toString()}`;
      } else {
        return `/rooms?${search}&${params.toString()}`;
      }
    },
    getRoomsByID: (id: string) => `/rooms/${id}`,
    getRoomsByHostID: (
      hostID: string,
      itemsPerPage: number,
      pageNumber: number,
    ) => `/rooms/host/${hostID}?limit=${itemsPerPage}&page=${pageNumber}`,
    getCustomerByID: (id: string) => `/customer/${id}`,
    getOrderByCustomerID: (
      userid: string,
      itemsPerPage: number,
      pageNumber: number,
    ) => `/order/customer/${userid}?limit=${itemsPerPage}&page=${pageNumber}`,
    getOrderByID: (id: string) => `/order/${id}`,
    getPinnedCity: '/city/pinned',
  },
  POST: {
    register: '/auth/register',
    login: '/auth/login',
    createAnOrder: '/order',
  },
  PUT: {
    updateCustomerByID: (id: string) => `/customer/${id}`,
  },
};
