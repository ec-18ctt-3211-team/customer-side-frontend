import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { BASE, POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { NavbarStatus } from './navbar';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  setShow: (isShow: NavbarStatus | null) => void;
}

export default function Login(props: Props): JSX.Element {
  const { userInfo, setUserInfo, setShow } = props;

  async function login() {
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      password: userInfo.password,
    };
    setShow('loading');
    const response = await POST(ENDPOINT_URL.POST.login, payload);
    if (response.data.valid) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userID', response.data.userID);
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
  );
}
