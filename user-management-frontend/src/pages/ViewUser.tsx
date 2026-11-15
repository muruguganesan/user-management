import { useParams } from 'react-router-dom'
import LinkButton from '../components/Button/LinkButton';
import { CircleChevronLeft } from 'lucide-react';
import AddUserForm from '../components/AddUserForm.tsx/AddUserForm';

const ViewUser = () => {
    const { id } = useParams();

    return (
        <div className='section_padding'>
            <div className="c">
                <div className="btn_wrap">
                    <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />
                    <h2 className='com_title'>View User</h2>
                </div>
                <AddUserForm formType='view' />
            </div>
        </div>
    )
}

export default ViewUser