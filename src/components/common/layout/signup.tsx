import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { NavbarStatus } from './navbar';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  setShow: (isShow: NavbarStatus) => void;
}

export default function Signup(props: Props): JSX.Element {
  const { userInfo, setUserInfo, setShow } = props;

  async function signup() {
    if (!userInfo.password) return;
    const payload = {
      email: userInfo.email,
      name: userInfo.name,
      password: userInfo.password,
      phone: userInfo.phone,
    };
    setShow('loading');
    const response = await POST(ENDPOINT_URL.POST.register, payload);
    if (response.data.valid) setShow('login');
    else alert(response.data.message);
  }

  return (
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
  );
}
