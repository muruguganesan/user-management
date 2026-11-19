import AddUserForm from '../components/AddUserForm.tsx/AddUserForm';

const EditUser = () => {

    return (
        <div className='section_padding'>
            <div className="c">
                <h2 className='com_title'>Edit User</h2>
                <AddUserForm formType='edit' />
            </div>
        </div>
    )
}

export default EditUser