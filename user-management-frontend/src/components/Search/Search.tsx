import { useEffect, type ChangeEvent } from 'react'
import type { SearchType } from './SearchType'
import styles from "./search.module.css"
import { useSearchParams } from 'react-router-dom';
import { X } from 'lucide-react';



export const Search = ({ placeholder = "Search...", search, handleSearch, clearSearchValueFn }: SearchType) => {
    const [searchParams, setSearchParams] = useSearchParams();
    // const [search, setSearch] = useState(
    //     searchParams.get("search") || ""
    // );
    console.warn("searchParams", searchParams);

    // console.log("search", search.length)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (search.trim()) {
                setSearchParams({ search: search.trim() });
            } else {
                setSearchParams({});
            }
        }, 3500);

        return () => clearTimeout(timer);
    }, [search, setSearchParams]);


    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log("e.target.value", e.target.value);
        handleSearch(e);
    }

    const clearSearchFn = () => {
        setSearchParams({});
        clearSearchValueFn();
    };

    return (
        <div className={styles.search_wrap}>
            <input type="text" placeholder={placeholder} value={search} onChange={handleChange} className={styles.search_input} name="search" />
            {search.length ? <button className={styles.clear_btn} title='clear' onClick={clearSearchFn}><X size={15} /></button> : <></>}
        </div>
    )
}
