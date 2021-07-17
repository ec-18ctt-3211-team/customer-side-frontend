import { Link, useHistory } from 'react-router-dom';
import { Searchbar, DivPx, Form, Popup } from '..';
import { SITE_PAGES } from 'constants/pages.const';
import { useState } from 'react';
import { IUserInfo } from 'interfaces/user.interface';
import { Icon, logoutOutline } from 'utils/icon.utils';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
  allowSearch?: boolean;
}

export default function Navbar(props: Props): JSX.Element {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState<IUserInfo>({
    userID: '',
    username: '',
    phone_number: '',
    email: '',
  });
  const [isShow, setShow] = useState<'login' | 'signup' | null>(null);

  function signup() {
    setShow(null);
  }

  function login() {
    props.setAuthorized(true);
    setShow(null);
  }

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
          {!props.isAuthorized ? (
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
                {/* <img src="#" alt="user-img" className="w-6 h-6 bg-gray-300 rounded-full" /> */}
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                <span className="px-2">Username</span>
              </Link>
              <span
                className="px-4"
                onClick={() => {
                  props.setAuthorized(false);
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
        <Popup>
          <div className="w-[350px] h-[450px] relative">
            <Form
              title="sign up"
              type="signup"
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              button={{
                label: 'Sign up',
                onClick: signup,
              }}
            />
          </div>
        </Popup>
      )}
      {isShow === 'login' && (
        <Popup>
          <div className="w-[350px] h-[350px] relative">
            <Form
              title="login"
              type="login"
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              button={{
                label: 'login',
                onClick: login,
              }}
              create_an_account={() => setShow('signup')}
            />
          </div>
        </Popup>
      )}
    </div>
  );
}
