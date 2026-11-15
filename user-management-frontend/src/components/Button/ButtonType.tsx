import type { ReactNode } from "react";
export type ButtonType = {
    text?: string;
    onClick?: ()=>void;
    color?: string;
    bgColor?: string;
    icon?: ReactNode | string; 
}
export type LinkButtonType = ButtonType & {
    href?: string;
}
