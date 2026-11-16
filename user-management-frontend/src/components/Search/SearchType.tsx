import type { ChangeEvent } from "react";

export type SearchType = {
    placeholder?: string;
    search: string;
    handleSearch: (e: ChangeEvent<HTMLInputElement>)=>void;
    clearSearchValueFn: () => void;
}