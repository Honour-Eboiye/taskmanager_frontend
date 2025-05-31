import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'

// Helper to get a cookie by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

// Helper to delete a cookie
function deleteCookie(name) {
  document.cookie = name + '=; Max-Age=0; path=/;';
}

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setLoggedIn(!!getCookie('token'));
    // Close menu on outside click
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    deleteCookie('token');
    setLoggedIn(false);
    setMenuOpen(false);
    window.location.href = "/sign_in";
  };

  return (
    <div className='flex justify-between border-b-gray-300 border-b items-center custom-container py-2 sm:py-5 '>
      {/* LOGO */}
      <div>
        <Link to='/'>
          <img src="/LOGO.png" alt="TaskDuty" className='w-25'/>
        </Link>
      </div>

      <div className='flex gap-10 items-center'>
        {/* MENUS */}
        <div className='flex gap-5 invisible sm:visible'>
          <Link to='/new_task'>New Task</Link>
          <Link to='./all_tasks'>All Tasks</Link>
        </div>

        {/* PROFILE */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="focus:outline-none"
            title={loggedIn ? "Account" : "Login"}
          >
            <img src="/PROFILE.png" alt="Profile" className="w-10 rounded-full border border-gray-300 cursor-pointer hover:shadow-lg transition" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 flex flex-col">
              <Link
                to="/new_task"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                New Task
              </Link>
              <Link
                to="/all_tasks"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                All Tasks
              </Link>
              {loggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Log out
                </button>
              ) : (
                <Link
                  to="/sign_in"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header