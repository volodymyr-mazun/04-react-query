import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.css";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
      forcePage={currentPage - 1}
      containerClassName={styles.pagination}
      activeClassName={styles.active}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      disabledClassName={styles.disabled}
      pageClassName={styles.pageItem}
      pageLinkClassName={styles.pageLink}
    />
  );
};

export default Pagination;
