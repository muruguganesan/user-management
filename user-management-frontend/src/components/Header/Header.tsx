import { CircleChevronLeft, User } from "lucide-react"
import LinkButton from "../Button/LinkButton"
import styles from "../Header/header.module.css"
import { useLocation } from "react-router-dom"
import useHavingToken from "../../hooks/cutom_hooks/useHavingToken"
const Header = () => {
  const location = useLocation()
  const pathname = location.pathname;
  const token = useHavingToken();
  return (
    <header className={styles.header}>
      <div className="c">
        <div className={styles.header_in}>
          {
            pathname !== "/" && <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />

          }
          <span></span>
          {
            !token ? (<div className={styles.header_rgt}>
              {pathname !== "/login" && <LinkButton text="Login" href="/login" />}
              {pathname !== "/register" && <LinkButton text="Register" href="/register" />}
            </div>) : (pathname !== "/profile" && <LinkButton icon={<User />} text="Profile" href="/profile" />)
          }


        </div>
      </div>
    </header>
  )
}

export default Header