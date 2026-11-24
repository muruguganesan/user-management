import type { LinkButtonType } from "./ButtonType";
import type { CSSProperties } from "react";
import styles from "./button.module.css"

const Chip = ({text="Chip", color="#2767eb", bgColor="#e8effe", icon=""}:LinkButtonType) => {
  return (
    <span  className={`${styles.link_btn} ${styles.chip} chip`} style={{'--color': color, '--bg-color': bgColor} as CSSProperties }>{icon}<span>{text}</span></span>
  )
}

export default Chip;