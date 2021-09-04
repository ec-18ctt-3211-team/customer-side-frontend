import { Input, Button } from 'components/common';
import { InlineIcon, Outline } from 'utils/icon.utils';
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
      className="px-4 py-2 h-14 flex"
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          const params = new URLSearchParams();
          params.append('type', currentOption);
          params.append('keyword', encodeURI(keyword));
          history.push(`${SITE_PAGES.LIST_OF_ROOMS.path}/${params.toString()}`);
        }
      }}
    >
      <div className="w-1/2 sm:w-2/3">
        <Input
          border="full"
          type="text"
          placeholder="Search"
          classname="shadow-md"
          icon={{
            icon: (
              <InlineIcon
                icon={Outline.search}
                style={{ fontSize: 'inherit' }}
              />
            ),
            position: 'left',
          }}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <select
        className="px-2 outline-none w-1/2 sm:w-1/3"
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
  );
}
