export const ENDPOINT_URL = {
  GET: {
    getRoomsByCity: (city: string, itemsPerPage: number, pageNumber: number) =>
      `/rooms?city=${city}&limit=${itemsPerPage}&page=${pageNumber}`,
    getRoomsByID: (id: string) => `/rooms/${id}`,
  },
  POST: {},
};
