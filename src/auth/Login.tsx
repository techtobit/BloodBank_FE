import React from 'react'
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg';
import roundShape from '../assets/svg/round.svg';
import leaf from '../assets/svg/leaf.svg';
import leaf70deg from '../assets/svg/leaf70deg.svg';
import leafGray from '../assets/svg/leafGray.svg';
import fill_Plus from '../assets/svg/Fill_Plus.svg';
import plus from '../assets/svg/plus.svg';
import uShape from '../assets/svg/uShape.svg';
import lShape from '../assets/svg/lShape.svg';
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { LogInInputType } from '../utils/type';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function Login():React.ReactElement {

	const { register, reset, handleSubmit, formState: { errors } } = useForm<LogInInputType>();
	
	const onSubmit = (data:LogInInputType) => {
		const url = `${BASE_API_URL}login/`;
		axios.post(url, data)
		.then(response => {
			console.log(response.data);
			
			localStorage.setItem('token', response.data.token);
			localStorage.setItem('user_id', response.data.user_id);
			toast.success('লগইন সফল হয়েছে');
			reset();
		})
		.catch(function (error) {
			toast.error(error.response.data.error);
			console.log(error.config);
		})
	}
	return (
		<div className='w-full h-screen bg-netural_300 flex justify-center items-center'>
			<div className='reletive'>
				<img src={roundShape} alt="roundShape" className='absolute left-[1%] bottom-0' />
				<img src={leaf} alt="leaf_blob" className='absolute left-[4%] -bottom-0' />
				<img src={fill_Plus} alt="fill_Plus" className='absolute w-8 left-0 top-[10%]' />
				<img src={fill_Plus} alt="fill_Plus" className='absolute w-8 left-[41%] bottom-[6%]' />
				<img src={plus} alt="plus" className='absolute w-10 left-[19%] top-[30%]' />
				<img src={uShape} alt="uShape" className='absolute right-[0%] top-[0%]' />
				<img src={fill_Plus} alt="fill_Plus" className='absolute right-[4%] top-[4%]' />
				<img src={lShape} alt="lShape" className='absolute right-[0%] bottom-[0%]' />
				<img src={leaf70deg} alt="leaf70deg" className='absolute right-[4%] bottom-0' />
				<img src={leafGray} alt="leafGray" className='absolute right-[20%] bottom-0' />
			</div>
			<div className='w-95 h-95 z-10 bg-white/30 backdrop-invert backdrop-opacity-10 rounded-lg p-10'>
				<h1 className='font-[800] mb-4 text-primary_300 text-center'>লগইন করুন</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
					<div className="relative ">
						<label className="block mb-1 text-md font-bold text-primary_200">মোবাইল নাম্বার*</label>
						<div className="absolute top-8.5 left-0 flex items-center pl-3">
							<div className="h-full gap-[4px]  text-sm flex justify-center items-center bg-netural_100 text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span className='text-lg font-bold text-primary_100' >+88</span>
								<div className="h-6 border-sm border-l border-primary_100 "></div>
							</div>
						</div>
						<input
							{...register('phone_number', { required: true, minLength: 11, maxLength: 11 })}
							placeholder={errors.phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
							type="tel"
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-22  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							pattern="[0-9]*"
							inputMode="numeric"
							maxLength={11}
							id="phone_number"
						/>
					</div>

					<div className="">
						<label className="block mb-1 text-md font-bold text-primary_200">পাসওয়ার্ড*</label>
						<input {...register("password", { required: true, minLength: 6 })} id='password'
							placeholder={errors.password ? `${errors.password?.type ? 'কমপক্ষে ৬ নাম্বারের পাসওয়ার্ড লিখুন' : 'পাসওয়ার্ড লিখুন'}` : '***********'}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="password" />
					</div>

					<div className={errors.password ? 'pl-2 inline-flex text-primary_100 bg-yellow-500 font-bold' : 'invisible'}>পাসওয়ার্ড লিখুন</div>

					<button className="w-full h-10 flex justify-center items-center bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100">
						সাবমিট
					</button>
					<Link to='/register' className="text-primary_200 text-xs italic py-2 text-center">একাউন্ট নেই? <span className='text-primary_300 font-bold underline'>রেজিস্টেশন করুন</span></Link>
				</form>
			</div>
		</div>
	)
}

export default Login