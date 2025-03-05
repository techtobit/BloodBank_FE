import axios from 'axios'
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg';
import { useForm, SubmitHandler } from "react-hook-form";
import donar from '../assets/donar.svg';
import roundShape from '../assets/svg/round.svg';
import leaf from '../assets/svg/leaf.svg';
import leaf70deg from '../assets/svg/leaf70deg.svg';
import leafGray from '../assets/svg/leafGray.svg';
import fill_Plus from '../assets/svg/Fill_Plus.svg';
import plus from '../assets/svg/plus.svg';
import uShape from '../assets/svg/uShape.svg';
import lShape from '../assets/svg/lShape.svg';



type Inputs = {
	phoneNumber: number,
	country: string,
	division: string,
	district: string,
	upazila: string,
	password: string
}


function Register() {

	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
		axios.post('http://127.0.0.1:8000/user/register/', data)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}

	return (

		<div
			className="h-screen w-full overflow-hidden netural_300 grid grid-cols-2 place-items-center">
			<div className='reletive'>
				<img src={roundShape} alt="roundShape" className='absolute left-[1%] bottom-0' />
				<img src={donar} alt="donar_blob" className='absolute w-[550px] left-[-2%] bottom-[13%]' />
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
			<div className='w-full z-10 bg-white/30 backdrop-invert backdrop-opacity-10 rounded-lg  px-8 py-14 mr-[10%]'>

				<h1 className='text-5xl font-[800] text-primary_300 text-center'>রেজিস্টেশন করুন</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 items-center justify-center">
					{/* <div className="w-full max-w-sm min-w-[200px] mt-4"> */}
					<div className="relative mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">মোবাইল নাম্বার*</label>
						<div className="absolute top-10.5 left-0 flex items-center pl-3">
							<div className="h-full gap-[4px]  text-sm flex justify-center items-center bg-netural_100 text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span className='text-lg font-bold text-primary_100' >+88</span>
								<div className="h-6 border-sm border-l border-primary_100 "></div>
							</div>
						</div>
						<input
							{...register('phoneNumber')}
							type="tel"
							className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-22 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							placeholder="01886627127"
							pattern="[0-9]*"
							inputMode="numeric"
							maxLength={11}
							id="phone_number"
						/>
					</div>
					<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200 ">দেশ*</label>
						<input {...register("country")} id='country'
							className="w-full h-14 cursor-not-allowed  bg-netural_300 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="text" placeholder="বাংলাদেশ"  value='বাংলাদেশ' />
					</div>
					<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">বিভাগ*</label>
						<input {...register("division")} id='division'
							className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="text" placeholder="" />
					</div>
					<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">জেলা*</label>
						<input {...register("password")} id='password'
							className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="text" placeholder="" />
					</div>
					<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">উপজেলা*</label>
						<input {...register("upazila")} id='upazila'
							className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="text" placeholder="" />
					</div>
					<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">পাসওয়ার্ড*</label>
						<input {...register("password")} id='password'
							className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="password" placeholder="***********" />
					</div>
					<div className="mt-4 col-span-2">

						{/* <p className="text-primary_200 text-xs italic py-2">পাসওয়ার্ড ভুলে গেছেন?  <span className='text-primary_300 font-bold underline'>রিসেট করুন</span></p> */}
						<button className="w-full h-14 items-center bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100">
						সাবমিট 
						</button>
						<p className="text-primary_200 text-xs italic py-2 text-center">ইতিমধ্যে একাউন্ট আছে? <span className='text-primary_300 font-bold underline'>লগইন</span></p>
					</div>
					{/* </div> */}
					{errors.phoneNumber && <span className="text-red-500">This field is required</span>}
					{errors.password && <span className="text-red-500">This field is required</span>}
					{errors.password?.type === "minLength" && <span className="text-red-500">This field is required to be at least 6 characters</span>}
				</form>
			</div>
		</div >

	)
}

export default Register