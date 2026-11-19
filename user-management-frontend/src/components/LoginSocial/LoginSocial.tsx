import type { LoginSocialType } from './LoginSocialType'
import styles from "./login_social.module.css"

const LoginSocial = ({text="Google", img}:LoginSocialType) => {
  return (
    <button className={styles.login_social}>{Boolean(img) && <img src={img} alt="" />}<span>Login with <strong>{text}</strong></span></button>
  )
}

export default LoginSocial