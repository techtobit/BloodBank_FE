import React from 'react'
import { Link } from 'react-router'
import heroBlob from '../assets/bloodTube.svg'
import bloodBankLogo from '../assets/blood bank logo.svg'
import Navgiation from '../shared/Navgiation'
import Nav from '../shared/Nav'
const token = localStorage.getItem('token')

function HeroPage(): React.ReactElement {
	return (
		<section className='w-full h-screen relative bg-netural_300 '>
			<div className='grid grid-cols-1 md:grid-cols-2 '>
				<Nav/>
				{/* <Navgiation /> */}
				<div className='flex flex-col justify-center '>
					<div className='flex flex-col justify-center md:items-start px-4 md:pl-14 my-[50%] md:mt-15  '>
						<h1 className='!text-5xl/18 md:!text-6xl/22  font-extrabold text-primary_300'>আপনার রক্ত, অন্য জনের
							বেছে থাকার আশা ।</h1>
						<h2 className='!text-lg md:text-3xl tracking-wider mt-2 text-primary_100 line-clamp-30 underline'>কারও জীবনের দ্বিতীয় সুযোগ পাওয়ার কারণ হোন </h2>
						<Link to='/register' className='mt-10 bg-primary_300 text-netural_300 text-center text-sm md:text-lg font-bold border hover:bg-primary_100 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
					</div>
				</div>
				<div className='hidden md:flex flex-col items-end '>
					<img src={heroBlob} alt="bloodbank_hero_tube" className='w-[82%] ' />
				</div>
			</div>
			<div className='h-8 w-full absolute bottom-0 bg-primary_300'></div>
		</section>
	)
}

export default HeroPage