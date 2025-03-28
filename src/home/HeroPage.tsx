import React from 'react'
import { Link } from 'react-router'
import heroBlob from '../assets/bloodTube.svg'
import bloodBankLogo from '../assets/blood bank logo.svg'

function HeroPage():React.ReactElement {
	return (
		<section className='w-full h-[89vh] bg-netural_300 '>
			<div className='grid grid-cols-1 md:grid-cols-2 '>
				<div className='flex flex-col '>
					{/* <nav className='w-full flex pl-2 md:pl-10 pt-10 gap-10 md:gap-30 items-center bg-transparent z-10'>

						<a href="#" className='flex items-center'>
							<img src={bloodBankLogo} className='w-[60%]' alt="blood bank logo" />
							<p className='md:!text-lg/5 w-4 text-primary_300 font-bold'>ব্লাড ব্যাংক</p>
						</a>

						<ul className='flex gap-4 md:gap-10 items-center w-1/4 font-bold md:text-lg text-primary_300'>
							<Link to='' className='hover:text-primary_100 hover:underline'>হোম</Link>
							<Link to='' className='hover:text-primary_100 hover:underline'>ভোলান্টিযারিং</Link>
							<Link to='' className='hover:text-primary_100 hover:underline'>যোগাযোগ</Link>
						</ul>
					</nav> */}
					<div className='flex flex-col justify-center items-start pl-4 md:pl-14 mt-15 '>
						<h1 className='!text-5xl/18 md:!text-6xl/22  font-extrabold text-primary_300'>আপনার রক্ত, অন্য জনের
							বেছে থাকার আশা ।</h1>
						<h2 className='!text-lg md:text-3xl tracking-wider mt-2 text-primary_100 line-clamp-30 underline'>কারও জীবনের দ্বিতীয় সুযোগ পাওয়ার কারণ হোন </h2>
						<Link to='/register' className=' mt-10 bg-primary_300 text-netural_300 text-center text-sm md:text-lg font-bold border hover:bg-primary_100 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
					</div>
				</div>
				<div className='hidden md:flex flex-col items-end '>
					<img src={heroBlob} alt="bloodbank_hero_tube" className='w-[72%] ' />
				</div>
			</div>
			<div className='h-8 w-full bg-primary_300'></div>
		</section>
	)
}

export default HeroPage