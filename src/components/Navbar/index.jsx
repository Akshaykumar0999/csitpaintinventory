import './index.css'
import { NavLink } from 'react-router-dom';
import { IoSpeedometerOutline, IoLogOutOutline } from "react-icons/io5";
import { SlDrop } from "react-icons/sl";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { LuBoxes } from "react-icons/lu";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../paintFeatures/authSlice';
import { CiSettings } from "react-icons/ci";
import { MdSell } from "react-icons/md";

const navTabsList = [
  {
    id: 1,
    navName: "Dashboard",
    to: "/",
    navIcon: <IoSpeedometerOutline size={20} />,
  },
  {
    id: 2,
    navName: "Employee",
    to: "/employee",
    navIcon: <FaUsersBetweenLines size={20} />,
  },
  {
    id: 3,
    navName: "Supplier",
    to: "/supplier",
    navIcon: <SlDrop size={20} />,
  },
  {
    id: 4,
    navName: "Product",
    to: "/product",
    navIcon: <LuBoxes size={20} />,
  },
  {
    id: 5,
    navName: "Purchase",
    to: "/purchase",
    navIcon: <IoBagCheckOutline size={20} />,
  },
  {
    id: 6,
    navName: "Settings",
    to: "/settings",
    navIcon: <CiSettings size={20} />,
  },

  {
    id: 7,
    navName: "Sell-Products",
    to: "/home",
    navIcon: <MdSell size={20} />,
  },
];

const Navbar = () => {
    const navigate = useNavigate()
    // const onClickLogoutUser = () => {
    //     localStorage.removeItem('token')
    //     navigate('/login')
    // }
    const dispatch = useDispatch();
    const logoutUser = () => {
        localStorage.removeItem('token');
        dispatch(deleteUser());
    }
    
    return (
      <nav className="nav-main-container">
        <h4 className="text-white">🎨 Paints</h4>
        <ul className="navmenu-tablist-card">
          {navTabsList.map((each) => (
            <NavLink key={each.id} to={each.to} className="navmenu-list-item">
              <p className="nav-icon">{each.navIcon}</p>
              <p className="nav-name">{each.navName}</p>
            </NavLink>
          ))}
          <div className="navmenu-list-item" style={{cursor: 'pointer'}} onClick={logoutUser}>
            <p className="nav-icon" style={{ color: "#e55353" }}>
              <IoLogOutOutline size={20} />
            </p>
            <p className="nav-name" style={{ color: "#e55353" }}>
              Logout
            </p>
          </div>
        </ul>
      </nav>
    );
}

export default Navbar