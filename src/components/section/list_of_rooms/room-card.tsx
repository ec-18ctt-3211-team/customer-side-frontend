import { SITE_PAGES } from 'constants/pages.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { Link } from 'react-router-dom';

interface Props {
  detail: IRoomDetail;
}

const RoomCard = (props: Props): JSX.Element => {
  return (
    <Link
      to={SITE_PAGES.VIEW_A_PLACE.path + `/${props.detail._id}` || '*'}
      className="w-52 h-60 mx-2 my-4 text-sm bg-gray-200 rounded-xl flex flex-col shadow-md hover:shadow-lg relative"
    >
      <img
        src={props.detail.thumnail}
        className={[
          'w-full h-3/5 rounded-t-xl bg-brown-200 object-cover',
          'opacity-80 hover:opacity-100',
        ].join(' ')}
      />
      <div className="w-full py-2 px-3 bg-white rounded-b-xl">
        <div className="font-bold py-1 text-center">{props.detail.title}</div>
        <div className="text-xs italic py-1 text-right">
          {props.detail.max_guest} guest(s)
        </div>
        <div className="text-right py-1">
          ${props.detail.normal_price} /night
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
