import { Plus } from 'lucide-react'
import './App.css'
import Button from './css-modules/button/Button'
import Table from './components/Table/Table'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <div className="home section_padding">
        <div className="c">
          <header>
            <div className="heading_left">
              <h1>User Management</h1>
              <p>Manage and organize your users</p>
            </div>
            <Button text="Add User" icon={<Plus size={15} />} />
          </header>
            <Table  />

        </div>
      </div>


    </BrowserRouter>
  )
}

export default App
