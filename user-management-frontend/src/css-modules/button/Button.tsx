import type { ButtonType } from "./ButtonType";
import type { CSSProperties } from "react";
import styles from "./button.module.css"

const Button = ({text="button", onClick, color="white", bgColor="#4f46e5", icon=""}:ButtonType) => {
  return (
    <button onClick={onClick} className={`${styles.reusable_btn}`} style={{'--color': color, '--bg-color': bgColor} as CSSProperties }>{icon}<span>{text}</span></button>
  )
}

export default Button