import React from 'react'
import playStore from '../assets/play_store.svg';
import appStore from '../assets/app_store.svg';

function Footer():React.ReactElement {
	return (
		<footer>
		<div className='w-full bg-secondary_100 grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10 p-10'>
			<div>
				<h5 className='font-bold text-primary_300 pb-2'>যোগাযোগ</h5>
				<p>চট্টগ্রাম, বান্দরবান, বোয়লখালী</p>
				<p>0188627127</p>
				<p>dev.ashraf.uddin@gmail.com</p>
			</div>
			<div>
				<h5 className='font-bold text-primary_300 pb-2'>যোগ দিন</h5>
				<p>রক্ত দাতা হিসাবে</p>
				<p>রক্ত গৃহিতা হিসাবে</p>
				<p>ডেবলপার টিম মেম্ব‌‌‌ার হিসাবে</p>
			</div>
			<div className='hidden md:flex flex-col'>
				<h5 className='font-bold text-primary_300 pb-2'>অন্যান প্ল্যাটফর্ম </h5>
				<img src={appStore} alt="app store" className='w-34' />
				<img src={playStore} alt="play store" className='w-34' />
			</div>
		</div>
		<div className='w-full h-[60px] bg-primary_200 text-netural_300 flex flex-col md:flex-row items-center justify-center'>
			<a href="https://ashrafuddin.vercel.app/" target='_blank'>তৈরী করেছেন - <span className='underline'>আশরাফ উদ্দীন</span>  | </a>
			<p className=''> &copy; কপিরাইট ২০২৫ | All Rights Reserved</p>
		</div>
		</footer>
	)
}

export default Footer