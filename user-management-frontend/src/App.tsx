// import { Plus } from 'lucide-react'
import './App.css'
// import Table from './components/Table/Table'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import Button from './components/Button/Button';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import ViewUser from './pages/ViewUser';
import EditUser from './pages/EditUser';


const queryClient = new QueryClient();

function App() {



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/view-user/:id" element={<ViewUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        {/* EditUser */}

      </Routes>
        {/* <div className="home section_padding">
          <div className="c">
            <header>
              <div className="heading_left">
                <h1>User Management</h1>
                <p>Manage and organize your users</p>
              </div>
              <Button text="Add User" icon={<Plus size={15} />} />
            </header>
            <Table />

          </div>
        </div> */}
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
