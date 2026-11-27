import { Eye, Pen, Trash } from 'lucide-react'
import styles from "./table.module.css"
import { Search } from '../Search/Search';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import type { SelectType } from '../SelectDropdown/SelectTypes';
import Pagination from '../Pagination/Pagination';
import Button from '../Button/Button';
import useUsers from '../../hooks/reactQueryHooks/useUsers';
import { useState, type ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import useDeleteUser from '../../hooks/reactQueryHooks/useDeleteUser';
import LinkButton from '../Button/LinkButton';
import no_person_fnd from "/no_person_fnd.png";

const Table = () => {
    const [searchParams] = useSearchParams();

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [searchBefore, setSearchBefore] = useState(searchParams.get("search") || "");
    const [search, setSearch] = useState(searchParams.get("search") || "");

    // Tanstack Hooks
    const { data, isLoading, isError, error } = useUsers(page, limit, searchBefore);
    const { mutate: removeUser } = useDeleteUser();

    // console.log("data", data);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        const timer = setTimeout(()=>{
            setSearchBefore(search);
        }, 800);
        return () => clearTimeout(timer);
    };
    const clearSearchValueFn = () => setSearch("");
    const handleLimit = (e: ChangeEvent<HTMLSelectElement>) => setLimit(Number(e.target.value));
    const handlePage = (value: number) => setPage(value);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState<number | null>(null);


    // const datas = [
    //     {
    //         id: 1,
    //         name: "Arun Kumar",
    //         email: "arun@gmail.com",
    //         age: 22
    //     },
    //     {
    //         id: 2,
    //         name: "Priya Sharma",
    //         email: "priya@gmail.com",
    //         age: 22
    //     },
    //     {
    //         id: 3,
    //         name: "Ayub Kumar",
    //         email: "ayub@gmail.com",
    //         age: 22
    //     },
    //     {
    //         id: 4,
    //         name: "Aishwarya",
    //         email: "aishwarya@gmail.com",
    //         age: 22
    //     }
    // ];

    const limitOption: SelectType[] = [
        {
            id: 1,
            value: 5,
            name: 5
        },
        {
            id: 2,
            value: 10,
            name: 10
        },
        {
            id: 3,
            value: 25,
            name: 25
        },
        {
            id: 4,
            value: 50,
            name: 50
        }
    ];

    const usersLength = data?.users?.length ?? 0;
    const onDeleteModalClose = () => {
        document.body.style.overflow = "auto";
        setDeleteModalOpen(false);
    }
    const onDeleteModalSave = () => {
        removeUser(Number(deleteUserId));
        onDeleteModalClose();
    };
    const onDeleteModalOpen = (id: number) => {
        setDeleteUserId(id);
        setDeleteModalOpen(true);
        document.body.style.overflow = "hidden";
    }
    return (
        <>
            <div className={styles.table_wrapper}>
                <div className={styles.table_header}>
                    <h3>All Users</h3>
                    <Search placeholder='Search Users...' search={search} handleSearch={handleSearch} clearSearchValueFn={clearSearchValueFn} />
                </div>
                <div className={styles.table_wrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5}>Loading...</td>
                                </tr>
                            ) : isError && !data ? (
                                <tr>
                                    <td colSpan={5}>
                                        Error: {error.message}
                                    </td>
                                </tr>
                            ) : data?.users?.length ? (
                                data.users.map((ele) => (
                                    <tr key={ele.id}>
                                        <td>{ele.id}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.email}</td>
                                        <td>{ele.age}</td>
                                        <td>
                                            <div className={styles.action_btns}>
                                                <LinkButton text="View" icon={<Eye size={20} />} color="#2563eb" bgColor='#eff6ff' href={`/view-user/${ele.id}`} />
                                                <LinkButton text="Edit" icon={<Pen size={20} />} color="#b45309" bgColor='#fef3c7' href={`/edit-user/${ele.id}`} />
                                                <Button text="Delete" icon={<Trash size={20} />} color="#dc2626" bgColor='#fee2e2' onClick={() => onDeleteModalOpen(ele.id)} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5}><div className='no_user_wrap'><img src={no_person_fnd} alt="" /></div></td>
                                </tr>
                            )}

                            {/* {
                            isLoading ? <p>Loading...</p> :
                                <>
                                    {
                                        data?.users && (data?.users?.length > 0 ? data?.users?.map((ele) => <tr key={ele.id}>
                                            <td>{ele.id}</td>
                                            <td>{ele.name}</td>
                                            <td>{ele.email}</td>
                                            <td>{ele.age}</td>
                                            <td>
                                                <div className={styles.action_btns}>
                                                    <Button text="View" icon={<Eye size={20} />} color="#2563eb" bgColor='#eff6ff' />
                                                    <Button text="Edit" icon={<Pen size={20} />} color="#b45309" bgColor='#fef3c7' />
                                                    <Button text="Delete" icon={<Trash size={20} />} color="#dc2626" bgColor='#fee2e2' />
                                                </div>
                                            </td>
                                        </tr>) : <p>No Data Found</p>)
                                    }
                                </>

                        } */}
                        </tbody>
                    </table>
                </div>

                <div className="pagination">
                    <p>Showing {limit * (page - 1) + 1}-{usersLength + (limit * (page - 1))} of {data?.total_users ?? 0} users</p>
                    <div className="limit_with_page">
                        <div className="limit_sec">
                            <label htmlFor='limit_id'>Rows per page</label>
                            <SelectDropdown options={limitOption} id="limit_id" limit={limit} handleLimit={handleLimit} />
                        </div>
                        <Pagination page={page} handlePage={handlePage} total_pages={data?.total_pages} />
                    </div>

                </div>
            </div>
            <Modal isOpen={deleteModalOpen} onClose={onDeleteModalClose} onSave={onDeleteModalSave} title="Delete User">
                <p>Are you sure you want to Delete?</p>
            </Modal>


        </>
    )
}

export default Table