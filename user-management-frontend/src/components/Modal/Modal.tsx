import { createPortal } from 'react-dom'
import styles from "./modal.module.css"
import { X } from 'lucide-react';
import type { MouseEvent } from 'react';
import Button from '../Button/Button';
import type { ModalPropType } from './ModalTypes';


const Modal = ({ isOpen, onClose, title, onSave, children }: ModalPropType) => {
    if (!isOpen) return null;
    const stopPropagtionFn = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return createPortal(<div className={styles.modal_overlay} onClick={onClose}>
        <div className={styles.modal} onClick={stopPropagtionFn}>
            <header className={styles.modal_header}>
                <h4 className={styles.modal_title}>
                    {title}
                </h4>
                <button onClick={onClose} className={styles.modal_x_btn}>
                    <X />
                </button>
            </header>
            <div className={styles.modal_body}>
                <main>
                    {children}
                </main>
                <footer className={styles.modal_footer}>
                    <Button text="Cancel" color="#dc2626" bgColor='#fee2e2' onClick={onClose} />
                    <Button text="Ok"  color='#eff6ff' bgColor="#2563eb" onClick={onSave} />
                </footer>
            </div>

        </div>
    </div>, document.body);
}

export default Modal