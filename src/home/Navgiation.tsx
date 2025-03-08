import React from 'react'
import bloodBankLogo from '../assets/blood bank logo.svg'

function Navgiation() {
	return (
		<nav className='flex pl-14 gap-30 items-center bg-netural_300'>
			<a href="#" className='flex items-center'>
				<img src={bloodBankLogo} className='w-[60%]' alt="blood bank logo" />
				<p className='text-lg/5 w-4 text-primary_300 font-bold'>ব্লাড ব্যাংক</p>
			</a>

			<ul className='flex justify-between items-center w-1/4 font-bold text-lg text-primary_300  [&>li:hover]:text-primary_100 [&>li:hover]:underline'>
				<li>হোম</li>
				<li>ভোলান্টিযারিং</li>
				<li>যোগাযোগ</li>
			</ul>
		</nav>
	)
}

export default Navgiation