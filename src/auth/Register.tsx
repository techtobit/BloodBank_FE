import axios from 'axios'
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg'
import { useForm, SubmitHandler } from "react-hook-form"
import {BiRightArrowAlt} from "react-icons/bi";
import donar from '../assets/donar.svg'
import donar_bg_assets from '../assets/donar_bg.svg'

type Inputs = {
	phoneNumber: string,
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
		<>
			<div
			className="h-screen w-full netural_300  grid grid-cols-1 md:grid-cols-2 place-items-center">
				<div className='reletive'>
					<img src={donar} alt="donar_blob" className='absolute left-[-30px] top-0 bottom-0' />
				</div>
				<div className='w-[450px] h-[484px] bg-[#D9D9D9] rounded-lg px-8 py-14 mb-4'>
					<h1 className='text-5xl font-bold text-primary_300 text-center'>রেজিস্টেশন করুন</h1>

				<form onSubmit={handleSubmit(onSubmit)} className="">
					<div className="w-full max-w-sm min-w-[200px] mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">মোবাইল নাম্বার*</label>
						<div className="relative mt-2">
							<div className="absolute top-3.5 left-0 flex items-center pl-3">
								<div className="h-full gap-[4px]  text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span className='text-lg font-bold text-primary_100' >+88</span>
								<div className="h-6 border-sm border-l border-primary_100 "></div>
								</div>
							</div>
							<input
							{...register('phoneNumber')}
								type="tel"
								className="w-full h-14 bg-transparent placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-22 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								placeholder="01886627127"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="phone_number"
							/>
						</div>
						<div className="mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">পাসওয়ার্ড*</label>
							<input {...register("password")} id='password' 
							className="w-full h-14 bg-transparent placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="password" placeholder="***********" />
						</div>
							<p className="text-primary_200 text-xs italic py-2">পাসওয়ার্ড ভুলে গেছেন?  <span className='text-primary_300 font-bold underline'>রিসেট করুন</span></p>
							<button className="w-full h-14 items-center bg-primary_300 text-netural_300 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100">
							পরবর্তী ধাপে যান <BiRightArrowAlt className='inline-block' />
							</button>
							<p className="text-primary_200 text-xs italic py-2 text-center">ইতিমধ্যে একাউন্ট আছে? <span className='text-primary_300 font-bold underline'>লগইন</span></p>

					</div>
					{errors.phoneNumber && <span className="text-red-500">This field is required</span>}
					{errors.password && <span className="text-red-500">This field is required</span>}
					{errors.password?.type === "minLength" && <span className="text-red-500">This field is required to be at least 6 characters</span>}
				</form>
				</div>
			</div >
		</>
	)
}

export default Register