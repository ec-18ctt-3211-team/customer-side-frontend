import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout, Loading, Pagination, Popup } from 'components/common';
import { Filterbar, RoomCard } from 'components/section/list_of_rooms';
import { IRoomDetail, IResponse, SortType } from 'interfaces/room.interface';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

const LIMIT = 20;

export default function ListOfRooms(): JSX.Element {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const [listOfRooms, setListOfRooms] = useState<IRoomDetail[]>();
  const [totalResult, setTotalResult] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sorting, setSorting] = useState<SortType>();
  const [loading, setLoading] = useState(false);

  async function fetchRooms() {
    try {
      setLoading(true);
      const path = location.pathname.split('/');
      const city = path[path.length - 1];
      const response = await GET(
        ENDPOINT_URL.GET.getRoomsByCity(
          LIMIT,
          currentPage + 1,
          sorting,
          city.includes('type') ? undefined : city,
          city.includes('type') ? city : undefined,
        ),
      );
      const data: IResponse = response.data;
      if (data.valid) {
        const numberOfPages = Math.floor(data.rooms.length / LIMIT);

        setListOfRooms(data.rooms);
        setTotalPages(
          data.rooms.length % LIMIT === 0 ? numberOfPages : numberOfPages + 1,
        );
        setTotalResult(data.total);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRooms();
  }, [currentPage, sorting, location.pathname]);

  return (
    <Layout allowSearch>
      {listOfRooms && !loading ? (
        <div className="flex flex-col min-h-[80vh]">
          <Filterbar
            total_result={totalResult}
            sorting={sorting}
            setSorting={setSorting}
          />
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
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
