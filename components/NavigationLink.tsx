import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaUserPlus, FaCheckCircle, FaHome, FaEnvelope, FaSearch } from 'react-icons/fa';

const NavigationLink: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const { pathname } = window.location;
    setCurrentPath(pathname);

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getLinkClass = (href: string) => {
    return currentPath === href
      ? 'text-green-500 underline font-bold'
      : 'text-white hover:text-green-500';
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 md:p-6 rounded-t-lg shadow-lg flex items-center justify-center gap-2 md:gap-4 lg:gap-8 text-sm md:text-base lg:text-lg transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      

      <Link href="/search" className={getLinkClass('/search')} aria-label="Search">
        <FaSearch className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Search</span>
      </Link>

      <Link href="/eligible" className={getLinkClass('/eligible')} aria-label="Eligible">
        <FaCheckCircle className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Eligible</span>
      </Link>

      <Link href="/" className={getLinkClass('/')} aria-label="Home">
        <FaHome className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Home</span>
      </Link>

        <Link href="/register" className={getLinkClass('/register')} aria-label="Register">
          <FaUserPlus className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
          <span className="hidden md:inline">Register</span>
        </Link>


      <a
        href="mailto:raselz.se@gmail.com"
        className="text-white hover:text-green-500"
        aria-label="Email"
      >
        <FaEnvelope className="inline-block mr-1 md:mr-2 text-lg md:text-xl lg:text-2xl" />
        <span className="hidden md:inline">Email</span>
      </a>
    </div>
  );
};

export default NavigationLink;
