import { useEffect, useState } from 'react';
import { Pagination } from 'components/common';
import { IOrderInfo, OrderStatusLabels } from 'interfaces/booking.interface';
import { Link } from 'react-router-dom';
import { SITE_PAGES } from 'constants/pages.const';

interface Props {
  booking_history: IOrderInfo[];
  items_per_pages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  maxPage: number;
}

export default function BookingTable(props: Props) {
  const [render, setRender] = useState(renderTable());

  function renderTable() {
    return (
      <tbody className="text-center">
        {props.booking_history.map((item, index) => {
          return (
            <tr
              key={item._id}
              className={[
                (index > 0 && index % (props.items_per_pages - 1) === 0) ||
                index === props.booking_history.length - 1
                  ? ''
                  : 'border-b-2 border-brown-500 ',
              ].join(' ')}
            >
              <td className="border-r-2 border-brown-500 py-4">{index + 1}</td>
              <td className="border-r-2 border-brown-500 py-4">
                <Link
                  to={`${SITE_PAGES.BOOKING_HISTORY.path}/${item._id}`}
                  className="italic hover:text-brown-400 hover:underline"
                >
                  View
                </Link>
              </td>
              <td
                className={[
                  'py-4 capitalize',
                  OrderStatusLabels[item.status].color,
                ].join(' ')}
              >
                {OrderStatusLabels[item.status].label}
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  }

  useEffect(() => {
    setRender(renderTable());
  }, [props.currentPage, props.booking_history]);

  return (
    <div className="bg-white rounded-xl shadow-lg w-full flex flex-col items-center p-6">
      <div className="uppercase font-bold text-brown text-xl pb-8">
        Booking history
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr className="border-b-2 border-brown-500 uppercase bg-brown-100">
            <th className="border-r-2 border-brown-500 py-6">No.</th>
            <th className="border-r-2 border-brown-500 py-6">
              Booking details
            </th>
            <th className="py-6">Status</th>
          </tr>
        </thead>
        {render}
      </table>

      <div className="mt-auto">
        <Pagination
          currentPage={props.currentPage}
          setCurrentPage={props.setCurrentPage}
          maxPage={props.maxPage}
        />
      </div>
    </div>
  );
}
