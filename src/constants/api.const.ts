export const ENDPOINT_URL = {
  GET: {
    getRoomsByCity: (city: string, itemsPerPage: number, pageNumber: number) =>
      `/rooms?city=${city}&limit=${itemsPerPage}&page=${pageNumber}`,
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
