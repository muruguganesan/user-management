
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import styles from './pagination.module.css'

const Pagination = ({ page = 1, total_pages = 6, handlePage }: { page?: number, total_pages?: number, handlePage: (value:number) => void }) => {
  const leftChevronDisable = page===1;
  const rightChevronDisable = page===total_pages;

  return (
    <div className={styles.pagination_wrapper}>
      <button className={`${styles.page_box} ${leftChevronDisable && styles.disable_btn}`} disabled={leftChevronDisable} onClick={()=>handlePage(1)}><ChevronsLeft /></button>
      <button className={`${styles.page_box} ${leftChevronDisable && styles.disable_btn}`} disabled={leftChevronDisable} onClick={()=>handlePage(page-1)}><ChevronLeft /></button>

      {Array(total_pages).fill(null).map((_, index) => <button key={index+1} className={`${styles.page_box} ${page===(index+1) && styles.btn_active}`} onClick={()=>handlePage(index+1)}>{index + 1}</button>)}

      <button className={`${styles.page_box} ${rightChevronDisable && styles.disable_btn}`} disabled={rightChevronDisable} onClick={()=>handlePage(page+1)}><ChevronRight /></button>
      <button className={`${styles.page_box} ${rightChevronDisable && styles.disable_btn}`} disabled={rightChevronDisable} onClick={()=>handlePage(total_pages)}><ChevronsRight /></button>
    </div>
  )
}

export default Pagination