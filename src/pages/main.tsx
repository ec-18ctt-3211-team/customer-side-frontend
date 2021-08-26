import {
  Layout,
  DivPx,
  ImageSlider,
  ImageTag,
  Loading,
} from 'components/common';
import { ENDPOINT_URL } from 'constants/api.const';
import { SITE_PAGES } from 'constants/pages.const';
import { DefaultCity, ICityInfo } from 'interfaces/city.interface';
import { IImage } from 'interfaces/image.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { useEffect, useState } from 'react';
import { GET } from 'utils/fetcher.utils';

export default function Main(): JSX.Element {
  const [recommended, setRecommended] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);

  const [citylist, setCityList] = useState<ICityInfo[]>([DefaultCity]);
  const [imagelist, setImageList] = useState<IImage[]>([]);

  async function getPinnedCityData(){
    try{
      setLoading(true);
      const response = await GET(
        ENDPOINT_URL.GET.getPinnedCity
      );

      if(response.status == 200){
        if(response.data.valid === false) {
          return;
        }
        setCityList(response.data.cities);
      }
    }
    catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function getImageList(){
    const list : IImage[] = [];
    citylist.map((item, index)=>{
      list.push({ 
        _id: item.id, 
        title: item.titles, 
        path: item.thumnail, 
        href: SITE_PAGES.LIST_OF_ROOMS.path + `/${item.titles.trim().replace(/ /g, '_')}`
      });
    });
    setImageList(list);
  }

  useEffect(() => {
    getPinnedCityData();
  }, []);
  useEffect(() => {
    getImageList();
  }, [citylist]);

  async function getRecommendList() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
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
              href: SITE_PAGES.VIEW_A_PLACE + `/${room._id}`,
            };
          }),
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getRecommendList();
  }, []);

  return (
    <div>
      {!loading ? (
        <Layout allowSearch>
          <ImageTag
            data={{ path: '/images/welcome.jpg', _id: 'welcome' }}
            width={100}
          />
          <DivPx size={32} />
          <div className="px-32 text-lg">Welcome to 3211,</div>
          {!localStorage.getItem('userID') && (
            <div className="px-32 text-lg">
              Please login or sign up to explore more!
            </div>
          )}
          <DivPx size={48} />
          <ImageSlider
            title="SIGNIFICANT PLACES TO STAY"
            limit={5}
            images={imagelist}
            isLink={true}
          />
          <DivPx size={48} />
          {recommended.length > 0 && (
            <ImageSlider
              title="RECOMMENDED By 3211"
              limit={4}
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
