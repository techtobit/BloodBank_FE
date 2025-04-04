import { useState } from "react";
import bloodBankLogo from '../assets/blood bank logo.svg';
import { Link } from 'react-router';

export default function Nav() {
  const token = localStorage.getItem('token');
  const [togleActive, setTogleActive] = useState(false);

  const navLinks = (
    <ul className="flex flex-col md:flex-row items-center md:ml-20 gap-2 md:gap-10 items-center font-bold text-lg text-primary-300  [&>li:hover]:text-primary-100 [&>li:hover]:underline">
      <li><a className="md:p-4 py-3 px-0 block" href="/">হোমপেজ</a></li>
      <li><a className="md:p-4 py-3 px-0 block" href="#donars">রক্তদাতা</a></li>
      <li><a className="md:p-4 py-3 px-0 block" href="#report"> রিপোর্ট/মাতামত</a></li>
      <li><a className="md:p-4 py-3 px-0 block" href="#contact">যোগাযোগ</a></li>
    </ul>
  );

  const authButtons = (
    <div>
      {token ? (
        <Link
          to="profile/"
          className="bg-primary-300 text-netural-300 text-center text-sm md:text-lg font-bold border hover:bg-primary-100 rounded-md px-5 transition duration-300 ease focus:outline-none focus:border-primary-100"
        >
          প্রোফাইল
        </Link>
      ) : (
        <Link
          to="login/"
          className="bg-primary-300 text-netural-300 text-center text-sm md:text-lg font-bold border hover:bg-primary-100 rounded-md px-5 transition duration-300 ease focus:outline-none focus:border-primary-100"
        >
          লগইন
        </Link>
      )}
    </div>
  );

  return (
    <header className="w-full absolute md:bg-transparent bg-netural-300 lg:px-16 px-4 py-2 flex flex-wrap items-center  shadow-md">
      <div className="flex items-center gap-10">
        <a href="/" className="cursor-pointer flex items-center gap-2">
          <img id="navLogo" src={bloodBankLogo} className="w-15 h-15" alt="blood bank logo" />
          <span className="md:w-1/4 w-3/4  text-lg font-bold text-primary-300 underline-none">ব্লাড ব্যাংক</span>
        </a>
        <nav className="hidden md:block">{navLinks}</nav>
      </div>

      <button
        onClick={() => setTogleActive(!togleActive)}
        className="md:hidden block text-gray-900 ml-auto"
      >
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0V15z"></path>
        </svg>
      </button>

      <div className="ml-auto hidden md:block">{authButtons}</div>

      <div
        className={`${togleActive ? "flex flex-col justify-between items-center" : "hidden"} md:hidden w-full`}
        id="menu"
      >
        <nav>{navLinks}</nav>
        <div className="py-4">{authButtons}</div>
      </div>
    </header>
  );
}