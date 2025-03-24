import axios from 'axios';
import React, { useState } from 'react'
import Input from '../shared/Input';
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg';
import { useForm } from 'react-hook-form';
import useGeoDetails from '../hook/useGeoDetails';
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

function UserProfile(): React.ReactElement {
	const [user, setUser] = React.useState<any>([]);
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
		// console.log(data);
		// axios.put(url, data, {
		// 	headers: {
		// 		'Authorization': `Token ${token}`
		// 	}
		// })
		// .then(response => {
		// 	console.log(response.data);
		// 	setUser(response.data);
		// 	setIsEditAtctive(false);
		// })
		// .catch(function (error) {
		// 	console.log(error);
		// })
	}





	return (
		<div className='w-full h-screen bg-netural_300 flex justify-center items-center'>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full gird grid-cols-2 bg-netural_100 p-4 rounded-md">
				<div className="md:mt-4">
					<label className="block mb-1 text-md font-bold text-primary_200">নাম*</label>
					<input
						id='full_name'
						disabled={!isEditAtctive}
						defaultValue={user?.full_name}
						{...register("full_name", { required: true, maxLength: 30 })}
						placeholder={errors.full_name ? 'এই ঘরটি পূরণ করেনি' : 'সম্পূর্ন নাম লিখুন'}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
						type="text" />
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
						id='phone_number'
						disabled={!isEditAtctive}
						defaultValue={user?.phone_number}
						{...register('phone_number', { required: true, minLength: 11, maxLength: 11 })}
						placeholder={errors.phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
						type="tel"
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-22  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
						pattern="[0-9]*"
						inputMode="numeric"
						maxLength={11}
					/>
				</div>
				<div className="md:mt-4">
					<label htmlFor='blood_group' className="block mb-1 text-md font-bold text-primary_200 ">রক্তের গ্রুপ*</label>
					<select disabled={!isEditAtctive} {...register("blood_group")} id='blood_group'
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
					>
						<option defaultValue={user?.blood_group}  selected className=''>{user?.blood_group}</option>
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
					<label htmlFor='division' className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
					<select disabled={!isEditAtctive} {...register("division", { required: true })} name='division' id='districts' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<label htmlFor='district' className="block mb-1 text-md font-bold text-primary_200">জেলা*</label>
					<select disabled={!isEditAtctive} {...register("district", { required: true })} name='district' id='upazilas' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<label className="block mb-1 text-md font-bold text-primary_200">উপজেলা*</label>
					<select disabled={!isEditAtctive} {...register("upazila", { required: true })} name='upazila'
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3  transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
					>
						<option defaultValue={user?.upazila} selected className=''>{user?.upazila}</option>
						{
							upazila.map((items, index) => (
								<option key={index} value={items?.name}>{items?.name_bn}</option>
							))
						}
					</select>
				</div>


				<div className={errors.confirm_password ? 'col-span-1 md:col-span-2 pl-2 inline-flex text-primary_100 bg-yellow-500 font-bold' : 'invisible'}>{errors.confirm_password && errors.confirm_password.message}</div>

				<button onClick={() => setIsEditAtctive(!isEditAtctive)}>{isEditAtctive ? 'Edi' : 'Edit'}</button>
			</form>
		</div>
	)
}
export default UserProfile;