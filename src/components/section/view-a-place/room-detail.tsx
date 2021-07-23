import { SITE_PAGES } from 'constants/pages.const';
import { IRoomDetail } from 'interfaces/room.interface';
import { IHostDetail } from 'interfaces/host.interface';
import { Link } from 'react-router-dom';
import { getAddressString } from 'utils/format.utils';

interface Props {
  roomDetails: IRoomDetail;
  hostDetails: IHostDetail;
}

export default function RoomDetail(props: Props): JSX.Element {
  return (
    <div className="w-full px-8 py-2">
      <h1 className="font-bold text-center text-4xl py-2">
        {props.roomDetails.title}
      </h1>
      <div className="flex justify-end underline py-2 select-none">
        <Link
          to={SITE_PAGES.ROOMS_OF_HOST.path}
          className="hover:text-brown-600 hover:italic"
        >
          by {props.hostDetails.host_name}
        </Link>
      </div>
      <div className="py-2 italic">{props.roomDetails.max_guest} guest(s)</div>
      <div className="py-2 font-semibold">
        ${props.roomDetails.normal_price} per night
      </div>
      <div className="py-4 text-right">
        {getAddressString(props.roomDetails.address)}
      </div>
      <div className="py-4">{props.roomDetails.description}</div>
    </div>
  );
}
