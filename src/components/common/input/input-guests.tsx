import { Icon, addSmallOutline, minusSmallOutline } from 'utils/icon.utils';

interface Props {
  totalAdults: number;
  setTotalAdults: (adults: number) => void;
  totalKids: number;
  setTotalKids: (kids: number) => void;
}

export default function InputGuests(props: Props): JSX.Element {
  const { totalAdults, setTotalAdults, totalKids, setTotalKids } = props;
  return (
    <div className="flex flex-wrap w-full justify-around">
      <div className="flex md:w-2/5 justify-around">
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => totalAdults > 1 && setTotalAdults(totalAdults - 1)}
        >
          <Icon icon={minusSmallOutline} />
        </div>
        <div>{totalAdults} Adults</div>
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => setTotalAdults(totalAdults + 1)}
        >
          <Icon icon={addSmallOutline} />
        </div>
      </div>
      <div className="flex md:w-2/5 justify-around">
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => totalKids > 0 && setTotalKids(totalKids - 1)}
        >
          <Icon icon={minusSmallOutline} />
        </div>
        <div>{totalKids} Kids</div>
        <div
          className={[
            'rounded-full bg-brown-200 text-brown-700',
            'hover:text-brown-100 hover:bg-brown-600',
          ].join(' ')}
          onClick={() => setTotalKids(totalKids + 1)}
        >
          <Icon icon={addSmallOutline} />
        </div>
      </div>
    </div>
  );
}
