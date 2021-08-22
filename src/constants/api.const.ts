import { SortType } from 'interfaces/room.interface';

export const ENDPOINT_URL = {
  GET: {
    getRoomsByCity: (
      city: string,
      itemsPerPage: number,
      pageNumber: number,
      sort?: SortType,
      search?: {
        type: 'title' | 'city';
        keyword: string;
      },
    ) => {
      const params = new URLSearchParams();
      params.append('city', city);
      if (search) {
        params.append('type', search.type);
        params.append('keyword', encodeURI(search.keyword));
      }
      if (sort) params.append('sort', sort);
      params.append('limit', itemsPerPage.toString());
      params.append('page', pageNumber.toString());
      return `/rooms?${params.toString()}`;
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
