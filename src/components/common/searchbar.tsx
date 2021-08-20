import { Input } from 'components/common';
import { InlineIcon, searchOutline } from 'utils/icon.utils';
import SelectOptions from './options';
import { useState } from 'react';

const SearchOptions = [
  { value: 'city', label: 'Search by City' },
  { value: 'name', label: 'Search by Name' },
];

export default function Searchbar(): JSX.Element {
  const [currentOption, setCurrentOption] = useState<string>('city');
  return (
    <div className="px-4 py-2 flex w-1/2">
      <Input
        border="full"
        type="text"
        placeholder="Search"
        classname="shadow-md"
        icon={{
          icon: (
            <InlineIcon icon={searchOutline} style={{ fontSize: 'inherit' }} />
          ),
          position: 'left',
        }}
      />
      <div className="w-2/3 items-end text-center flex p-2">
        <div className="">
          <select
            className="pr-2 outline-none"
            value={currentOption}
            onChange={(e) => setCurrentOption(e.target.value)}
          >
            {SearchOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
