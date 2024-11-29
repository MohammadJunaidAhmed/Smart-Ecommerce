import { Outlet } from "react-router-dom";
import NavBar from '../NavBar/NavBar';
import { useContext } from "react";
import loginContext from "../Context/LoginContext";
import { ToastContainer } from 'react-toastify';
import NewsLetter from "../Home/NewsLetter/NewsLetter";
import FooterNew from "../Footer/FooterNew";
import UniqueFeatures from "../Home/UniqueFeatures/UniqueFeatures";


const Layout = () => {
  const {isLoggedIn,setIsLoggedIn} = useContext(loginContext);
  return (
    <div className='bg-body-tertiary min-h-screen h-fit flex flex-col'>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <ToastContainer />
        <section className="bg-white pt-16">
            <Outlet />
        </section>
        <div className="w-full flex justify-center mt-5">
          <div className="w-[95vw]">
            <NewsLetter/>
            <UniqueFeatures/>
            <FooterNew/>
          </div>
        </div>
    </div>
  )
}


export default Layout;