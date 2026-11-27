import { CircleChevronLeft, User } from "lucide-react"
import LinkButton from "../Button/LinkButton"
import styles from "../Header/header.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Button from "../Button/Button"
import { tokenStore } from "../../services/tokenStore"

const Header = () => {
  const location = useLocation()
  const pathname = location.pathname;
  const { isAuthenticated } = useAuth()
  const { logout, logoutAll } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  }
  const handleLogoutAll = async () => {
    await logoutAll();
    navigate("/login", { replace: true });
  }

  console.log("access_token", tokenStore.get());
  const x = 7;
  return (
    <header className={styles.header}>
      <div className="c">
        <div className={styles.header_in}>
          {
            pathname !== "/" && <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />

          }
          <span></span>
          {
            !isAuthenticated ? (<div className={styles.header_rgt}>
              {pathname !== "/login" && <LinkButton text="Login" href="/login" />}
              {pathname !== "/register" && <LinkButton text="Register" href="/register" />}
            </div>) : (
              <div className={styles.profile_btn_wrap}>
                {pathname !== "/profile" && <LinkButton icon={<User />} text="Profile" href="/profile" />}
                <Button text="Logout" onClick={handleLogout} />
                <Button text="Logout All" onClick={handleLogoutAll} />

              </div>
            )
          }



        </div>
      </div>
    </header>
  )
}

export default Header