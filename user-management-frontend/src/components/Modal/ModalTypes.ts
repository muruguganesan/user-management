import type { ReactNode } from "react";

export type ModalPropType = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    onSave?: () => void;
    children: ReactNode;
}