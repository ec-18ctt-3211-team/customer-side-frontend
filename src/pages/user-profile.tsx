import { useState } from 'react';
import { Layout, DivPx, Form } from 'components/common';
import { BookingTable } from 'components/section/user-profile';

interface Props {
  isAuthorized: boolean;
  setAuthorized: (isAuthorized: boolean) => void;
}

export const OrderStatus = {
  waiting: { label: 'Waiting', color: 'text-gray-400' },
  accepted: { label: 'Accepted', color: 'text-success' },
  done: { label: 'Done', color: 'text-brown-400' },
  denied: { label: 'Denied', color: 'text-error' },
};

export default function UserProfile(props: Props): JSX.Element {
  const [userInfo, setUserInfo] = useState({
    userID: '1234567',
    username: 'nhily',
    phone_number: '0123456789',
    email: 'nhily@gmail.com',
  });

  function updateProfile() {
    console.log('send data to DB for update');
  }

  return (
    <Layout
      isAuthorized={props.isAuthorized}
      setAuthorized={props.setAuthorized}
    >
      <div className="-m-8 p-8 bg-gray-200 w-screen h-screen flex justify-between">
        <div className="w-[450px] h-[500px]">
          <Form
            title="User profile"
            type="profile"
            button={{ label: 'Update', onClick: () => updateProfile() }}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
          />
        </div>
        <DivPx size={48} />
        <BookingTable
          booking_history={[
            { orderID: '#1', roomID: '123', order_status: OrderStatus.waiting },
            { orderID: '#1', roomID: '123', order_status: OrderStatus.waiting },
            {
              orderID: '#1',
              roomID: '123',
              order_status: OrderStatus.accepted,
            },
            { orderID: '#1', roomID: '123', order_status: OrderStatus.denied },
            { orderID: '#1', roomID: '123', order_status: OrderStatus.done },
            { orderID: '#1', roomID: '123', order_status: OrderStatus.denied },
            {
              orderID: '#1',
              roomID: '123',
              order_status: OrderStatus.accepted,
            },
          ]}
        />
      </div>
    </Layout>
  );
}
