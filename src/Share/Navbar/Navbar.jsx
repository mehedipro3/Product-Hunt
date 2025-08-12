//import { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import './NavBar.css';
//import { AuthContext } from '../../Provider/AuthProvider';
import { FaShoppingCart } from 'react-icons/fa';
//import useCart from '../../hooks/useCart';
//import useAdmin from '../../hooks/useAdmin';
const Navbar = () => {

  // const { user, logOut } = useContext(AuthContext);
  // const [isAdmin] = useAdmin();
  // const [cart] = useCart();
  const navOption =
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/menu"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/order/salad"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Order
        </NavLink>
      </li>
      {/* {
        user && isAdmin && <li>
          <NavLink
            to="/dashboard/adminHome"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            Admin Home
          </NavLink>
        </li>
      } */}
      {/* {
        user && !isAdmin && <li>
          <NavLink
            to="/dashboard/userHome"
            className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          >
            User Home
          </NavLink>
        </li>
      } */}

      {/* <li>
        <Link to={"/dashboard/cart"}>
          <button className='flex items-center '>
            <FaShoppingCart className='mr-2'></FaShoppingCart> 
            <div className="badge badge-sm badge-secondary">+{cart.length}</div>
          </button>
        </Link>
      </li> */}

    </>

  // const handleLogout = () => {
  //   logOut()
  //     .then(() => { })
  //     .then(error => console.log(error))
  // }

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              {navOption}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl text-[#1A2A80]">TechScout</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOption}
          </ul>
        </div>
        <div className="navbar-end">
          {/* {
            user ?
              <>
                <button className="btn btn-ghost" onClick={handleLogout}>Log Out</button>
              </>
              :
              <>
                <button><Link to="/login" className="nav-link"> Login</Link></button>
              </>
          } */}
        </div>
      </div>
    </>
  );
};

export default Navbar;