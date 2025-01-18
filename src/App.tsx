import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebsiteFooter from './components/WebFooter';
import { useAppSelector } from './redux/hook';
import AddUserModal from './components/modules/users/addUser';

function App() {
  const modal = useAppSelector((state) => state.userModal)
  return (
    <div className="flex flex-col min-h-screen">
      {modal.isUserModalOpen && <AddUserModal />}
      <ToastContainer />
      <main className="flex-grow">
      <Navbar />
        <Outlet />
      </main>
      <WebsiteFooter />
    </div>
  );
}

export default App;