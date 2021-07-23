import { useState, useEffect } from 'react';
import { Layout, Pagination } from 'components/common';
import { Filterbar, RoomCard } from 'components/section/list_of_rooms';
import { IRoomDetail } from 'interfaces/room.interface';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

const LIMIT = 20;

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function ListOfRooms(props: Props): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  const [listOfRooms, setListOfRooms] = useState<IRoomDetail[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchRooms() {
    const response = await GET(
      ENDPOINT_URL.GET.getRoomsByCity('Ho_Chi_Minh', LIMIT, currentPage + 1),
    );

    const rooms = response.data.rooms;
    const numberOfPages = Math.floor(rooms.length / LIMIT);

    setListOfRooms(rooms);
    setTotalPages(
      rooms.length % LIMIT === 0 ? numberOfPages : numberOfPages + 1,
    );
  }

  useEffect(() => {
    fetchRooms();
  }, [currentPage]);

  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
      allowSearch
    >
      <div className="flex flex-col min-h-[80vh]">
        <Filterbar location="Ho Chi Minh city" total_result={1234} />
        <div className="flex flex-wrap w-full px-6">
          {listOfRooms.map((room, index) => {
            return <RoomCard detail={room} key={index} />;
          })}
        </div>
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={totalPages}
          />
        </div>
      </div>
    </Layout>
  );
}
