import axios from 'axios';
import React, { useState } from 'react'
import Input from '../shared/Input';
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg';
import { useForm } from 'react-hook-form';
import useGeoDetails from '../hook/useGeoDetails';
import BackgroundAsset from '../shared/BackgroundAsset';
import Tooltip from '../shared/Tooltip';
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function UserProfile(): React.ReactElement {
	const [user, setUser] = React.useState<any>([]);
	const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
	const [isEditAtctive, setIsEditAtctive] = React.useState<boolean>(false);
	const { register, handleSubmit, formState: { errors } } = useForm();
	const [findUnder, setFindUnder] = useState<string>()
	const [searchQuery, setSearchQuery] = useState<string>()

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.id;
		const value = e.target.value;
		setFindUnder(id)
		setSearchQuery(value)
	}

	const [district, upazila] = useGeoDetails(findUnder, searchQuery)

	React.useEffect(() => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user_id');
		if (token) {
			const url = `${BASE_API_URL}profile/${userId}/`;
			axios.get(url, {
				headers: {
					'Authorization': `Token ${token}`
				}
			})
				.then(response => {
					console.log(response.data);
					setUser(response.data);
				})
				.catch(function (error) {
					console.log(error);
				})
		}
	}, [])



	const onSubmit = (data: any) => {
		console.log(data);
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('user_id');
		const url = `${BASE_API_URL}profile/${userId}/`;
		console.log(data);
		axios.put(url, data, {
			headers: {
				'Authorization': `Token ${token}`
			}
		})
			.then(response => {
				console.log(response.data);
				setUser(response.data);
				setIsEditAtctive(false);
			})
			.catch(function (error) {
				console.log(error);
			})
	}





	return (
		<>
			<BackgroundAsset />
			<div className='w-full h-screens flex items-center relative'>
				<div className='w-1/5 h-[80vh] flex flex-col p-4 ml-4 bg-secondary_300/30 backdrop-invert backdrop-opacity-10 rounded-md shadow-lg border-r border-primary_300'>
					<div className='w-full flex flex-col items-center justify-center gap-2'>
						<img className='w-20 h-20 bg-netural_100 rounded-full border-primary_300 border'
							src="https://api.dicebear.com/9.x/avataaars/svg?seed=Jude"
							alt="avatar" />
						<p className='text-md font-bold text-primary_200 text-center'>স্বাগতম {user?.full_name}</p>
					</div>
					<ul className='pt-6 flex flex-col gap-4'>
						<li onClick={() => setIsActiveBtn(true)} className={`w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 ${isActiveBtn ? "text-netural_100 bg-primary_300" : "bg-netural_100 text-primary_300 hover:bg-primary_100 hover:text-netural_300"}`}>প্রোফাইল</li>
						<li onClick={() => setIsActiveBtn(false)} className={`w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 ${!(isActiveBtn) ? "text-netural_100 bg-primary_300" : "bg-netural_100 text-primary_300 hover:bg-primary_100 hover:text-netural_300"}`}>Profile</li>
					</ul>
				</div>

				<div className='px-10 w-full h-full'>
					<div className='h-20 bg-primary_300/80 flex items-center justify-center text-netural_300 font-bold text-lg rounded-md shadow-md'>
						আপনার প্রোফাইল আপডেইট করুন
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 mt-2 bg-white/30 backdrop-invert backdrop-opacity-10 px-10 py-2 rounded-md shadow-lg">
						<div className="">
							<label className="block mb-2 text-md font-bold text-primary_200">নাম*</label>
							<input
								id='full_name'
								disabled={!isEditAtctive}
								defaultValue={user?.full_name}
								{...register("full_name", { required: true, maxLength: 30 })}
								placeholder={errors.full_name ? 'এই ঘরটি পূরণ করেনি' : ''}
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text" />
						</div>
						<div className="relative ">
							<label className="block mb-2 text-md font-bold text-primary_200">মোবাইল নাম্বার*</label>
							<div className="absolute top-10 left-0 flex items-center pl-3">
								<div className="h-full gap-2 text-sm flex items-center bg-netural_100 text-slate-700">
									<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" className="w-6 h-4" />
									<span className='text-lg font-bold text-primary_100'>+88</span>
									<div className="h-6 border-l border-primary_100"></div>
								</div>
							</div>
							<input
								id='phone_number'
								disabled={!isEditAtctive}
								defaultValue={user?.phone_number}
								{...register('phone_number', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
								type="tel"
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pl-24 pr-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
							/>
						</div>
						<div className="md:mt-4">
							<label htmlFor='blood_group' className="block mb-2 text-md font-bold text-primary_200 ">রক্তের গ্রুপ*</label>
							<select disabled={!isEditAtctive} {...register("blood_group")} id='blood_group'
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
							>
								<option defaultValue={user?.blood_group} selected className=''>{user?.blood_group}</option>
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
						<div className="md:mt-4 group relative">
							<label className="block mb-2 text-md font-bold text-primary_200">মোট রক্তদান</label>
							<input
								id='total_donation'
								disabled
								defaultValue={user?.total_donation}
								{...register("total_donation", { required: true, maxLength: 30 })}
								placeholder={errors.total_donation ? 'এই ঘরটি পূরণ করেনি' : ' '}
								className="w-full h-12 bg-netural_200 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="number" />
							<Tooltip children={'এডিট কারা যাবে না'} />
						</div>
						<div className="md:mt-4">
							<label className="block mb-2 text-md font-bold text-primary_200">শেষ রক্তদান</label>
							<input
								id='last_donation_date'
								disabled
								defaultValue={user?.last_donation_date}
								value={(user?.last_donation_date) ? user?.last_donation_date : 'রক্তদান দেননি'}
								{...register("last_donation_date")}
								placeholder={errors.last_donation_date ? 'এই ঘরটি পূরণ করেনি' : ' '}
								className="w-full h-12 bg-netural_200 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text" />
						</div>
						<div className="md:mt-4">
							<label htmlFor='division' className="block mb-2 text-md font-bold text-primary_200 ">বিভাগ*</label>
							<select disabled={!isEditAtctive} {...register("division", { required: true })} name='division' id='districts' onChange={handleSelectAddress}
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
							>
								<option defaultValue={user?.division} selected className=''  >{user?.division}</option>
								<option value="Dhaka">ঢাকা</option>
								<option value="Chittagong">চট্টগ্রাম</option>
								<option value="Barisal" >বরিশাল</option>
								<option value="Khulna">খুলনা</option>
								<option value="Mymensingh">ময়মনসিংহ</option>
								<option value="Rajshahi">রাজশাহী</option>
								<option value="Rangpur">রংপুর</option>
								<option value="Sylhet">সিলেট</option>

							</select>
						</div>
						<div className="md:mt-4">
							<label htmlFor='district' className="block mb-2 text-md font-bold text-primary_200">জেলা*</label>
							<select disabled={!isEditAtctive} {...register("district", { required: true })} name='district' id='upazilas' onChange={handleSelectAddress}
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
							>
								<option defaultValue={user?.district} selected className=''>{user?.district}</option>
								{
									district.map((items, index) => (
										<option key={index} value={items?.name} className=''>{items?.name_bn}</option>
									))
								}
							</select>
						</div>
						<div className="md:mt-4">
							<label className="block mb-2 text-md font-bold text-primary_200">উপজেলা*</label>
							<select disabled={!isEditAtctive} {...register("upazila", { required: true })} name='upazila'
								className="w-full h-12 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
							>
								<option defaultValue={user?.upazila} selected className=''>{user?.upazila}</option>
								{
									upazila.map((items, index) => (
										<option key={index} value={items?.name}>{items?.name_bn}</option>
									))
								}
							</select>
						</div>
						<div className="md:mt-4">
							<label className="block mb-2 text-md font-bold text-primary_200">শেষ লগইন</label>
							<input
								id='last_login'
								disabled
								defaultValue={user?.last_login}
								{...register("last_login", { required: true, maxLength: 30 })}
								placeholder={errors.last_login ? 'এই ঘরটি পূরণ করেনি' : ''}
								className="w-full h-12 bg-netural_200 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text" />
						</div>
						<div className="md:mt-4">
							<label className="block mb-2 text-md font-bold text-primary_200">একাউন্ট তৈরি হয়েছে</label>
							<input
								id='created_at'
								disabled
								defaultValue={user?.created_at}
								{...register("created_at", { required: true, maxLength: 30 })}
								placeholder={errors.created_at ? 'এই ঘরটি পূরণ করেনি' : ''}
								className="w-full h-12 bg-netural_200 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text" />
						</div>

						<button className={`mt-6 col-span-2 h-12 rounded-md font-bold transition-all duration-300 ${isEditAtctive ? 'bg-primary_200 text-netural_200 hover:bg-primary_100' : 'bg-primary_300 text-netural_300 border border-primary_300 hover:bg-primary_100 hover:text-secondary_100'}`}
							onClick={() => setIsEditAtctive(!isEditAtctive)}>{isEditAtctive ? 'সেইভ করুন' : 'প্রোফাইল আপডেট করুন'}
						</button>
					</form>
				</div>
			</div>
		</>
	)
}
export default UserProfile;