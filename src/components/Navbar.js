import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../firebase-init";

const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <>
      <div className="navbar bg-gray-50 px-2  md:px-16 shadow-lg border-b">
        <div className="navbar-start">
          <Link to="/" className="normal-case text-2xl font-semibold">
            Daily Tasks
          </Link>
        </div>
        <div className="navbar-center">
          <ul className="menu menu-horizontal p-0 hidden md:flex">
            <li>
              <NavLink to="/completed">Completed Tasks</NavLink>
            </li>
            <li>
              <NavLink to="/to-do">To-Do</NavLink>
            </li>
            <li>
              <NavLink to="/calendar">Calendar</NavLink>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <button className="btn btn-primary" onClick={handleLogout}>
              LogOut
            </button>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
          <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-ghost md:hidden rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex="0"
              className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-gray-50 rounded-box w-[92vw]"
            >
              <li>
                <NavLink to="/completed">Completed Tasks</NavLink>
              </li>
              <li>
                <NavLink to="/to-do">To-Do</NavLink>
              </li>
              <li>
                <NavLink to="/calendar">Calendar</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
