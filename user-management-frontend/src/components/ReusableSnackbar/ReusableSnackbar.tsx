import { createPortal } from "react-dom"
import modalStyles from "../Modal/modal.module.css"
import type { ModalPropType } from "../Modal/ModalTypes";
import { X } from "lucide-react";
import styles  from "./snackbar.module.css"
import { useEffect } from "react";

const ReusableSnackbar = ({ isOpen, onClose,  children }: ModalPropType) => {
    if (!isOpen) return null;
    useEffect(()=>{
        const timeout = setTimeout(() => {
            onClose();
        }, 1800);

        return () => clearTimeout(timeout);
    }, []);

    return createPortal((<div className={styles.snackbar}>
        <div className={`${modalStyles.modal} ${styles.snacbar_in}`}>
            <div className={modalStyles.modal_body}>
                <main className={styles.container}>
                    {children}
                    <button onClick={onClose} className={`${modalStyles.modal_x_btn} ${styles.close_btn}`}>
                        <X color="white" />
                    </button>
                </main>
            </div>
        </div>
    </div>), document.body);
}

export default ReusableSnackbar