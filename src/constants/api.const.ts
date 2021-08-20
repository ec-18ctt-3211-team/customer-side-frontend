export const ENDPOINT_URL = {
  GET: {
    getRoomsByCity: (city: string, itemsPerPage: number, pageNumber: number) =>
      `/rooms?city=${city}&limit=${itemsPerPage}&page=${pageNumber}`,
    getRoomsByID: (id: string) => `/rooms/${id}`,
    getCustomerByID: (id: string) => `/customer/${id}`,
    getOrderByCustomerID: (userid: string) => `/order/customer/${userid}`,
  },
  POST: {
    register: '/auth/register',
    login: '/auth/login',
    createAnOrder: '/order',
  },
  PUT: {
    updateCustomerByID: (id: string) => `/customer/${id}`,
  }
};
