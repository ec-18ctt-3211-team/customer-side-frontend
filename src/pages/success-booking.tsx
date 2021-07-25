import { Layout, Button } from 'components/common';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';

export default function SuccessBooking(): JSX.Element {
  return (
    <Layout allowSearch>
      <div className="w-full flex flex-col items-center justify-center select-none">
        <h1 className="text-success text-4xl font-bold py-4">
          BOOKING SUCCESSFUL
        </h1>
        <p className="text-lg pb-8">THANK YOU FOR USING OUR SERVICE</p>
        <Link
          to={SITE_PAGES.MAIN.path}
          className="flex justify-center items-center w-1/5"
        >
          <Button className="py-4 font-bold">BACK TO MAIN</Button>
        </Link>
      </div>
    </Layout>
  );
}
