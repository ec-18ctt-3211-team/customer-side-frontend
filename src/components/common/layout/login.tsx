import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { BASE, POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { NavbarStatus } from './navbar';

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
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };
    setShow('loading');
    try {
      const response = await POST(ENDPOINT_URL.POST.login, payload);
      setUserInfo({
        ...userInfo,
        userID: response.data.userId,
        username: response.data.name,
        ava: BASE + response.data.ava,
      });
      // localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userId);
      localStorage.setItem('username', response.data.name);
      localStorage.setItem('userImg', BASE + response.data.ava);

      setMessage('');
      setShow(null);
    } catch (error: any) {
      setMessage(error.response.data.message);
      console.log(error);
      setShow('login');
    }
  }

  return (
    <Popup>
      <div className="w-[350px] h-[350px] flex flex-col">
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
