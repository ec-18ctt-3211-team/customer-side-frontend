import { Link, useHistory } from 'react-router-dom';
import { Searchbar, DivPx, Loading } from '..';
import { SITE_PAGES } from 'constants/pages.const';
import { useState, useEffect } from 'react';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { Icon, logoutOutline } from 'utils/icon.utils';
import Signup from './signup';
import Login from './login';

interface Props {
  allowSearch?: boolean;
  forceUpdate?: boolean;
  setForceUpdate?: (value: boolean) => void;
}

export type NavbarStatus = 'login' | 'signup' | 'loading';

export default function Navbar(props: Props): JSX.Element {
  const [isAuthorized, setAuthorized] = useState(checkAuthorized());
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<IUserInfo>(defaultCustomer);
  const [isShow, setShow] = useState<NavbarStatus | null>(null);
  const [message, setMessage] = useState<string>('');

  function checkAuthorized() {
    const userID = localStorage.getItem('userID');
    if (userID) {
      return true;
    } else return false;
  }

  useEffect(() => {
    setAuthorized(checkAuthorized());
  }, [userInfo]);

  useEffect(() => {
    if (props.setForceUpdate) {
      props.setForceUpdate(!props.forceUpdate);
    }
  }, [isAuthorized]);

  return (
    <div>
      <div className="flex flex-wrap p-4 w-screen sticky border-b">
        <Link
          to={SITE_PAGES.MAIN.path}
          className="w-10 h-10 px-4 my-2 cursor-pointer rounded-full bg-gray-300"
        ></Link>
        {props.allowSearch && <Searchbar />}
        <div className="py-2 sm:ml-auto flex flex-row-reverse sm:flex-row justify-center cursor-pointer items-center">
          <span className="px-4 hover:text-brown-600">Host</span>
          <DivPx size={8} />
          {!isAuthorized ? (
            <div className="flex">
              <span className="px-4" onClick={() => setShow('signup')}>
                Sign up
              </span>
              <DivPx size={8} />
              <span className="px-4" onClick={() => setShow('login')}>
                Login
              </span>
            </div>
          ) : (
            <div className="flex items-center">
              <Link
                to={SITE_PAGES.USER_PROFILE.path}
                className={[
                  'p-2 flex items-center rounded-3xl',
                  'text-brown-600 bg-brown-100',
                  'hover:text-brown-100 hover:bg-brown-600',
                ].join(' ')}
              >
                {localStorage.getItem('userImg') ? (
                  <img
                    src={localStorage.getItem('userImg') ?? '#'}
                    className="w-6 h-6 bg-gray-300 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                )}
                <span className="px-2">
                  {localStorage.getItem('username') ?? ''}
                </span>
              </Link>
              <span
                className="px-4"
                onClick={() => {
                  setAuthorized(false);
                  localStorage.clear();
                  history.push(SITE_PAGES.MAIN.path);
                }}
              >
                <Icon icon={logoutOutline} />
              </span>
            </div>
          )}
        </div>
      </div>
      {isShow === 'signup' && (
        <Signup
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setShow={setShow}
        />
      )}
      {isShow === 'login' && (
        <Login
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          setShow={setShow}
          message={message}
          setMessage={setMessage}
        />
      )}
      {isShow === 'loading' && <Loading />}
    </div>
  );
}
