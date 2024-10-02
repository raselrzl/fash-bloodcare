"use client";
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaUserPlus, FaCheckCircle, FaHome, FaEnvelope, FaSearch } from 'react-icons/fa';
import { BiLogOutCircle } from "react-icons/bi";
import { RiLoginCircleFill } from "react-icons/ri";

const NavigationLink: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollTop = useRef(0);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { pathname } = window.location;
    setCurrentPath(pathname);

    // Check login status from localStorage
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
    

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      router.push('/admin');
      setLoading(false);
    }, 500);
  };

  const getLinkClass = (href: string) => {
    return currentPath === href
      ? 'text-green-500 underline font-bold'
      : 'text-white hover:text-green-500';
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 md:p-6 rounded-t-lg shadow-lg flex items-center justify-center gap-2 md:gap-4 lg:gap-8 text-sm md:text-base lg:text-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}>
      
      {isLoggedIn && (
        <a href="/admin/dashboard" className={getLinkClass('/admin/dashboard')} aria-label="Search">
          <FaSearch className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
          <span className="hidden md:inline">Search</span>
        </a>
      )}

      <a href="/eligible" className={getLinkClass('/eligible')} aria-label="Eligible">
        <FaCheckCircle className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Eligible</span>
      </a>

      <a href="/" className={getLinkClass('/')} aria-label="Home">
        <FaHome className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Home</span>
      </a>

      <a href="/register" className={getLinkClass('/register')} aria-label="Register">
        <FaUserPlus className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Register</span>
      </a>

      <a href="mailto:msislam0802@gmail.com" className="text-white hover:text-green-500" aria-label="Email">
        <FaEnvelope className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Email</span>
      </a>

      {/* Conditionally render login or logout */}
      {isLoggedIn ? (
        <button
          onClick={handleLogout}
          className="flex items-center text-white hover:text-green-500 transition-colors duration-200"
          aria-label="Logout"
          disabled={loading}
        >
          <BiLogOutCircle className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
          <span className="hidden md:inline">{loading ? 'Logging out...' : 'Logout'}</span>
        </button>
      ) : (
        <Link href="/admin" className={getLinkClass('/admin')} aria-label="Login">
          <RiLoginCircleFill className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
          <span className="hidden md:inline">Login</span>
        </Link>
      )}
    </div>
  );
};

export default NavigationLink;

