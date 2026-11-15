import { CircleChevronLeft } from "lucide-react"
import LinkButton from "../components/Button/LinkButton";
import AddUserForm from "../components/AddUserForm.tsx/AddUserForm";


const AddUser = () => {


    return (
        <div className="section_padding">
            <div className="c">
                <div className="btn_wrap">
                    <LinkButton text="Back" href="/" icon={<CircleChevronLeft size={25} />} />
                    <h2 className='com_title'>Add User</h2>
                </div>

                <AddUserForm />

            </div>
        </div>
    )
}

export default AddUser