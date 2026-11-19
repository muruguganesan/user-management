import { CircleChevronLeft } from "lucide-react"
import LinkButton from "../Button/LinkButton"
import styles from "../Header/header.module.css"
import { useLocation } from "react-router-dom"
const Header = () => {
  const location = useLocation()
  const pathname = location.pathname;
  return (
    <header className={styles.header}>
      <div className="c">
        <div className={styles.header_in}>
          {
            pathname !== "/" && <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />

          }
          <span></span>

          <div className={styles.header_rgt}>
            {pathname !== "/login" && <LinkButton text="Login" href="/login" />}
            {pathname !== "/register" && <LinkButton text="Register" href="/register" />}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header