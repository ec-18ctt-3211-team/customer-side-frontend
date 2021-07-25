import { useState, useEffect } from 'react';
import { Layout, DivPx, Form, Loading } from 'components/common';
import { BookingTable, OrderStatus } from 'components/section/user-profile';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { IBookingTable } from 'interfaces/booking.interface';

export default function UserProfile(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [bookingHistory, setBookingHistory] = useState<IBookingTable[]>([]);

  function getUserInfo() {
    const userID = localStorage.getItem('userID');
    setUserInfo(defaultCustomer);
    setBookingHistory([]);
  }

  function updateProfile() {
    //send new info to DB then fetch info
    getUserInfo();
  }

  useEffect(() => {
    getUserInfo();
  }, [localStorage]);

  return (
    <Layout>
      {userInfo ? (
        <div className="-m-8 p-8 bg-gray-200 w-screen h-screen flex justify-between">
          <div className="w-[450px] h-[500px]">
            <Form
              title="User profile"
              type="profile"
              button={{ label: 'Update', onClick: updateProfile }}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          </div>
          <DivPx size={48} />
          <BookingTable booking_history={bookingHistory} />
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
