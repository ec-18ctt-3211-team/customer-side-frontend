import { Link, useHistory } from 'react-router-dom';
import { Searchbar, DivPx, Form, Popup } from '..';
import { SITE_PAGES } from 'constants/pages.const';
import { useState } from 'react';
import { IUserInfo } from 'interfaces/user.interface';
import { Icon, logoutOutline } from 'utils/icon.utils';
import { BASE, POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

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
    password: '',
  });
  const [isShow, setShow] = useState<'login' | 'signup' | 'loading' | null>(
    null,
  );

  async function signup() {
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      name: userInfo.username,
      password: userInfo.password,
      phone: userInfo.phone_number,
    };
    setShow('loading');
    const response = await POST(ENDPOINT_URL.POST.register, payload);
    if (response.data.valid) setShow('login');
    else alert(response.data.message);
  }

  async function login() {
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };
    setShow('loading');
    const response = await POST(ENDPOINT_URL.POST.login, payload);
    if (response.data.valid) {
      props.setAuthorized(true);
      setUserInfo({
        ...userInfo,
        userID: response.data.userID,
        username: response.data.name,
        ava: BASE + response.data.ava,
      });
    } else alert(response.data.message);
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
      {isShow === 'loading' && <Popup>loading...</Popup>}
    </div>
  );
}
