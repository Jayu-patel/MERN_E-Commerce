import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import useLogout from "../../hooks/user/useLogout";

const Navigation2 = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {logoutHook} = useLogout()

  const logoutHandler = async () => {
    try {
      await logoutHook()
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
        style={{ zIndex: 9999 }}
        className={`flex-row justify-between text-white bg-black w-[100vw] h-[70px] fixed`}
        id="navigation-container2"
        >
        <div className="flex justify-around items-center space-x-4 ml-2 res:text-[0.8rem] links">
            <Link
            to="/"
            className="flex items-center res:flex-col transition-transform transform hover:-translate-y-1"
            >
                <div>
                    <AiOutlineHome className="mr-2" size={20} />
                </div>
                <div>
                </div>
            </Link>

            <Link
            to="/shop"
            className="flex items-center res:flex-col transition-transform transform hover:-translate-y-1"
            >
            <AiOutlineShopping className="mr-2" size={20} />
            </Link>

            <Link to="/cart" className="flex relative items-center">
            <div className="flex items-center res:flex-col transition-transform transform hover:-translate-y-1">
                <AiOutlineShoppingCart className="mr-2" size={18} />
            </div>

            <div className="absolute top-0 right-0">
                {cartItems.length > 0 && (
                <span>
                    <span className="px-1 py-0.5 text-sm text-white bg-pink-500 rounded-full">
                    {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                </span>
                )}
            </div>
            </Link>

            <Link to="/favorite" className="flex relative items-center">
            <div className="flex items-center res:flex-col transition-transform transform hover:-translate-y-1">
                <div>
                    <FaHeart className="mr-2" size={18} />
                </div>
                <div>
                    <FavoritesCount />
                </div>
            </div>
            </Link>
        </div>

        <div className="relative">
            <button
            onClick={toggleDropdown}
            className="flex items-center mt-[22px] text-gray-800 focus:outline-none"
            >
            {userInfo ? (
                <span className="text-white">{userInfo.username}</span>
            ) : (
                <></>
            )}
            {userInfo && (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 ml-1 ${
                    dropdownOpen ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                />
                </svg>
            )}
            </button>

            {dropdownOpen && userInfo && (
            <ul
                className={`absolute right-0 mt-2 space-y-2 bg-white text-gray-600 ${
                !userInfo.isAdmin ? "" : ""
                }`}
            >
                {userInfo.isAdmin && (
                <>
                    <li>
                    <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Dashboard
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/admin/productlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Products
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/admin/categorylist"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Category
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/admin/orderlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Orders
                    </Link>
                    </li>
                    <li>
                    <Link
                        to="/admin/userlist"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={toggleDropdown}
                    >
                        Users
                    </Link>
                    </li>
                </>
                )}

                <li>
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100" onClick={toggleDropdown}>
                    Profile
                </Link>
                </li>
                <li>
                <button
                    onClick={()=>{logoutHandler(); toggleDropdown()}}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                >
                    Logout
                </button>
                </li>
            </ul>
            )}
            {!userInfo && (
            <ul className="flex space-x-4 h-full mr-2">
                <li>
                <Link
                    to="/login"
                    className="flex items-center transition-transform transform hover:translate-x-2"
                >
                    <AiOutlineLogin className="mr-2" size={26} />
                    <span>LOGIN</span>
                </Link>
                </li>
            </ul>
            )}
        </div>
        </div>
    );
};

export default Navigation2;
