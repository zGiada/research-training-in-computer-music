import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="leading-none text-2xl bg-gradient-rgba text-sky-100 p-4 z-40 fixed top-0 w-full ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="mr-4">
            <Image
              src="/soundRise-logo.svg"
              alt="Your image"
              width={80}
              height={100}
            />
          </div>
        </div>
        <div className="hidden sm:flex items-center">
          <Link
            href="./"
            className="hover:drop-shadow-lg text-lg font-semibold"
          >
            HOME
          </Link>
          <Link href="./about" className="ml-4 text-lg font-semibold">
            ABOUT
          </Link>
          <Link href="./play" className="ml-4 text-lg font-semibold">
            RUN APP
          </Link>
          <Link
            href="https://github.com/zGiada/soundrise-application" target="_blank"
            className="ml-4 text-lg font-semibold"
          >
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
          </Link>
        </div>
        <div className="sm:hidden ">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden bg-gray-800 py-2 px-4 mt-2">
          <Link
            href="./"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            HOME
          </Link>
          <Link
            href="./about"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            ABOUT
          </Link>
          <Link
            href="./play"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            RUN APP
          </Link>
          <Link
            href="ithttps://github.com/zGiada/soundrise-application" target="_blank"
            className="block text-white text-lg font-semibold py-2"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={faGithub} className="github-icon" />
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
