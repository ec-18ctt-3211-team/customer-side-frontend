import { SortType } from 'interfaces/room.interface';
import { useState } from 'react';

interface Props {
  total_result: number;
  sorting: SortType | undefined;
  setSorting: (sort: SortType | undefined) => void;
}

const SortOptions = [
  { value: undefined, label: 'Sort by Price' },
  { value: 'inc', label: 'Ascending' },
  { value: 'dec', label: 'Descending' },
];

export default function FilterBar(props: Props): JSX.Element {
  return (
    <div className="flex flex-wrap items-end justify-center text-center">
      <span className="mr-auto py-2">found {props.total_result} place(s)</span>
      <div className="text-center border rounded-xl flex p-2">
        <select
          className="pr-2 outline-none"
          value={props.sorting}
          onChange={(e) => props.setSorting(e.target.value as SortType)}
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
