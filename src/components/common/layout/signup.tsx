import { Popup, Form } from '..';
import { IUserInfo } from 'interfaces/user.interface';
import { POST } from 'utils/fetcher.utils';
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

export default function Signup(props: Props): JSX.Element {
  const { userInfo, setUserInfo, setShow } = props;

  async function signup() {
    if (
      userInfo.email === '' ||
      userInfo.name === '' ||
      userInfo.phone === '' ||
      userInfo.password === ''
    ) {
      props.setMessage('All fields must be filled');
      return;
    }
    if (!userInfo.email.match(emailValidRegex)) {
      props.setMessage('Please input valid email');
      return;
    }
    if (!userInfo.phone.match(/[0-9]/)) {
      props.setMessage('Please input valid phone number');
      return;
    }
    try {
      const payload = {
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
        phone: userInfo.phone,
      };
      setShow('loading');
      const response = await POST(ENDPOINT_URL.POST.register, payload);
      if (response.data.valid) {
        setShow('login');
        props.setMessage('');
      }
    } catch (error) {
      props.setMessage('Unexpected error, please try again!');
      console.log(error);
      setShow('signup');
    }
  }

  return (
    <Popup>
      <div className="w-[350px] h-[450px] flex flex-col bg-white rounded-xl">
        <div
          className="ml-auto flex px-2 py-1 select-none cursor-pointer hover:text-brown-500"
          onClick={() => setShow(null)}
        >
          <Icon icon={Solid.x} className="text-2xl" />
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
          message={props.message}
        />
      </div>
    </Popup>
  );
}
