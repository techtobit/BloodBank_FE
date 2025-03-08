import React from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiDonateHeart, BiSolidPhone } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import avatar from '../assets/person.png'

function DonnarList() {
	return (
		<section
			style={{
				backgroundImage: `url(${donnarBgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
			className='w-full h-screen bg-netural_300'>
			<div className=''>
				<div className='flex w-82 h-30  bg-white/60 gap-4 justify-center items-center rounded-lg shadow-lg  '>
					<img src={avatar} alt="" />
					<div>
						<p className='flex items-center gap-2 '><BiDroplet /> <span className='bg-primary_200 text-netural_300 px-2'>A+ (এ পজেটিভ)</span></p>
						<h4 className='flex items-center gap-2'><BiSolidUser /> আশরাফ উদ্দীন</h4>
						<p className='flex items-center gap-2 text-xm font-extralight'><BiSolidLocationPlus />চট্টগ্রাম, বান্দরবান, বোয়লখালী</p>
						<p className='flex items-center gap-2'><BiDonateHeart /> ২ বার রক্ত দান</p>
						<p className='flex items-center gap-2'><BiSolidPhone /> ০১৭১১১১১১১</p>
					</div>
				</div>
			</div>
		</section>
	)
}

export default DonnarList