import { useState } from "react";
import bloodBankLogo from '../assets/blood bank logo.svg'

export default function Nav() {
  const [togleActive, setTogleActive] = useState(false);
  return (
    <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
      <div className="flex-1 flex justify-between items-center">
      <a href="/" className='cursor-pointer w-1/4 md:flex items-center gap-2'>
					<img id='navLogo' src={bloodBankLogo} className='w-15 h-15' alt="blood bank logo" />
					<span className='text-lg font-bold text-primary_300 underline-none'>ব্লাড ব্যাংক</span>
				</a>
      </div>

      <button
        onClick={() => setTogleActive(!togleActive)}
        className="md:hidden block text-gray-900"
      >
        <svg
          className="fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>

      <div
        className={`${
          togleActive ? "block" : "hidden"
        } md:flex md:items-center md:w-auto w-full`}
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                AboutUs
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                Treatments
              </a>
            </li>
            <li>
              <a className="md:p-4 py-3 px-0 block" href="#">
                Blog
              </a>
            </li>
            <li>
              <a
                className="md:p-4 py-3 px-0 block md:mb-0 mb-2"
                href="#"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}