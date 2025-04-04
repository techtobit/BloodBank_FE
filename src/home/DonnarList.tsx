import React, { useEffect, useState } from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiSolidPhone, BiDonateHeart } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import { useForm } from 'react-hook-form';
import { DonarSearchType, DonarType } from '../utils/type';
import useGeoDetails from '../hook/useGeoDetails';
import { Link } from 'react-router';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import axios from 'axios';
import Loading from '../utils/loading/Loading';

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const AVATAR_BASE_URL = import.meta.env.VITE_API_AVATAR_URL;


function DonnarList() {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<DonarSearchType>();
	const [findUnder, setFindUnder] = useState<string>()
	const [searchQuery, setSearchQuery] = useState<string>()
	const [donars, setDonars] = useState<DonarType[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [countPages, setCoutPages] = useState<number>(0)
	const [isLoading, setIsLoading] = useState<boolean>(true)

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.id;
		const value = e.target.value;
		setFindUnder(id)
		setSearchQuery(value)
	}

	const [district, upazila] = useGeoDetails(findUnder, searchQuery)

	if(donars.length==0){
		setTimeout(() => {
			setIsLoading(false)
		}, 10000);
	}



	const fetchDonars = async (filterUrl: string = "") => {
		try {
			let queryUrl = null;
			if (filterUrl) {
				queryUrl = filterUrl
			} else {
				queryUrl = `${BASE_API_URL}donars/?page=${[currentPage]}`
			}
			const response = await axios.get(queryUrl)
			if (response.status >= 200 && response.status < 300) {
				setIsLoading(false)
				const data = response.data;
				setCoutPages(Math.ceil(data?.count / 12))
				setDonars(data.results)
			}

		}
		catch (error) {
			console.error('There was an error!', error);
		}
	}

	useEffect(() => {
		fetchDonars("")
	}, [])

	const onSubmit = async (e: DonarSearchType) => {
		const filterUrl = `${BASE_API_URL}donars/?division=${e.division}&district=${e.district}&upazila=${e?.upazila}&blood_group=${encodeURIComponent(e?.blood_group)}`
		fetchDonars(filterUrl)
	}

	const handleReset = () => {
		reset();
		fetchDonars('')
	};

	return (
		<section id='donars'
			style={{
				backgroundImage: `url(${donnarBgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: 1.5
			}}
			className='w-full min-h-screen relative bg-netural-300'>

			<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 md:grid-cols-5 gap-4 p-5  md:p-10 items-center justify-center'>
				<div className="">
					<label htmlFor='division' className="block mb-1 text-md font-bold text-primary-200 ">বিভাগ*</label>
					<select {...register("division",
						{
							required: true,
							validate: (value) => value !== 'বিভাগ নির্বাচন করুন'
						})} name='division' id='districts' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
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
				<div className="">
					<label className="block mb-1 text-md font-bold text-primary-200">জেলা*</label>
					<select  {...register("district", { required: true })} name='district' id='upazilas' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
					>
						<option value="" disabled selected className=''>জেলা নির্বাচন করুন</option>
						{
							district.map((items, index) => (
								<option key={index} value={items?.name} className=''>{items?.name_bn}</option>
							))
						}
					</select>
				</div>
				<div className="">
					<label className="block mb-1 text-md font-bold text-primary-200">উপজেলা*</label>
					<select  {...register("upazila", { required: false })} id='upazila'
						className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
					>
						<option value="" disabled selected className=''>উপজেলা নির্বাচন করুন</option>
						{
							upazila.map((items, index) => (
								<option key={index} value={items?.name} className=''>{items?.name_bn}</option>
							))
						}
					</select>
				</div>
				<div className="">
					<label className="block mb-1 text-md font-bold text-primary-200 ">রক্তের গ্রুপ*</label>
					<select {...register("blood_group")} id='blood_group'
						className="w-full h-10 bg-netural-100 placeholder:text-gray text-primary-100 text-base font-bold border border-primary-300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
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

				<button className="w-full h-10 cursor-pointer flex col-span-2 md:col-span-1 justify-center items-center mt-7 bg-primary-300 text-netural-300 text-lg font-bold border hover:bg-primary-100 rounded-md transition duration-300 ease focus:outline-none focus:border-primary-100">
					দাতা খুজেন
				</button>
				{(errors.division || errors.district) && <p className='col-span-1 md:col-span-2 pl-2 inline-flex  text-balck bg-yellow-500'>বিভাগ ও জেলা নির্বাচন আবশ্যক !</p>}
			</form>

			<hr className="border-primary-300 dark:border-primary-300"></hr>

			<div className='grid grid-cols-1 md:grid-cols-4  md:p-10 gap-4 md:justify-items-center items-center'>
				{
					!donars?.map((donar, index) => (
						<div key={index} className='flex w-64 md:w-75 h-30  bg-white/65 justify-evenly items-center rounded-lg shadow-lg  '>
							<div>
								<img className='rounded-lg ' src={`${AVATAR_BASE_URL}?name=${donar.full_name}&background=random`} alt="" />
							</div>
							<div>
								<p className='font-semibold flex items-center gap-2 '><BiDroplet /> <span className='bg-primary-200 text-netural-300 px-2'>{donar.blood_group}</span></p>
								<h5 className='font-semibold flex items-center gap-2'><BiSolidUser /> {donar.full_name}</h5>
								<p className='flex items-center gap-2 text-xs font-extralight'><BiSolidLocationPlus />{donar.division}, {donar.district}, {donar.upazila}</p>
								<p className='flex items-center gap-2 text-sm'><BiDonateHeart /> {donar.total_donation} বার রক্ত দান</p>
								<p className='flex items-center gap-2 text-sm'><BiSolidPhone /> <a href={`tel:${donar.phone_number}`}>{donar.phone_number}</a></p>
							</div>
						</div>
					))
				}
			</div>
			{
				isLoading ?
					<Loading />
					:
					donars.length === 0  && (
						<div className='flex flex-col justify-center items-center gap-4'>
							<div className='w-75 md:w-95 bg-yellow-500 text-black text-center text-sm md:text-lg font-bold border rounded-md px-5 py-2'>কোন রক্তদাতা পাওয়া যায়নি</div>
							<Link to='/register' className='w-75 md:w-95 bg-primary-300 text-netural-300 text-center text-sm md:text-lg font-bold border hover:bg-primary-100 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-primary-100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
							<button onClick={handleReset} className='w-75 md:w-95 bg-yellow-500 text-black text-center text-sm md:text-lg font-bold border rounded-md px-5 py-2'>ফিল্টার বাতিল</button>
						</div>
					)
			}

			<div className='pagenations'>
				{
					countPages > 1 && (
						<div className='flex justify-center items-center gap-2'>
							<button
								disabled={currentPage <= 1}
								className={`flex items-center bg-primary-100 text-netural-300 px-5 py-2 font-bold rounded-md ${currentPage <= 1 ? "cursor-not-allowed opacity-50" : "hover:bg-primary-100"} `} onClick={() => setCurrentPage(currentPage - 1)}><BiLeftArrow /> পূর্ববর্তী</button>
							<div className='flex gap-4'>
								{
									[...Array(countPages)].map((_, index) => (
										<button key={index} className={`flex items-center px-[20px] py-[8px] font-bold  rounded-md ${currentPage === index + 1 ? "bg-primary-300 text-netural-300" : "bg-primary-100 text-netural-300 hover:bg-primary-200"}`}
											onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
									))
								}
							</div>
							<button
								disabled={currentPage >= countPages}
								className={`flex items-center bg-primary-100 text-netural-300 p-2 font-bold rounded-md ${currentPage >= countPages ? "cursor-not-allowed opacity-50" : "hover:bg-primary-100"} `}
								onClick={() => setCurrentPage(currentPage + 1)}>পরবর্তী  <BiRightArrow /></button>
						</div>
					)
				}
			</div>
		</section>
	)
}

export default DonnarList