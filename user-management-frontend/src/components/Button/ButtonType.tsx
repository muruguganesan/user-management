import type { ReactNode } from "react";
export type ButtonType = {
    text?: string;
    onClick?: ()=>void;
    color?: string;
    bgColor?: string;
    icon?: ReactNode | string; 
    type?: "button" | "submit" | "reset" | undefined;
}
export type LinkButtonType = ButtonType & {
    href?: string;
}
