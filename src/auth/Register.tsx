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
import { useState } from 'react';
import { Link } from 'react-router';
import { RegisterInputType } from '../utils/type';
import useGeoDetails from '../hook/useGeoDetails';
import { toast } from 'react-toastify';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function Register() {

	const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterInputType>();
	const [findUnder, setFindUnder] = useState<string>()
	const [searchQuery, setSearchQuery] = useState<string>()

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.id;
		const value = e.target.value;
		setFindUnder(id)
		setSearchQuery(value)
	}

	const [district, upazila] = useGeoDetails(findUnder, searchQuery)


	const onSubmit: SubmitHandler<RegisterInputType> = ({ confirm_password: _, ...rest }) => {
		axios.post(`${BASE_API_URL}register/`, rest)
			.then(response => {
				toast.success(response.data.message);
			})
			.catch(function (error) {
				if (error.response) {
					if (error.response.data.phone_number) {
						toast.error('মোবাইল নাম্বারটি দিয়ে ইতিমধ্যে একউন্ট তৈরি হয়েছে!');
					}
					else if (error.response.status == 500) {
						toast.error('সারর্ভার সমস্যার কারণে একউন্ট তৈরিতে ব্যর্থ')
					}
					else if (error.response.status == 400) {
						toast.error('ইন্টানেট সমস্যার কারণে একউন্ট তৈরিতে ব্যর্থ ')
					}
				}
				else if (error.code === "ERR_NETWORK") {
					toast.error('ইন্টানেট সংযোগ বিচিন্ন')
				}
				else if (error.request) {
					console.log(error.request);
				}
				else {
					console.log('Error', error.message);
				}
				console.log(error.config);
			})

	}


	return (

		<div
			className="min-h-screen w-full bg-netural-300 grid grid-cols-1 md:grid-cols-2 place-items-center">
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
			<div className='w-full z-10 bg-white/30 backdrop-invert backdrop-opacity-10 rounded-lg px-5 md:px-8 py-5 md:m-0 mr-0 md:mr-[15%]  '>

				<h1 className='font-[800] text-primary-300 text-center my-5'>রেজিস্টেশন করুন</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1  md:grid-cols-2 gap-2 items-center justify-center">
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary-200">নাম*</label>
						<input
							id='full_name'
							{...register("full_name", { required: true, maxLength: 30 })}
							placeholder={errors.full_name ? 'এই ঘরটি পূরণ করেনি' : 'সম্পূর্ন নাম লিখুন'}
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
							type="text" />
					</div>
					<div className="relative md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary-200">মোবাইল নাম্বার*</label>
						<div className="absolute top-8.5 left-0 flex items-center pl-3">
							<div className="h-full gap-[4px]  text-sm flex justify-center items-center bg-netural-100 text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span className='text-lg font-bold text-primary-100' >+88</span>
								<div className="h-6 border-sm border-l border-primary-100 "></div>
							</div>
						</div>
						<input
							{...register('phone_number', { required: true, minLength: 11, maxLength: 11 })}
							placeholder={errors.phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
							type="tel"
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-22  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
							pattern="[0-9]*"
							inputMode="numeric"
							maxLength={11}
							id="phone_number"
						/>
					</div>
					<div className="md:mt-4">
						<label htmlFor='blood_group' className="block mb-1 text-md font-bold text-primary-200 ">রক্তের গ্রুপ*</label>
						<select {...register("blood_group")} id='blood_group'
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
						>
							<option value="" disabled selected className=''>রক্তের গ্রুপ নির্বাচন করুন</option>
							<option value="A+" className=''>A+ (এ পজেটিভ)</option>
							<option value="A-">A- (এ নেগেটিভ)</option>
							<option value="B+">B+ (বি পজেটিভ)</option>
							<option value="B-">B- (বি নেগেটিভ)</option>
							<option value="AB+">AB+ (এবি পজেটিভ)</option>
							<option value="AB-">AB- (এবি নেগেটিভ)</option>
							<option value="O+">O+ (ও পজেটিভ)</option>
							<option value="O-">O- (ও নেগেটিভ)</option>

						</select>
					</div>
					<div className="md:mt-4">
						<label htmlFor='division' className="block mb-1 text-md font-bold text-primary-200 ">বিভাগ*</label>
						<select {...register("division", { required: true })} name='division' id='districts' onChange={handleSelectAddress}
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
						>
							<option value="" disabled selected className=''  >বিভাগ নির্বাচন করুন</option>
							<option value="Dhaka">ঢাকা</option>
							<option value="Chittagong">চট্টগ্রাম</option>
							<option value="Barisal" className=''>বরিশাল</option>
							<option value="Khulna">খুলনা</option>
							<option value="Mymensingh">ময়মনসিংহ</option>
							<option value="Rajshahi">রাজশাহী</option>
							<option value="Rangpur">রংপুর</option>
							<option value="Sylhet">সিলেট</option>

						</select>
					</div>
					<div className="md:mt-4">
						<label htmlFor='district' className="block mb-1 text-md font-bold text-primary-200">জেলা*</label>
						<select  {...register("district", { required: true })} name='district' id='upazilas' onChange={handleSelectAddress}
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
						>
							<option value="" disabled selected className=''>জেলা নির্বাচন করুন</option>
							{
								district.map((items, index) => (
									<option key={index} value={items?.name} className=''>{items?.name_bn}</option>
								))
							}
						</select>
					</div>
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary-200">উপজেলা*</label>
						<select  {...register("upazila", { required: true })} name='upazila'
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
						>
							<option value="" disabled selected className=''>উপজেলা নির্বাচন করুন</option>
							{
								upazila.map((items, index) => (
									<option key={index} value={items?.name}>{items?.name_bn}</option>
								))
							}
						</select>
					</div>

					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary-200">পাসওয়ার্ড*</label>
						<input {...register("password", { required: true, minLength: 6 })} id='password'
							placeholder={errors.password ? `${errors.password?.type ? 'কমপক্ষে ৬ নাম্বারের পাসওয়ার্ড লিখুন' : 'পাসওয়ার্ড লিখুন'}` : 'কমপক্ষে ৬ নাম্বারের পাসওয়ার্ড লিখুন'}
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
							type="password" />
					</div>
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary-200">একই পাসওয়ার্ড*</label>
						<input id='confirm_password'
							{...register("confirm_password", {
								required: true,
								validate: (value) => value === watch("password") || "পাসওয়ার্ড মিলে নি"
							})}
							className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
							type="password" placeholder="***********" />
					</div>

					<div className={errors.confirm_password ? 'col-span-1 md:col-span-2 pl-2 inline-flex text-primary-100 bg-yellow-500 font-bold' : 'invisible'}>{errors.confirm_password && errors.confirm_password.message}</div>

					<div className="mt-4 col-span-1 md:col-span-2 text-center">
						<button className="w-full h-10 flex justify-center items-center bg-primary-300 text-netural-300 text-lg font-bold border hover:bg-primary-100 rounded-md transition duration-300 ease focus:outline-none focus:border-primary-100">
							সাবমিট
						</button>
						<Link to='/login' className="text-primary-200 text-xs italic ">ইতিমধ্যে একাউন্ট আছে? <span className='text-primary-300 font-bold underline'>লগইন</span></Link>
					</div>
				</form>
			</div>
		</div >

	)
}

export default Register