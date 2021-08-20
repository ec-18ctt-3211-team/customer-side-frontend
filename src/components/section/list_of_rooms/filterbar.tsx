import { DivPx } from 'components/common';
import { useState } from 'react';
import { InlineIcon, downSmallOutline } from 'utils/icon.utils';

interface Props {
  location: string;
  total_result: number;
}

const SortOptions = [
  { value: undefined, label: 'Sort by Price' },
  { value: 'ascending', label: 'Ascending' },
  { value: 'descending', label: 'Descending' },
];

export default function FilterBar(props: Props): JSX.Element {
  const [currentOption, setCurrentOption] = useState<string>();
  return (
    <div className="flex flex-wrap items-end justify-center text-center">
      <span className="mr-auto py-2">
        {props.total_result} place(s) in {props.location}
      </span>
      <div className="text-center border rounded-xl flex p-2">
        <select
          className="pr-2 outline-none"
          value={currentOption}
          onChange={(e) => setCurrentOption(e.target.value)}
        >
          {SortOptions.map((option) => (
            <option value={option.value} key={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
