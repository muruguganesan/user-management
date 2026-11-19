import AddUserForm from '../components/AddUserForm.tsx/AddUserForm';

const ViewUser = () => {

    return (
        <div className='section_padding'>
            <div className="c">
                <h2 className='com_title'>View User</h2>
                <AddUserForm formType='view' />
            </div>
        </div>
    )
}

export default ViewUser