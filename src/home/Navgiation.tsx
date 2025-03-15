import React from 'react'
import bloodBankLogo from '../assets/blood bank logo.svg'
import { Link } from 'react-router'

function Navgiation():React.ReactElement {
	return (
		<nav className='fixed w-full flex pl-14 pt-10 gap-30 items-center bg-transparent z-10'>
			
			<a href="#" className='flex items-center'>
				<img src={bloodBankLogo} className='w-[60%]' alt="blood bank logo" />
				<p className='text-lg/5 w-4 text-primary_300 font-bold'>ব্লাড ব্যাংক</p>
			</a>

			<ul className='flex gap-10 items-center w-1/4 font-bold text-lg text-primary_300  [&>li:hover]:text-primary_100 [&>li:hover]:underline'>
				<Link to=''>হোম</Link>
				<li>ভোলান্টিযারিং</li>
				<li>যোগাযোগ</li>
			</ul>
		</nav>
	)
}

export default Navgiation