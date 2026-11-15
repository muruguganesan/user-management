import { ChevronDown } from 'lucide-react'
import styles from './select.module.css'
import type { SelectType } from './SelectTypes'
import type { ChangeEvent } from 'react'

const SelectDropdown = ({ options, id = "", limit, handleLimit}: { options: SelectType[], id?: string, limit: number, handleLimit: (e:ChangeEvent<HTMLSelectElement>)=>void }) => {
    return (
        <div className={styles.select_wrap}>
            <select id={id} name="select" value={limit} onChange={handleLimit}>
                {
                    options.map((ele) => <option key={ele.id} value={ele.value}>{ele.name}</option>)
                }

            </select>
            <div className={styles.chevron_wrap}>
                <ChevronDown className={styles.select_icon} size={18} />
            </div>
        </div>
    )
}

export default SelectDropdown