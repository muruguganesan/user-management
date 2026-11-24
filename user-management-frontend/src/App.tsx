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
import Header from './components/Header/Header';
import Login from './pages/Login';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import ProtectedRoutes from './routes/ProtectedRoutes';
import BeforeLoginRoutes from './routes/BeforeLoginRoutes';


export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

function App() {



  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-user" element={<AddUser />} />
          <Route path="/view-user/:id" element={<ViewUser />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
          <Route element={<BeforeLoginRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>



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
