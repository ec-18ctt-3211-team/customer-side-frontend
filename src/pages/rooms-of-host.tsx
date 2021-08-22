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

  async function fetchHost() {
    try {
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(hostID));
      if (response.data.valid) {
        setHostInfo(response.data.customer);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchRooms() {
    try {
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
      console.log(error);
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
      {hostInfo && rooms ? (
        <div className="flex flex-col min-h-[80vh]">
          <div className="flex">
            <div className="w-52 h-60 ml-2 mr-10 my-4 text-sm bg-gray-50 rounded-xl flex flex-col relative">
              <img
                src={BASE + hostInfo.ava}
                className="w-full rounded-t-xl shadow bg-brown-200 object-cover"
              />
              <div className="font-bold py-1 text-center">{hostInfo.name}</div>
              <div className="py-1 text-center">
                Total rooms: {rooms.length}
              </div>
            </div>
            <div className="flex flex-wrap w-full">
              {rooms.map((room, index) => {
                return (
                  <div className="mx-2">
                    <RoomCard detail={room} key={index} />
                  </div>
                );
              })}
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
