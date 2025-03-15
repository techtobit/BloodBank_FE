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
import { RegisterInputType, DistrictType, UpazilaType } from '../utils/type';


function Register() {

	const { register, watch, handleSubmit, formState: { errors } } = useForm< RegisterInputType>();
	const [district, setDistrict] = useState<DistrictType[]>([])
	const [upazila, setUpazila] = useState<UpazilaType[]>([])


	function getDistrict(v: string) {
		axios.get(`https://bdapi.editboxpro.com/api/districts/${v}`)
			.then(response => {
				setDistrict(response.data);
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}
	function getUpazilas(v: string) {
		axios.get(`https://bdapi.editboxpro.com/api/upazilas/${v}`)
			.then(response => {
				setUpazila(response.data);
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}


	const handleChangeDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const v = e.target.value;
		getDistrict(v);
	}
	const handleChangeUpazila = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const v = e.target.value;
		getUpazilas(v);
	}



	const onSubmit: SubmitHandler< RegisterInputType> = ({ confirm_password: _, ...rest})=> {
		console.log(rest)
		axios.post('http://127.0.0.1:8000/register/', rest)
			.then(response => {
				console.log(response.data);

			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}


	return (

		<div
			className="h-screen w-full bg-netural_300 grid grid-cols-1 md:grid-cols-2 place-items-center">
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

				<h1 className='font-[800] text-primary_300 text-center my-5'>রেজিস্টেশন করুন</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1  md:grid-cols-2 gap-2 items-center justify-center">
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">নাম*</label>
						<input 
							id='full_name'
							{...register("full_name", { required: true, maxLength: 30 })}
							placeholder={errors.full_name ? 'এই ঘরটি পূরণ করেনি' : 'সম্পূর্ন নাম লিখুন'}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="text"  />
					</div>
					<div className="relative md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">মোবাইল নাম্বার*</label>
						<div className="absolute top-8.5 left-0 flex items-center pl-3">
							<div className="h-full gap-[4px]  text-sm flex justify-center items-center bg-netural_100 text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span className='text-lg font-bold text-primary_100' >+88</span>
								<div className="h-6 border-sm border-l border-primary_100 "></div>
							</div>
						</div>
						<input 
							{...register('phoneNumber', { required: true, minLength: 11, maxLength: 11 })}
							placeholder={errors.phoneNumber ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
							type="tel"
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-22  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							pattern="[0-9]*"
							inputMode="numeric"
							maxLength={11}
							id="phone_number"
						/>
					</div>
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200 ">রক্তের গ্রুপ*</label>
						<select {...register("blood_group")} id='blood_group'
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
						>
							<option value="" disabled selected className=''>রক্তের গ্রুপ নির্বাচন করুন</option>
							<option value="A+ (এ পজেটিভ)" className=''>A+ (এ পজেটিভ)</option>
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
						<label className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
						<select {...register("division", { required: true })} id='division' onChange={handleChangeDistrict}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
						>
							<option value="" disabled selected className=''  >বিভাগ নির্বাচন করুন</option>
							<option value="dhaka">ঢাকা</option>
							<option value="chittagong">চট্টগ্রাম</option>
							<option value="barisal" className=''>বরিশাল</option>
							<option value="khulna">খুলনা</option>
							<option value="mymensingh">ময়মনসিংহ</option>
							<option value="rajshahi">রাজশাহী</option>
							<option value="rangpur">রংপুর</option>
							<option value="sylhet">সিলেট</option>

						</select>
					</div>
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">জেলা*</label>
						<select  {...register("district", { required: true })} id='district' onChange={handleChangeUpazila}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
						<label className="block mb-1 text-md font-bold text-primary_200">উপজেলা*</label>
						<select  {...register("upazila", { required: true })} id='upazila'
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
						<label className="block mb-1 text-md font-bold text-primary_200">পাসওয়ার্ড*</label>
						<input {...register("password", { required: true, minLength:6 })} id='password'
						placeholder={errors.password ? `${errors.password?.type ? 'কমপক্ষে ৬ নাম্বারের পাসওয়ার্ড লিখুন' :'পাসওয়ার্ড লিখুন'}` : '***********'}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="password"  />
					</div>
					<div className="md:mt-4">
						<label className="block mb-1 text-md font-bold text-primary_200">একই পাসওয়ার্ড*</label>
						<input id='confirm_password'
							{...register("confirm_password", {
								required: true,
								validate: (value) => value === watch("password") || "পাসওয়ার্ড মিলে নি"
							})}
							className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
							type="password" placeholder="***********" />
					</div>
					
					<div className={errors.confirm_password ? 'col-span-1 md:col-span-2 pl-2 inline-flex text-primary_100 bg-yellow-500 font-bold':'invisible'}>{errors.confirm_password && errors.confirm_password.message}</div>

					<div className="mt-4 col-span-1 md:col-span-2 text-center">
						<button className="w-full h-10 flex justify-center items-center bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md transition duration-300 ease focus:outline-none focus:border-primary_100">
							সাবমিট
						</button>
						<Link to='/login' className="text-primary_200 text-xs italic ">ইতিমধ্যে একাউন্ট আছে? <span className='text-primary_300 font-bold underline'>লগইন</span></Link>
					</div>
				</form>
			</div>
		</div >

	)
}

export default Register