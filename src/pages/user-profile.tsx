import { useState, useEffect } from 'react';
import { Layout, DivPx, Form, Loading } from 'components/common';
import { BookingTable, OrderStatus } from 'components/section/user-profile';
import { IUserInfo, defaultCustomer } from 'interfaces/user.interface';
import { IBookingTable } from 'interfaces/booking.interface';
import { GET, PUT } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

function refreshPage(){
  location.reload();
}

export default function UserProfile(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [bookingHistory, setBookingHistory] = useState<IBookingTable[]>([]);

  async function getUserInfo() {
    const userID = localStorage.getItem('userID');
    if(userID === null) return;
      
    const response = await GET(
      ENDPOINT_URL.GET.getCustomerByID(userID),
    );

    if(response.status == 200){
      if(response.data.valid === false || response.data.customer === null) {
        return;
      }
      setUserInfo({ ...userInfo,
        userID: response.data.customer._id,
        username: response.data.customer.name,
        phone_number: response.data.customer.phone,
        email: response.data.customer.email,
        payment: response.data.customer.payment_number,
      });
    }
  }
  async function getUserBookingHistory() {
    const userID = localStorage.getItem('userID');
    if(userID === null) return;
    const response = await GET(
      ENDPOINT_URL.GET.getOrderByCustomerID(userID),
    );

    if(response.status == 200){
      if(response.data.valid === false) {
        return;
      }
      setBookingHistory(response.data.orders);
      if(bookingHistory === undefined){
        setBookingHistory([]);
      }
    }
  }

  async function updateProfile() {
    //send new info to DB then fetch info
    const userID = localStorage.getItem('userID');
    if(userID === null) return;

    const payload = {
      email: userInfo?.email,
      name: userInfo?.username,
      password: userInfo?.password,
      phone: userInfo?.phone_number,
      payment_number: userInfo?.payment,
    };
    console.log(payload);
    const response = await PUT(
      ENDPOINT_URL.PUT.updateCustomerByID(userID), payload,
    );
    if(response.data.valid){
      window.alert('Edit successfully');
      refreshPage();
    }
    else window.alert('Unsuccess response');

    getUserInfo();
  }

  useEffect(() => {
    getUserInfo();
  }, [localStorage]);
  useEffect(() => {
    getUserBookingHistory(); 
  }, [userInfo]);

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
