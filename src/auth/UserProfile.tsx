import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg';
import { useForm } from 'react-hook-form';
import useGeoDetails from '../hook/useGeoDetails';
import Tooltip from '../shared/Tooltip';
import { useNavigate } from 'react-router';
import backgroundAssets from '../assets/backgroundAssets.svg'
import { DonarType } from '../utils/type'
import { toast } from 'react-toastify';
import Loading from '../utils/loading/Loading';
import { BiHomeAlt, BiSolidUser, BiSolidCloudUpload, BiLogOut } from "react-icons/bi";
import { Link } from 'react-router'

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;


function UserProfile(): React.ReactElement {
	const token = localStorage.getItem('token');
	const userId = localStorage.getItem('user_id');
	if (!token) {
		window.location.href = '/';
	}

	const formatDate = (dateInput: string | Date) => {
		const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
		return date.toISOString().split("T")[0];
	};

	const [user, setUser] = useState<DonarType | null>(null);
	const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true);
	const [isEditAtctive, setIsEditAtctive] = useState<boolean>(false);
	const [findUnder, setFindUnder] = useState<string>();
	const [searchQuery, setSearchQuery] = useState<string>();

	const { register, handleSubmit, formState: { errors }, reset } = useForm<DonarType>();

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.id;
		const value = e.target.value;
		setFindUnder(id);
		setSearchQuery(value);
	};

	const url = `${BASE_API_URL}profile/${userId}/`;

	const [district, upazila] = useGeoDetails(findUnder, searchQuery);

	useEffect(() => {
		if (token) {
			axios.get(url, {
				headers: {
					'Authorization': `Token ${token}`
				}
			})
				.then(response => {
					setUser(response.data);
					// Dynamically update form values when user data is fetched
					reset({
						full_name: response.data.full_name,
						phone_number: response.data.phone_number,
						blood_group: response.data.blood_group,
						total_donation: response.data.total_donation,
						last_donation_date: response.data.last_donation_date,
						division: response.data.division,
						district: response.data.district,
						upazila: response.data.upazila
					});
				})
				.catch(function (error) {
					console.log(error);
				});
		}
	}, [url, token, userId, reset]);

	const onSubmit = (data: DonarType) => {
		console.log("Form  Data Submitted:", data); // Debug log to ensure form data is captured
		if (!isEditAtctive) {


			axios.put(url, data, {
				headers: {
					'Authorization': `Token ${token}`
				}
			})
				.then(response => {
					console.log("Response Data:", response.data); // Debug log for response
					setUser(response.data);
					toast.success('তথ্য আপডেইট হয়েছে');
					setIsEditAtctive(false);
				})
				.catch(error => {
					console.error("Error:", error); // Debug log for errors
					toast.error('তথ্য আপডেইট ব্যর্থ হয়েছে');
				});
		}
	};

	const navigate = useNavigate();
	const handleLogOut = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user_id');
		navigate('', { replace: true });
	};

	return (
		<section className='w-full min-h-screens'
			style={{
				backgroundImage: `url(${backgroundAssets})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: 1.5
			}}
		>
			<div className='w-full h-screens flex items-center relative'>
				<div className='w-1/5 h-[80vh] flex flex-col p-4 ml-4 bg-secondary-300/30 backdrop-invert backdrop-opacity-10 rounded-md shadow-lg border-r border-primary-300'>
					<div className='w-full flex flex-col items-center justify-center gap-2'>
						<img className='w-20 h-20 bg-netural-100 rounded-full border-primary-300 border'
							src="https://avatar.iran.liara.run/public/24"
							alt="avatar" />
						<p className='text-md font-bold text-primary-200 text-center'>স্বাগতম {user?.full_name}</p>
					</div>
					<ul className='pt-6 flex flex-col gap-4'>
						<Link to='/' className={`flex items-center justify-center gap-2 w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 bg-netural-100 text-primary-300 hover:bg-primary-100 hover:text-netural-300 cursor-pointer`}>< BiHomeAlt /> হোমপেইজ</Link>
						<li onClick={() => setIsActiveBtn(true)} className={`flex items-center justify-center gap-2 w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 cursor-pointer ${isActiveBtn ? "text-netural-100 bg-primary-300" : "bg-netural-100 text-primary-300 hover:bg-primary-100 hover:text-netural-300"}`}> <BiSolidUser /> প্রোফাইল</li>
						<li onClick={() => setIsActiveBtn(false)} className={`flex items-center justify-center gap-2 w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 cursor-pointer ${!(isActiveBtn) ? "text-netural-100 bg-primary-300" : "bg-netural-100 text-primary-300 hover:bg-primary-100 hover:text-netural-300"}`}><BiSolidCloudUpload /> ডাটা জমা</li>
						<button onClick={handleLogOut} className={`flex items-center justify-center gap-2 w-full py-3 text-center text-md font-bold border rounded-lg transition-all duration-300 bg-netural-100 text-primary-300 hover:bg-primary-100 hover:text-netural-300 cursor-pointer`}>< BiLogOut /> লগ আউট</button>
					</ul>
				</div>

				<div className='px-10 pt-2 pb-5 w-full h-full'>
					<div className='h-20 bg-primary-300/80 flex items-center justify-center text-netural-300 font-bold text-lg rounded-md shadow-md'>
						আপনার প্রোফাইল আপডেইট করুন
					</div>

					<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 mt-4 bg-white/30 backdrop-invert backdrop-opacity-10 relative px-10 py-5 rounded-md shadow-lg">

						<div className='absolute top-50 left-95'>

							{
								!user ?
									<Loading />
									:
									''
							}
						</div>
						<div className="">
							<label className="block  text-md font-bold text-primary-200">নাম*</label>
							<input
								id='full_name'
								disabled={!isEditAtctive}
								defaultValue={user?.full_name}
								{...register("full_name", { required: true, maxLength: 30 })}
								placeholder={errors.full_name ? 'এই ঘরটি পূরণ করেনি' : ''}
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								type="text" />
						</div>
						<div className="relative ">
							<label className="block  text-md font-bold text-primary-200">মোবাইল নাম্বার*</label>
							<div className="absolute top-[35px] left-0 flex items-center pl-3">
								<div className="h-full gap-2 text-sm flex items-center bg-netural-100 text-slate-700">
									<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" className="w-6 h-4" />
									<span className='text-lg font-bold text-primary-100'>+88</span>
									<div className="h-6 border-l border-primary-100"></div>
								</div>
							</div>
							<input
								id='phone_number'
								disabled={!isEditAtctive}
								defaultValue={user?.phone_number}
								{...register('phone_number', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : '01886627127'}
								type="tel"
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pl-24 pr-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
							/>
						</div>
						<div className="md:mt-2">
							<label htmlFor='blood_group' className="block  text-md font-bold text-primary-200 ">রক্তের গ্রুপ*</label>
							<select disabled={!isEditAtctive} {...register("blood_group", { required: true })} id='blood_group'
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
							>
								<option
									defaultValue={user?.blood_group}
									selected className=''>{user?.blood_group}</option>
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
						<div className="md:mt-2 group relative">
							<label className="block  text-md font-bold text-primary-200">মোট রক্তদান</label>
							<input
								id='total_donation'
								defaultValue={user?.total_donation}
								{...register("total_donation", { required: true })}
								disabled
								className="w-full h-12 bg-netural-200 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								type="number" />
							<Tooltip children={'এই টি এডিট কারা যাবে না । রক্ত দিলে "জমা ডাটা" বাটনে চাপ দিন'} />
						</div>
						<div className="md:mt-2 group">
							<label className="block  text-md font-bold text-primary-200">শেষ রক্তদান</label>
							<input
								id='last_donation_date'
								disabled
								placeholder={user?.last_donation_date ? formatDate(user?.last_donation_date) : 'রক্ত দেননি'}
								{...register("last_donation_date", { required: false })}
								className="w-full h-12 bg-netural-200 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								type="text" />
							<Tooltip children={'এই টি এডিট কারা যাবে না । রক্ত দিলে "জমা ডাটা" বাটনে চাপ দিন'} />
						</div>
						<div className="md:mt-2">
							<label htmlFor='division' className="block  text-md font-bold text-primary-200 ">বিভাগ*</label>
							<select disabled={!isEditAtctive} {...register("division", { required: false })} name='division' id='districts' onChange={handleSelectAddress}
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
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
						<div className="md:mt-2">
							<label htmlFor='district' className="block  text-md font-bold text-primary-200">জেলা*</label>
							<select disabled={!isEditAtctive} {...register("district", { required: false })} name='district' id='upazilas' onChange={handleSelectAddress
							}
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
							>
								<option
									selected className=''>{user?.district}</option>
								{
									district.map((items, index) => (
										<option key={index} value={items?.name} className=''>{items?.name_bn}</option>
									))
								}
							</select>
						</div>
						<div className="md:mt-2">
							<label className="block  text-md font-bold text-primary-200">উপজেলা*</label>
							<select disabled={!isEditAtctive} {...register("upazila", { required: false })} name='upazila'
								className="w-full h-12 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
							>
								<option
									selected className=''>{user?.upazila}</option>
								{
									upazila.map((items, index) => (
										<option key={index} value={items?.name}>{items?.name_bn}</option>
									))
								}
							</select>
						</div>
						<div className="md:mt-2 group">
							<label className="block  text-md font-bold text-primary-200">একাউন্ট সক্রিয় তথ্য</label>
							<input
								id='is_active'
								disabled
								{...register("is_active", { required: false })}
								placeholder={user?.is_active ? 'সক্রিয়' : 'সক্রিয় নয়'}
								className="w-full h-12 bg-netural-200 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								type="text" />
							<Tooltip children={'এই টি এডিট কারা যাবে না ।'} />
						</div>

						<div className="md:mt-2 group">
							<label className="block  text-md font-bold text-primary-200">একাউন্ট তৈরি হয়েছে</label>
							<input
								id='created_at'
								disabled
								placeholder={user?.created_at ? formatDate(user?.created_at) : 'নেই'}
								{...register("created_at", { required: false })}
								className="w-full h-12 bg-netural-200 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md px-4 transition duration-300 focus:outline-none focus:border-primary-100 hover:border-primary-100"
								type="text" />
							<Tooltip children={'এই টি এডিট কারা যাবে না ।'} />
						</div>

						<button className={`mt-6 col-span-2 h-12 rounded-md font-bold transition-all duration-300 cursor-pointer ${isEditAtctive ? 'bg-primary-200 text-netural-200 hover:bg-primary-100' : 'bg-primary-300 text-netural-300 border border-primary-300 hover:bg-primary-100 hover:text-secondary-100'}`}
							onClick={() => setIsEditAtctive(!isEditAtctive)}>{isEditAtctive ? 'সেইভ করুন' : 'প্রোফাইল আপডেট করুন'}
						</button>
					</form>
				</div>
			</div>
		</section>
	)
}
export default UserProfile;