import {
  Layout,
  DivPx,
  ImageSlider,
  ImageTag,
  Loading,
} from 'components/common';
import { ENDPOINT_URL } from 'constants/api.const';
import { IMAGES } from 'constants/images.const';
import { SITE_PAGES } from 'constants/pages.const';
import { IImage } from 'interfaces/image.interface';
import { IRoomDetail } from 'interfaces/room.interface';
import { useEffect, useState } from 'react';
import { GET } from 'utils/fetcher.utils';

export default function Main(): JSX.Element {
  const [recommended, setRecommended] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);

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
            images={IMAGES}
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
