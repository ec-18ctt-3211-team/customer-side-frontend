import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RoomCard } from 'components/section/list_of_rooms';
import { Pagination, Layout, Loading } from 'components/common';
import { IRoomDetail } from 'interfaces/room.interface';
import { IUserInfo } from 'interfaces/user.interface';
import { GET, BASE } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

const itemsPerPage = 10;

export default function RoomsOfHost(): JSX.Element {
  const location = useLocation();
  const path = location.pathname.split('/');
  const hostID = path[path.length - 1];
  const [currentPage, setCurrentPage] = useState(0);
  const [maxPage, setMaxPage] = useState(1);
  const [hostInfo, setHostInfo] = useState<IUserInfo>();
  const [rooms, setRooms] = useState<IRoomDetail[]>();
  const [loading, setLoading] = useState(false);

  async function fetchHost() {
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(hostID));
      if (response.data.valid) {
        setHostInfo(response.data.customer);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRooms() {
    try {
      setLoading(true);
      const response = await GET(
        ENDPOINT_URL.GET.getRoomsByHostID(
          hostID,
          itemsPerPage,
          currentPage + 1,
        ),
      );
      if (response.data.valid) {
        setRooms(response.data.rooms);
        setMaxPage(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchHost();
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  return (
    <Layout allowSearch>
      {!loading && hostInfo && rooms ? (
        <div className="flex flex-col min-h-[80vh]">
          <div className="flex flex-col md:flex-row justify-center">
            <div className="w-full md:w-52 h-36 md:h-60 ml-2 mr-10 my-4 text-sm md:bg-gray-50 md:rounded-xl flex md:flex-col">
              <img
                src={BASE + hostInfo.ava}
                className="w-1/2 md:w-full h-full rounded-xl md:rounded-none md:rounded-t-xl shadow bg-brown-200 object-cover"
              />
              <div className="w-1/2 md:w-full flex flex-col justify-center">
                <div className="font-bold py-1 text-center">
                  {hostInfo.name}
                </div>
                <div className="py-1 text-center">
                  Total rooms: {rooms.length}
                </div>
              </div>
            </div>
            <div className="flex w-full justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {rooms.map((room, index) => {
                  return (
                    <div className="mx-2">
                      <RoomCard detail={room} key={index} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={maxPage}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
