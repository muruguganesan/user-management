
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import styles from './pagination.module.css'

const Pagination = ({ currentPage = 1, numberOfPages = 6 }: { currentPage?: number, numberOfPages?: number }) => {
  const leftChevronDisable = currentPage===1;
  const rightChevronDisable = currentPage===numberOfPages;

  return (
    <div className={styles.pagination_wrapper}>
      <button className={`${styles.page_box} ${leftChevronDisable && styles.disable_btn}`} disabled={leftChevronDisable}><ChevronsLeft /></button>
      <button className={`${styles.page_box} ${leftChevronDisable && styles.disable_btn}`} disabled={leftChevronDisable}><ChevronLeft /></button>

      {Array(numberOfPages).fill(null).map((_, index) => <button className={`${styles.page_box} ${currentPage===(index+1) && styles.btn_active}`}>{index + 1}</button>)}

      <button className={`${styles.page_box} ${rightChevronDisable && styles.disable_btn}`} disabled={rightChevronDisable}><ChevronRight /></button>
      <button className={`${styles.page_box} ${rightChevronDisable && styles.disable_btn}`} disabled={rightChevronDisable}><ChevronsRight /></button>
    </div>
  )
}

export default Pagination