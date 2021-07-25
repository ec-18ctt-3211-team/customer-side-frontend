import { Link, useHistory } from 'react-router-dom';
import { Searchbar, DivPx, Loading } from '..';
import { SITE_PAGES } from 'constants/pages.const';
import { useState, useEffect } from 'react';
import { IUserInfo } from 'interfaces/user.interface';
import { Icon, logoutOutline } from 'utils/icon.utils';
import Signup from './signup';
import Login from './login';

interface Props {
  allowSearch?: boolean;
}

export type NavbarStatus = 'login' | 'signup' | 'loading';

const DefaultInfo = {
  userID: '',
  username: '',
  phone_number: '',
  email: '',
  password: '',
};

export default function Navbar(props: Props): JSX.Element {
  const [isAuthorized, setAuthorized] = useState(checkAuthorized());
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<IUserInfo>(DefaultInfo);
  const [isShow, setShow] = useState<NavbarStatus | null>(null);

  function checkAuthorized() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else return false;
  }

  useEffect(() => {
    setAuthorized(checkAuthorized());
  }, [localStorage]);

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
                {userInfo.ava ? (
                  <img
                    src={userInfo.ava}
                    className="w-6 h-6 bg-gray-300 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                )}
                <span className="px-2">{userInfo.username}</span>
              </Link>
              <span
                className="px-4"
                onClick={() => {
                  setAuthorized(false);
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
        />
      )}
      {isShow === 'loading' && <Loading />}
    </div>
  );
}
