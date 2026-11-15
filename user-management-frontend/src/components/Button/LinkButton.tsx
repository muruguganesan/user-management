import type { LinkButtonType } from "./ButtonType";
import type { CSSProperties } from "react";
import styles from "./button.module.css"
import { Link } from "react-router-dom";

const LinkButton = ({text="button", color="white", bgColor="#4f46e5", icon="", href="/"}:LinkButtonType) => {
  return (
    <Link to={href} className={`${styles.link_btn} ${styles.reusable_btn} link_btn`} style={{'--color': color, '--bg-color': bgColor} as CSSProperties }>{icon}<span>{text}</span></Link>
  )
}

export default LinkButton;