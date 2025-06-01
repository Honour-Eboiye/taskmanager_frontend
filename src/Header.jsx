import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('https://officialtaskmanager.onrender.com/api/v1/auth/me', {
          credentials: 'include',
        });
        const data = await res.json();
        console.log('Auth response:', data); // for debugging
        if (res.ok && data.user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    setMenuOpen(false);
    window.location.href = "/sign_in";
  };

  if (loading) {
    return null; // or a spinner
  }

  return (
    <div className='flex justify-between border-b-gray-300 border-b items-center custom-container py-2 sm:py-5'>
      {/* LOGO */}
      <div>
        <Link to='/'>
          <img src="/LOGO.png" alt="TaskDuty" className='w-25'/>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className='hidden sm:flex gap-5 items-center'>
        {loggedIn && (
          <img
            src="/PROFILE.png"
            alt="Profile"
            className="w-10 rounded-full border border-gray-300"
          />
        )}
        <Link to='/new_task' className="hover:underline">New Task</Link>
        <Link to='/all_tasks' className="hover:underline">All Tasks</Link>
        {loggedIn ? (
          <button onClick={handleLogout} className="px-4 py-2 rounded bg-[#974FD0] text-white hover:bg-[#7c3aed]">Log out</button>
        ) : (
          <>
            <Link to="/sign_in" className="px-4 py-2 rounded bg-[#974FD0] text-white hover:bg-[#7c3aed]">Login</Link>
            <Link to="/sign_up" className="px-4 py-2 rounded border border-[#974FD0] text-[#974FD0] hover:bg-[#f3e8ff]">Register</Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <div className="sm:hidden flex items-center">
        <img src="/PROFILE.png" alt="Profile" className="w-10 rounded-full border border-gray-300 mr-2" />
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="focus:outline-none"
        >
          {menuOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="absolute top-16 right-4 w-48 bg-white border rounded shadow-lg z-20 flex flex-col sm:hidden">
          <Link to="/new_task" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>New Task</Link>
          <Link to="/all_tasks" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>All Tasks</Link>
          {loggedIn ? (
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Log out</button>
          ) : (
            <>
              <Link to="/sign_in" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
