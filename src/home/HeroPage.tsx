import React from 'react'
import { Link } from 'react-router'
import heroBlob from '../assets/bloodTube.svg'
import bloodBankLogo from '../assets/blood bank logo.svg'

function HeroPage() {
	return (
		<section className='w-full h-screen bg-netural_300 '>
			<nav className='absolute w-full flex pl-14 pt-10 gap-30 items-center bg-transparent z-10'>

				<a href="#" className='flex items-center'>
					<img src={bloodBankLogo} className='w-[60%]' alt="blood bank logo" />
					<p className='text-lg/5 w-4 text-primary_300 font-bold'>ব্লাড ব্যাংক</p>
				</a>

				<ul className='flex gap-10 items-center w-1/4 font-bold text-lg text-primary_300'>
					<Link to='' className='hover:text-primary_100 hover:underline'>হোম</Link>
					<Link to='' className='hover:text-primary_100 hover:underline'>ভোলান্টিযারিং</Link>
					<Link to='' className='hover:text-primary_100 hover:underline'>যোগাযোগ</Link>
				</ul>
			</nav>
			<div className='grid grid-cols-1 md:grid-cols-2 '>
				<div className='flex flex-col justify-center items-start pl-14 '>
					<h1 className='!text-6xl/22 font-extrabold text-primary_300'>আপনার রক্ত, অন্য জনের
						বেছে থাকার আশা ।</h1>
					<h2 className='tracking-wider mt-2 text-primary_100 line-clamp-30 underline'>কারও জীবনের দ্বিতীয় সুযোগ পাওয়ার কারণ হোন </h2>
					<Link to='/register' className='w-[45%] h-[7%] mt-10 bg-primary_300 text-netural_300 text-center text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
				</div>
				<div className='flex flex-col items-end '>
					<img src={heroBlob} alt="bloodbank_hero_tube" className='w-[82%] ' />
				</div>
			</div>
			<div className='h-8 w-full bg-primary_300'></div>
		</section>
	)
}

export default HeroPage