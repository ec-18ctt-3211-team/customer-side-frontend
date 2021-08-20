import { Button, formType, Input } from '.';
import {
  Icon,
  envelopeOutline,
  userSolid,
  phoneOutline,
  passwordOutline,
  paypalSolid,
} from 'utils/icon.utils';
import { useState } from 'react';
import { IUserInfo } from 'interfaces/user.interface';

interface Props {
  title: string;
  type: formType;
  userInfo: IUserInfo;
  setUserInfo: (user: IUserInfo) => void;
  button: { label: string; onClick: () => void };
  create_an_account?: () => void;
  message?: string;
}

export default function Form(props: Props): JSX.Element {
  const [password, setPassword] = useState('');
  const [isMatched, setMatched] = useState<boolean>(true);

  return (
    <div className="bg-white rounded-xl shadow-lg h-full w-full flex flex-col justify-between items-center p-6 select-none">
      <div className="uppercase font-bold text-brown text-xl">
        {props.title}
      </div>
      {props.type === 'profile' && (
        <div className="text-xs pb-3 pt-1">{props.userInfo.userID}</div>
      )}
      {/* email */}
      <div className="py-2 h-full">
        <Input
          border="full"
          type="text"
          placeholder="email"
          icon={{ icon: <Icon icon={envelopeOutline} />, position: 'right' }}
          value={props.userInfo.email}
          onChange={(e) =>
            props.setUserInfo({ ...props.userInfo, email: e.target.value })
          }
        />
      </div>

      {/* full name */}
      {props.type !== 'login' && (
        <div className="py-2 h-full">
          <Input
            border="full"
            type="text"
            placeholder="full name"
            icon={{ icon: <Icon icon={userSolid} />, position: 'right' }}
            value={props.userInfo.username}
            onChange={(e) =>
              props.setUserInfo({
                ...props.userInfo,
                username: e.target.value,
              })
            }
          />
        </div>
      )}

      {/* phoen number */}
      {props.type !== 'login' && (
        <div className="py-2 h-full">
          <Input
            border="full"
            type="text"
            placeholder="phone number"
            icon={{ icon: <Icon icon={phoneOutline} />, position: 'right' }}
            value={props.userInfo.phone_number}
            onChange={(e) =>
              props.setUserInfo({
                ...props.userInfo,
                phone_number: e.target.value,
              })
            }
          />
        </div>
      )}
      
      {props.type === 'profile' && (
        <div className="py-2 h-full">
          <Input
            border="full"
            type="text"
            placeholder="payment number"
            icon={{ icon: <Icon icon={paypalSolid} />, position: 'right' }}
            value={props.userInfo.payment}
            onChange={(e) => {
              props.setUserInfo({
                ...props.userInfo,
                payment: e.target.value,
              });
            }}
          />
        </div>
      )}

      {/* new password */}
      <div className="py-2 h-full">
        <Input
          border="full"
          type="password"
          placeholder="password"
          icon={{ icon: <Icon icon={passwordOutline} />, position: 'right' }}
          value={password}
          onChange={(e) => {
            if (props.type === 'login')
              props.setUserInfo({
                ...props.userInfo,
                password: e.target.value,
              });
            else setPassword(e.target.value);
          }}
        />
      </div>

      {/* confirm password */}
      {props.type !== 'login' && (
        <div className="py-2 h-full">
          <Input
            border="full"
            type="password"
            placeholder="confirm password"
            icon={{ icon: <Icon icon={passwordOutline} />, position: 'right' }}
            onChange={(e) => {
              if (password === e.target.value && password !== '') {
                setMatched(true);
                props.setUserInfo({
                  ...props.userInfo,
                  password: e.target.value,
                });
              } else setMatched(false);
            }}
          />
        </div>
      )}

      {/* button */}
      <div className="py-2 h-full w-full flex justify-center items-center">
        {isMatched ? (
          <Button onClick={props.button.onClick} className="w-2/3 h-full">
            {props.button.label}
          </Button>
        ) : (
          <div className="text-xs text-error">Passwords is not matched</div>
        )}
      </div>

      {props.message && (
        <div className="text-xs text-error">{props.message}</div>
      )}

      {/* create account */}
      {props.type === 'login' && (
        <div className="italic text-center">
          <div className="py-4">or</div>
          <div
            className="underline text-gray-500"
            onClick={() => props.create_an_account && props.create_an_account()}
          >
            create a new account
          </div>
        </div>
      )}
    </div>
  );
}
