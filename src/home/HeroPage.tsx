import React from 'react'
import { Link } from 'react-router'
import heroBlob from '../assets/bloodTube.svg'
import heroBlobMobile from '../assets/heroblob_mobile.svg'
import Nav from '../shared/Nav'

function HeroPage(): React.ReactElement {
	return (
		<section className='w-full h-screen relative bg-netural-300 '>
				<Nav/>
			<div className='w-full h-full flex flex-col-reverse md:flex-row items-center justify-center'>
				<div className='flex flex-col justify-center mx-5 md:mx-0'>
					<div className='flex flex-col justify-center md:items-start md:pl-14 mt-[20%] md:mt-0'>
						<h1 className='!text-5xl/18 md:!text-6xl/22  font-extrabold text-primary-300'>আপনার রক্ত, অন্য জনের
							বেছে থাকার আশা ।</h1>
						<h2 className='!text-lg md:!text-3xl tracking-wider mt-2 text-primary-100 line-clamp-30 underline'>কারও জীবনের দ্বিতীয় সুযোগ পাওয়ার কারণ হোন </h2>
						<Link to='/register' className='mt-10 bg-primary-300 text-netural-300 text-center text-sm md:text-lg font-bold border hover:bg-primary-100 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-primary-100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
					</div>
				</div>
				<div className='md:hidden flex flex-col '>
					<img src={heroBlobMobile} alt="bloodbank_hero_tube" className='w-[72%] ' />
				</div>
				<div className='hidden md:w-2/3 md:flex flex-col items-end '>
					<img src={heroBlob} alt="bloodbank_hero_tube" className='!w-[87%] ' />
				</div>
			</div>
			<div className='h-8 w-full absolute bottom-0 bg-primary-300'></div>
		</section>
	)
}

export default HeroPage