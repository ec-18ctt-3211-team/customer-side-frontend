import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { POST } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';
import { NavbarStatus } from './navbar';
import { Icon, xSmallSolid } from 'utils/icon.utils';

interface Props {
  userInfo: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  setShow: (isShow: NavbarStatus | null) => void;
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
      <div className="w-[350px] h-[450px] flex flex-col bg-white rounded-xl">
        <div className="ml-auto flex px-2 py-1 select-none cursor-pointer hover:text-brown-500"
          onClick= {(e)=>{
            setShow(null);
          }}>
          <Icon icon={xSmallSolid} className="text-2xl" />
        </div>
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
