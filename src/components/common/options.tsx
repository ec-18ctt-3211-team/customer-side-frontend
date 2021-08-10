import { useState } from 'react';
import { Icon, downSmallOutline } from 'utils/icon.utils';

interface Props<T> {
  label?: string;
  options: { value: T; label: string }[];
  currentOptions: T;
  setCurrentOptions: (option: T) => void;
}

export default function SelectOptions<T>(props: Props<T>): JSX.Element {
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <div className="select-none cursor-pointer">
      <div className="pb-2">{props.label}</div>
      <div
        onClick={() => setDropdown(!dropdown)}
        className="border-b-2 flex justify-between px-8"
      >
        <div>{props.currentOptions}</div>
        <div className={dropdown ? 'rotate-180' : ''}>
          <Icon icon={downSmallOutline} />
        </div>
      </div>
      {dropdown && (
        <div className="bg-gray-50 text-gray-700 mx-14 my-1 shadow-lg rounded">
          {props.options.map((option, index) => (
            <div
              key={index}
              className={[
                'py-2 text-center',
                index < props.options.length - 1
                  ? 'border-b border-gray-500'
                  : '',
                'hover:text-gray-50 hover:bg-gray-600',
              ].join(' ')}
              onClick={() => {
                props.setCurrentOptions(option.value);
                setDropdown(!dropdown);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
