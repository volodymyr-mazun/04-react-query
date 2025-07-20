
// ----------КОМПОНЕНТ, ЯКИЙ ПРАЦЮЄ ІЗ БІБЛІОТЕКОЮ REACT PAGINATION----------

import styles from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

interface PaginationProps {
  totalPages: number;                   //кількість всіх сторінок
  currentPage: number;                  //номер поточної сторінки
  onPageChange: (page: number) => void; //функція, яка передає номер поточної сторінки
}

export default function Pagination ({ totalPages, currentPage, onPageChange, }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      onPageChange={({ selected }: { selected: number }) =>
        onPageChange(selected + 1)
      }
// ----------Параметри стилю та зовн вигляду----------
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