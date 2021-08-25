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
import { useEffect, useState } from 'react';
import { GET } from 'utils/fetcher.utils';

export default function Main(): JSX.Element {
  const [recommended, setRecommended] = useState<IImage[]>([]);
  const [loading, setLoading] = useState(false);

  function getRecommendList() {
    try {
      setLoading(true);
      setRecommended([]);
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
          <ImageSlider
            title="RECOMMENDED By 3211"
            limit={4}
            images={recommended}
            isLink={true}
          />
        </Layout>
      ) : (
        <Loading />
      )}
    </div>
  );
}
