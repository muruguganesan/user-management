import { Plus } from "lucide-react"
import Table from "../components/Table/Table"
import LinkButton from "../components/Button/LinkButton"

const Home = () => {
    return (
        <div className="home section_padding">
            <div className="c">
                <header>
                    <div className="heading_left">
                        <h1>User Management</h1>
                        <p>Manage and organize your users</p>
                    </div>
                    <LinkButton text="Add User" href="/add-user" icon={<Plus size={15} />}  />
                </header>
                <Table />

            </div>
        </div>
    )
}

export default Home