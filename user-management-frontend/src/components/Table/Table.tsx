import Button from '../../css-modules/button/Button'
import { Eye, Pen, Trash } from 'lucide-react'
import styles from "./table.module.css"
import { Search } from '../Search/Search';
import SelectDropdown from '../SelectDropdown/SelectDropdown';
import type { SelectType } from '../SelectDropdown/SelectTypes';
import Pagination from '../Pagination/Pagination';

const Table = () => {
    const datas = [
        {
            id: 1,
            name: "Arun Kumar",
            email: "arun@gmail.com",
            age: 22
        },
        {
            id: 2,
            name: "Priya Sharma",
            email: "priya@gmail.com",
            age: 22
        },
        {
            id: 3,
            name: "Ayub Kumar",
            email: "ayub@gmail.com",
            age: 22
        },
        {
            id: 4,
            name: "Aishwarya",
            email: "aishwarya@gmail.com",
            age: 22
        }
    ];

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
    return (
        <div className={styles.table_wrapper}>
            <div className={styles.table_header}>
                <h3>All Users</h3>
                <Search placeholder='Search Users...' />
            </div>

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
                    {
                        datas.map((ele) => <tr key={ele.id}>
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
                        </tr>)
                    }
                </tbody>
            </table>
            <div className="pagination">
                <p>Showing 1-5 of 30 users</p>
                <div className="limit_with_page">
                    <div className="limit_sec">
                        <label htmlFor='limit_id'>Rows per page</label>
                        <SelectDropdown options={limitOption} id="limit_id" />
                    </div>
                    <Pagination />
                </div>

            </div>
        </div>
    )
}

export default Table