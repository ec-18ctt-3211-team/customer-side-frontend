import { Layout, DivPx, ImageSlider, ImageTag } from 'components/common';
import { IMAGES, GIFTS, ROOMS } from 'constants/images.const';

export default function Main(): JSX.Element {
  return (
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
      <ImageSlider title="PREFRENTIAL" limit={3} images={GIFTS} isLink={true} />
      <DivPx size={48} />
      <ImageSlider
        title="RECOMMENDED By 3211"
        limit={4}
        images={ROOMS}
        isLink={true}
      />
    </Layout>
  );
}
