import React from 'react'
import bloodBankLogo from '../assets/blood bank logo.svg'
import { Link } from 'react-router'


function Navgiation(): React.ReactElement {
	const token = localStorage.getItem('token')
	return (
		<nav className='w-full absolute flex  items-center justify-between px-10 pt-5 gap-10 md:gap-30 items-center bg-transparent z-10'>
		<ul className='flex gap-10 items-center font-bold text-lg text-primary_300  [&>li:hover]:text-primary_100 [&>li:hover]:underline'>
			<li className='cursor-pointer w-1/4'>
				<a href="/" className='flex items-center gap-2'>
					<img id='navLogo' src={bloodBankLogo} className='w-15 h-15' alt="blood bank logo" />
					<span className='text-lg font-bold text-primary_300 underline-none'>ব্লাড ব্যাংক</span>
				</a>
			</li>
			<Link to='' className='cursor-pointer'>হোম</Link>
			<li>ভোলান্টিযারিং</li>
			<li>যোগাযোগ</li>
		</ul>

		<ul>
			{
				token ?
					<Link to='profile/' className='mt-10 bg-primary_300 text-netural_300 text-center text-sm md:text-lg font-bold border hover:bg-primary_100 rounded-md px-5 transition duration-300 ease focus:outline-none focus:border-primary_100'>প্রোফাইল</Link>
					:
					<Link to='login/' className='mt-10 bg-primary_300 text-netural_300 text-center text-sm md:text-lg font-bold border hover:bg-primary_100 rounded-md px-5 transition duration-300 ease focus:outline-none focus:border-primary_100'>লগইন</Link>
			}
		</ul>
	</nav>
	)
}

export default Navgiation