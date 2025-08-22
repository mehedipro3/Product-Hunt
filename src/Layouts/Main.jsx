import Navbar from '../Share/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Share/Footer/Footer';

const Main = () => {
  const location = useLocation();
  //console.log(location);

  const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('singUp')

  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <Outlet></Outlet>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;