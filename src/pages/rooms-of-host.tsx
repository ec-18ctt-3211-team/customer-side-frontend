import { useState } from 'react';
import { RoomCard } from 'components/section/list_of_rooms';
import { Pagination, Layout } from 'components/common';
import { ROOMS } from 'constants/images.const';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export default function RoomsOfHost(props: Props): JSX.Element {
  const [currentPage, setCurrentPage] = useState(0);
  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
      allowSearch
    >
      <div className="flex flex-col min-h-[80vh]">
        <div className="flex">
          <div className="w-52 h-60 mx-2 my-4 text-sm bg-gray-200 rounded-xl flex flex-col hover:shadow-lg relative">
            <img
              src={ROOMS[0].path}
              className="w-full rounded-xl shadow bg-brown-200 object-cover"
            />
            {/* <div className="font-bold py-1 text-center">{ROOMS_DATA[0].host}</div> */}
          </div>
          {/* <div className="flex flex-wrap w-full justify-evenly">
          {ROOMS_DATA.map((room, index) => {
            return (
              <RoomCard
                detail={{ ...room, path: SITE_PAGES.VIEW_A_PLACE.path }}
                key={index}
              />
            );
          })}
        </div> */}
        </div>
        <div className="mt-auto">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={16}
          />
        </div>
      </div>
    </Layout>
  );
}
