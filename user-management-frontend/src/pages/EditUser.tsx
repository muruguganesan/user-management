import LinkButton from '../components/Button/LinkButton';
import { CircleChevronLeft } from 'lucide-react';
import AddUserForm from '../components/AddUserForm.tsx/AddUserForm';

const EditUser = () => {

    return (
        <div className='section_padding'>
            <div className="c">
                <div className="btn_wrap">
                    <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />
                    <h2 className='com_title'>Edit User</h2>
                </div>
                <AddUserForm formType='edit' />

            </div>
        </div>
    )
}

export default EditUser