import { useState, useEffect } from 'react';
import { Layout, DivPx, Form, Loading } from 'components/common';
import { BookingTable } from 'components/section/user-profile';
import { IUserInfo } from 'interfaces/user.interface';
import { IOrderInfo } from 'interfaces/booking.interface';
import { GET, PUT } from 'utils/fetcher.utils';
import { emailValidRegex, ENDPOINT_URL } from 'constants/api.const';

const itemsPerPage = 6;

export default function UserProfile(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [bookingHistory, setBookingHistory] = useState<IOrderInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState(1);
  const [currentProfile, setCurrentProfile] = useState<IUserInfo>();
  const [message, setMessage] = useState('');

  async function fetchUserInfo() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(userID));
      if (response.data.valid) {
        setUserInfo(response.data.customer);
        setCurrentProfile(response.data.customer);
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBookingHistory() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    try {
      setLoading(true);
      const response = await GET(
        ENDPOINT_URL.GET.getOrderByCustomerID(
          userID,
          itemsPerPage,
          currentPage + 1,
        ),
      );
      if (response.data.valid) {
        setBookingHistory(response.data.orders);
        setMaxPage(Math.ceil(response.data.total / itemsPerPage));
      }
    } catch (error) {
      alert('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    if (!userInfo) return;
    if (
      userInfo.email === '' ||
      userInfo.name === '' ||
      userInfo.phone === '' ||
      userInfo.password === ''
    ) {
      setMessage('All fields must be filled');
      return;
    }
    if (!userInfo.email.match(emailValidRegex)) {
      setMessage('Please input valid email');
      return;
    }
    if (!userInfo.phone.match(/[0-9]/)) {
      setMessage('Please input valid phone number');
      return;
    }
    try {
      setLoading(true);
      const payload = {
        ...currentProfile,
        email: userInfo.email !== '' && userInfo.email,
        name: userInfo.name !== '' && userInfo.name,
        password: userInfo.password !== '' && userInfo.password,
        phone: userInfo.phone !== '' && userInfo.phone,
      };
      const response = await PUT(
        ENDPOINT_URL.PUT.updateCustomerByID(userInfo._id),
        payload,
      );
      if (response.data.valid) {
        fetchUserInfo();
      }
    } catch (error) {
      setMessage('Unexpected error, please try again!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUserInfo();
    fetchBookingHistory();
  }, []);

  return (
    <Layout>
      {!loading && userInfo && bookingHistory ? (
        <div className="-m-8 p-8 bg-gray-200 w-screen min-h-screen flex flex-col lg:flex-row justify-between">
          <div className="flex items-center justify-center lg:justify-start lg:items-start">
            <div className="w-[450px] h-[500px]">
              <Form
                title="User profile"
                type="profile"
                button={{ label: 'Update', onClick: updateProfile }}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                message={message}
              />
            </div>
          </div>
          <DivPx size={48} />
          <BookingTable
            booking_history={bookingHistory}
            items_per_pages={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxPage={maxPage}
          />
        </div>
      ) : (
        <Loading />
      )}
    </Layout>
  );
}
