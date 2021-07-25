import { Layout, ImageSlider, DivPx, Popup, Loading } from 'components/common';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RoomDetail, Dialogue } from 'components/section/view-a-place';
import { GET, BASE } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { IHostDetail } from 'interfaces/host.interface';

export default function ViewAPlace(): JSX.Element {
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();
  const [hostDetails, setHostDetails] = useState<IHostDetail>();

  async function fetchRoom() {
    const path = location.pathname.split('/');
    const roomID = path[path.length - 1];
    const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
    setRoomDetails(response.data.room);
    setHostDetails({
      _id: response.data.room.host_id,
      host_name: 'Luxury house',
    });
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <Layout allowSearch>
      {roomDetails && roomDetails.photos && hostDetails ? (
        <div>
          {roomDetails.photos.length > 0 && (
            <ImageSlider
              limit={3}
              images={roomDetails?.photos.map((photo) => {
                return { ...photo, path: BASE + photo.path };
              })}
            />
          )}
          <DivPx size={48} />
          <div className="w-full flex flex-col items-center lg:flex-row">
            <div className="w-11/12 lg:w-3/5">
              <RoomDetail roomDetails={roomDetails} hostDetails={hostDetails} />
            </div>
            <div className="w-2/3 lg:w-2/5">
              <Dialogue roomDetails={roomDetails} />
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
