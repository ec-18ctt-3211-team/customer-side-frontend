import { Input, Button } from 'components/common';
import { InlineIcon, searchOutline } from 'utils/icon.utils';
import { useState } from 'react';
import { useHistory } from 'react-router';
import { SITE_PAGES } from 'constants/pages.const';

const SearchOptions = [
  { value: 'city', label: 'Search by City' },
  { value: 'title', label: 'Search by Room Title' },
];

export default function Searchbar(): JSX.Element {
  const history = useHistory();
  const [currentOption, setCurrentOption] = useState<string>('city');
  const [keyword, setKeyword] = useState<string>('');

  return (
    <div
      className="px-4 py-2 flex w-1/2"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const params = new URLSearchParams();
          params.append('type', currentOption);
          params.append('keyword', encodeURI(keyword));
          history.push(`${SITE_PAGES.LIST_OF_ROOMS.path}/${params.toString()}`);
        }
      }}
    >
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
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <div className="w-2/3 items-end text-center flex p-2">
        <div>
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
