import React, { useEffect, useState } from 'react';
import { Icon, leftSmallOutline, moreHorizontalSolid } from 'utils/icon.utils';

const LIMIT = 5;

interface Props {
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  minPage?: number;
  maxPage: number;
}

export const PaginationItem = (props: {
  children: React.ReactNode;
  isChosen?: boolean;
  isDisable?: boolean;
  isIcon?: boolean;
}): JSX.Element => {
  return (
    <div
      className={[
        'rounded-full m-1 w-8 h-8 flex justify-center items-center select-none',
        props.isChosen ? 'bg-gray-900 text-white' : '',
        props.isDisable ? 'bg-gray-300 text-gray-600' : '',
        props.isIcon ? 'border' : '',
      ].join(' ')}
    >
      {props.children}
    </div>
  );
};

export const Pagination = (props: Props): JSX.Element => {
  const { minPage = 0, maxPage, currentPage = 0, setCurrentPage } = props;
  const [base, setBase] = useState(0);

  function prevPage() {
    if (currentPage === minPage) return;
    setCurrentPage(currentPage - 1);
  }

  function nextPage() {
    if (currentPage === maxPage - 1) return;
    setCurrentPage(currentPage + 1);
  }

  function renderBaseNumber(base: number): JSX.Element {
    const arr = [];
    arr.length = 5;
    for (let i = 0; i < LIMIT; i++) {
      arr[i] = base * LIMIT + i;
    }

    return (
      <div className="flex">
        {arr.map((page_number) => {
          if (page_number > maxPage - 1) return;
          return (
            <PaginationItem
              isChosen={currentPage === page_number}
              key={page_number}
            >
              <div onClick={() => setCurrentPage(page_number)}>
                {page_number + 1}
              </div>
            </PaginationItem>
          );
        })}
      </div>
    );
  }

  useEffect(() => {
    if (currentPage < minPage || currentPage > maxPage) return;
    setBase(Math.trunc(currentPage / LIMIT));
  }, [currentPage]);

  return (
    <div className="flex justify-center items-center w-full">
      <PaginationItem isDisable={currentPage === minPage} isIcon={true}>
        <div onClick={() => prevPage()}>
          <Icon icon={leftSmallOutline} />
        </div>
      </PaginationItem>

      {currentPage < maxPage && renderBaseNumber(base)}

      {currentPage < maxPage && base < Math.trunc((maxPage - 1) / LIMIT) && (
        <PaginationItem>
          <Icon icon={moreHorizontalSolid} />
        </PaginationItem>
      )}

      {base < Math.trunc((maxPage - 1) / LIMIT) && (
        <PaginationItem isChosen={currentPage === maxPage - 1}>
          <div onClick={() => setCurrentPage(maxPage - 1)}>{maxPage}</div>
        </PaginationItem>
      )}

      <PaginationItem isDisable={currentPage === maxPage - 1} isIcon={true}>
        <div className="rotate-180" onClick={() => nextPage()}>
          <Icon icon={leftSmallOutline} />
        </div>
      </PaginationItem>
    </div>
  );
};
