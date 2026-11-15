import styles from "./error-wrapper.module.css";
import type { ReactNode } from "react";

const ErrorWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.error_wrapper}>
            {children}
        </div>
    )
}

export default ErrorWrapper