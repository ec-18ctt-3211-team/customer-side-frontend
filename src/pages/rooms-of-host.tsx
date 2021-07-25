import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RoomCard } from 'components/section/list_of_rooms';
import { Pagination, Layout, Loading } from 'components/common';
import { ROOMS } from 'constants/images.const';
import { IHostDetail } from 'interfaces/host.interface';
import { IRoomDetail } from 'interfaces/room.interface';

export default function RoomsOfHost(): JSX.Element {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [hostInfo, setHostInfo] = useState<IHostDetail>();
  const [rooms, setRooms] = useState<IRoomDetail[]>();

  function getData() {
    const path = location.pathname.split('/');
    const hostID = path[path.length - 1];
    setHostInfo({ _id: hostID, host_name: 'Luxury house' });
    setRooms([]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout allowSearch>
      {hostInfo && rooms ? (
        <div className="flex flex-col min-h-[80vh]">
          <div className="flex">
            <div className="w-52 h-60 mx-2 my-4 text-sm bg-gray-200 rounded-xl flex flex-col hover:shadow-lg relative">
              <img
                src={ROOMS[0].path}
                className="w-full rounded-xl shadow bg-brown-200 object-cover"
              />
              <div className="font-bold py-1 text-center">
                {hostInfo.host_name}
              </div>
            </div>
            <div className="flex flex-wrap w-full justify-evenly">
              {rooms.map((room, index) => {
                return <RoomCard detail={room} key={index} />;
              })}
            </div>
          </div>
          <div className="mt-auto">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxPage={16}
            />
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
