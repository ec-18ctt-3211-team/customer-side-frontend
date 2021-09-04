import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { BASE, POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL, emailValidRegex } from 'constants/api.const';
import { NavbarStatus } from './navbar';
import { Icon, Solid } from 'utils/icon.utils';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  setShow: (isShow: NavbarStatus | null) => void;
  message: string;
  setMessage: (message: string) => void;
}

export default function Login(props: Props): JSX.Element {
  const { userInfo, setUserInfo, setShow, message, setMessage } = props;

  async function login() {
    if (userInfo.email === '' || userInfo.password === '') {
      props.setMessage('All fields must be filled');
      return;
    }
    if (!userInfo.email.match(emailValidRegex)) {
      props.setMessage('Please input valid email');
      return;
    }
    try {
      setShow('loading');
      const payload = {
        email: userInfo.email,
        password: userInfo.password,
      };
      const response = await POST(ENDPOINT_URL.POST.login, payload);

      if (response.status === 200) {
        setUserInfo({
          ...userInfo,
          _id: response.data.userId,
          name: response.data.name,
          ava: BASE + response.data.ava,
        });
        localStorage.setItem('auth-token', response.headers['auth-token']);
        localStorage.setItem('userID', response.data.userId);
        localStorage.setItem('username', response.data.name);
        localStorage.setItem('userImg', BASE + response.data.ava);

        setMessage('');
        setShow(null);
      }
    } catch (error: any) {
      if (error.response?.data?.message)
        setMessage(error.response.data.message);
      console.log(error);
      setShow('login');
    }
  }

  return (
    <Popup>
      <div className="w-[350px] h-[350px] flex flex-col bg-white rounded-xl">
        <div
          className="ml-auto flex px-2 py-1 select-none cursor-pointer hover:text-brown-500"
          onClick={() => setShow(null)}
        >
          <Icon icon={Solid.x} className="text-2xl" />
        </div>
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
          message={message}
        />
      </div>
    </Popup>
  );
}
