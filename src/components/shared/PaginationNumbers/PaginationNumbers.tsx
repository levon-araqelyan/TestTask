import React, { memo } from "react";
import { Pagination } from "react-bootstrap";
import cn from "classnames";

import styles from "./PaginationNumbers.module.scss";

type UiPaginationType = {
  changePageRequest: (index: number) => void;
  totalAmount: number;
  currentPage: number;
  className?: string;
};

const PaginationNumbers: React.FC<UiPaginationType> = ({
  changePageRequest,
  totalAmount,
  currentPage,
  className
}) => {
  const changePage = ({ currentTarget: { id: newPage } }: any): void => {
    if (+newPage !== currentPage - 1) {
      changePageRequest(+newPage);
    }
  };

  const numbersWithJumps = (): React.ReactNode => (
    <>
      {currentPage > 1 && (
        <Pagination.Item
          id={"0"}
          onClick={changePage}
          className={styles.pageNumbers}
        >
          1
        </Pagination.Item>
      )}
      {currentPage > 3 && (
        <Pagination.Ellipsis
          id={String(currentPage - 3)}
          onClick={changePage}
          className={styles.pageNumbers}
        />
      )}
      {currentPage >= 3 && (
        <Pagination.Item
          id={String(currentPage - 2)}
          onClick={changePage}
          className={styles.pageNumbers}
        >
          {currentPage - 1}
        </Pagination.Item>
      )}
      <Pagination.Item
        id={String(currentPage - 1)}
        onClick={changePage}
        className={cn(styles.pageNumbers, styles.selectedPage)}
      >
        {currentPage}
      </Pagination.Item>
      {totalAmount - currentPage >= 1 && (
        <Pagination.Item
          id={String(currentPage)}
          onClick={changePage}
          className={styles.pageNumbers}
        >
          {currentPage + 1}
        </Pagination.Item>
      )}
      {totalAmount - currentPage > 2 && (
        <Pagination.Ellipsis
          id={String(currentPage + 1)}
          onClick={changePage}
          className={styles.pageNumbers}
        />
      )}
      {currentPage < totalAmount - 1 && (
        <Pagination.Item
          id={String(totalAmount - 1)}
          onClick={changePage}
          className={styles.pageNumbers}
        >
          {totalAmount}
        </Pagination.Item>
      )}
    </>
  );

  const paginationButtons = (): React.ReactNode => {
    if (totalAmount >= 7) {
      return numbersWithJumps();
    }
    const newPages = [];

    for (let i = 1; i <= totalAmount; i++) {
      newPages.push(i);
    }

    return newPages.map(pageNumber => (
      <Pagination.Item
        id={String(pageNumber - 1)}
        onClick={changePage}
        className={cn(styles.pageNumbers, {
          [styles.selectedPage]: pageNumber === currentPage
        })}
        key={pageNumber}
      >
        {pageNumber}
      </Pagination.Item>
    ));
  };

  return (
    <Pagination>
      {totalAmount > 1 && (
        <div className={cn(styles.paginationWrap, className)}>
          <Pagination.Prev
            className={styles.arrows}
            id={String(currentPage - 2)}
            disabled={currentPage <= 1}
            onClick={changePage}
          />
          {paginationButtons()}
          <Pagination.Next
            className={styles.arrows}
            id={String(currentPage)}
            disabled={totalAmount === currentPage}
            onClick={changePage}
          />
        </div>
      )}
    </Pagination>
  );
};

export default memo(PaginationNumbers);
