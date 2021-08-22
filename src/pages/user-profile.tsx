import { useState, useEffect } from 'react';
import { Layout, DivPx, Form, Loading } from 'components/common';
import { BookingTable } from 'components/section/user-profile';
import { IUserInfo } from 'interfaces/user.interface';
import { IOrderInfo } from 'interfaces/booking.interface';
import { GET, PUT } from 'utils/fetcher.utils';
import { ENDPOINT_URL } from 'constants/api.const';

const itemsPerPage = 6;

export default function UserProfile(): JSX.Element {
  const [userInfo, setUserInfo] = useState<IUserInfo>();
  const [bookingHistory, setBookingHistory] = useState<IOrderInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState(1);

  async function fetchUserInfo() {
    const userID = localStorage.getItem('userID');
    if (!userID) return;
    try {
      setLoading(true);
      const response = await GET(ENDPOINT_URL.GET.getCustomerByID(userID));
      if (response.data.valid) {
        setUserInfo(response.data.customer);
      }
    } catch (error) {
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile() {
    if (!userInfo) return;
    try {
      setLoading(true);
      const payload = {
        email: userInfo.email,
        name: userInfo.name,
        password: userInfo.password,
        phone: userInfo.phone,
      };
      const response = await PUT(
        ENDPOINT_URL.PUT.updateCustomerByID(userInfo._id),
        payload,
      );
      if (response.data.valid) {
        fetchUserInfo();
      }
    } catch (error) {
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
