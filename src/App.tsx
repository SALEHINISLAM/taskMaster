import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WebsiteFooter from './components/WebFooter';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
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