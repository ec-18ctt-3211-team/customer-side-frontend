import { Layout, ImageSlider, DivPx, Popup, Loading } from 'components/common';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { RoomDetail, Dialogue } from 'components/section/view-a-place';
import { GET } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { IUserInfo } from 'interfaces/user.interface';
import { IRoomDetail } from 'interfaces/room.interface';

export default function ViewAPlace(): JSX.Element {
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState<IRoomDetail>();
  const [hostDetails, setHostDetails] = useState<IUserInfo>();
  const [loading, setLoading] = useState(false);

  async function fetchHost(id: string) {
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(id));
      if (response.data.valid) {
        setHostDetails(response.data.customer);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchRoom() {
    try {
      setLoading(true);
      const path = location.pathname.split('/');
      const roomID = path[path.length - 1];
      const response = await GET(ENDPOINT_URL.GET.getRoomsByID(roomID));
      if (response.data.valid) {
        setRoomDetails(response.data.room);
        fetchHost(response.data.room.host_id);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRoom();
  }, []);

  return (
    <Layout allowSearch>
      {!loading && roomDetails && roomDetails.photos && hostDetails ? (
        <div>
          {roomDetails.photos.length > 0 && (
            <ImageSlider
              limit={3}
              images={roomDetails?.photos.map((photo) => {
                return { ...photo, path: photo.path };
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
