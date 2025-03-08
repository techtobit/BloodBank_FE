import React from 'react'
import heroBlob from '../assets/bloodTube.svg'
import { Link } from 'react-router'

function HeroPage() {
	return (
		<section className='w-full h-screen  bg-netural_300 '>	
		<div className='grid grid-cols-1 md:grid-cols-2 '>
			<div className='flex flex-col justify-center items-start pl-14 '>
				<h1 className='text-6xl/22 font-extrabold text-primary_300'>আপনার রক্ত, অন্য জনের
					বেছে থাকার আশা ।</h1>
				<p className='text-3xl mt-2 text-primary_100 line-clamp-30 underline'>কারও জীবনে দ্বিতীয় সুযোগ পাওয়ার কারণ হোন </p>
				<Link to='/register'  className='w-[45%] h-[7%] mt-10 bg-primary_300 text-netural_300 text-center text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
			</div>
			{/* <div className='aboslute -top-[50%]'> */}
			<div className='flex flex-col items-end '>
				<img src={heroBlob} alt="bloodbank_hero_tube" className='w-[82%] ' />
			</div>
		</div>
		<div className='h-8 w-full bg-primary_300'></div>
		</section>
	)
}

export default HeroPage