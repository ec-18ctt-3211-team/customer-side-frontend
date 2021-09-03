import { Layout, Button } from 'components/common';
import { SITE_PAGES } from 'constants/pages.const';
import { useHistory } from 'react-router';

export default function Error(): JSX.Element {
  const history = useHistory();
  return (
    <Layout>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-error text-lg py-4">404: Page not found!</div>
        <div className="w-1/5">
          <Button onClick={() => history.push(SITE_PAGES.MAIN.path)}>
            Back to main
          </Button>
        </div>
      </div>
    </Layout>
  );
}
