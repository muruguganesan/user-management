import { useEffect, useState, type ChangeEvent } from 'react'
import type { SearchType } from './SearchType'
import styles from "./search.module.css"
import { useSearchParams } from 'react-router-dom';



export const Search = ({ placeholder = "Search..." }: SearchType) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(
        searchParams.get("search") || ""
    );



    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim()) {
                setSearchParams({ search: search.trim() });
            } else {
                setSearchParams({});
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [search, setSearchParams]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.value", e.target.value);
        setSearch(e.target.value);
    }

    return (
        <div className={styles.search_wrap}>
            <input type="text" placeholder={placeholder} value={search} onChange={handleChange} className={styles.search_input} name="search" />
        </div>
    )
}
