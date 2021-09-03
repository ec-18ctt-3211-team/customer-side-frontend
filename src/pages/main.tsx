import {
  Layout,
  DivPx,
  ImageSlider,
  ImageTag,
  Loading,
} from 'components/common';
import { ENDPOINT_URL } from 'constants/api.const';
import { SITE_PAGES } from 'constants/pages.const';
import { ICityInfo } from 'interfaces/city.interface';
import { IImage } from 'interfaces/image.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { useEffect, useState } from 'react';
import { GET } from 'utils/fetcher.utils';

export default function Main(): JSX.Element {
  const [recommended, setRecommended] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [forceUpdate, setForceUpdate] = useState<boolean>();
  const [userID, setUserID] = useState(localStorage.getItem('userID') ?? null);
  const [cityList, setCityList] = useState<IImage[]>();

  async function getPinnedCityData() {
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getPinnedCity);
      if (response.data.valid) {
        const cities: ICityInfo[] = response.data.cities;
        setCityList(
          cities.map((item) => {
            return {
              _id: item.id,
              title: item.titles,
              path: item.thumnail,
              href: SITE_PAGES.LIST_OF_ROOMS.path + '/' + item.id,
            };
          }),
        );
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getRecommendList() {
    if (!userID) {
      setRecommended([]);
      return;
    }
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getRecommend(userID));
      if (response.data.valid) {
        const data: IRoomDetail[] = response.data.rooms;
        setRecommended(
          data.map((room) => {
            return {
              _id: room._id,
              path: room.thumnail,
              title: room.title,
              href: SITE_PAGES.VIEW_A_PLACE.path + `/${room._id}`,
            };
          }),
        );
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPinnedCityData();
  }, []);

  useEffect(() => {
    const newID = localStorage.getItem('userID') ?? null;
    setUserID(newID);
  }, [forceUpdate]);

  useEffect(() => {
    getRecommendList();
  }, [userID]);

  return (
    <div>
      {!loading && cityList ? (
        <Layout
          allowSearch
          forceUpdate={forceUpdate}
          setForceUpdate={setForceUpdate}
        >
          <ImageTag
            data={{ path: '/images/welcome.jpg', _id: 'welcome' }}
            width={100}
          />
          <DivPx size={32} />
          <div className="px-12 lg:px-32 text-lg">Welcome to 3211,</div>
          {!localStorage.getItem('userID') && (
            <div className="px-12 lg:px-32 text-lg">
              Please login or sign up to explore more!
            </div>
          )}
          <DivPx size={48} />
          <ImageSlider
            title="SIGNIFICANT PLACES TO STAY"
            limit={cityList.length < 5 ? cityList.length : 5}
            images={cityList}
            isLink={true}
          />
          <DivPx size={48} />
          {recommended.length > 0 && (
            <ImageSlider
              title="RECOMMENDED By 3211"
              limit={recommended.length < 4 ? recommended.length : 4}
              images={recommended}
              isLink={true}
            />
          )}
        </Layout>
      ) : (
        <Loading />
      )}
    </div>
  );
}
