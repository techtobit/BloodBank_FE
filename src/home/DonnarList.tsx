import React, { useEffect, useState } from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiSolidPhone, BiDonateHeart } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import { useForm } from 'react-hook-form';
import { DonarSearchType, DonarType } from '../utils/type';
import useGeoDetails from '../hook/useGeoDetails';
import { Link } from 'react-router';
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
const AVATAR_BASE_URL = import.meta.env.VITE_API_AVATAR_URL;


function DonnarList() {
	const { register, handleSubmit, reset, formState: { errors } } = useForm<DonarSearchType>();
	const [findUnder, setFindUnder] = useState<string>()
	const [searchQuery, setSearchQuery] = useState<string>()
	const [donars, setDonars] = useState<DonarType[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [countPages, setCoutPages] = useState<number>(0)

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const id = e.target.id;
		const value = e.target.value;
		setFindUnder(id)
		setSearchQuery(value)
	}

	const [district, upazila] = useGeoDetails(findUnder, searchQuery)

	const fetchDonars = async (params = {}) => {
		const url = new URL(`${BASE_API_URL}donars/`);
		url.searchParams.append('page', currentPage.toString());

		Object.entries(params).forEach(([key, value]) => {
			if (value && (typeof value === 'string' || typeof value === 'number')) {
				url.searchParams.append(key, encodeURIComponent(value.toString()));
			}
		})

		try {
			const response = await fetch(url.toString());
			const data = await response.json();
			setDonars(data.results)
			setCoutPages(data?.count / 12)
		}
		catch (error) {
			console.error('There was an error!', error);
		}

	}

	useEffect(() => {
		fetchDonars()
	}, [currentPage])

	const onSubmit = (e: DonarSearchType) => {
		fetchDonars({
			division: e.division,
			district: e.district,
			upazila: e.upazila,
			blood_group: e.blood_group,
		});
	}

	const handleReset = () => {
		reset();
		fetchDonars()
	};

	return (
		<section
			style={{
				backgroundImage: `url(${donnarBgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: 1.5
			}}
			className='w-full min-h-screen bg-netural_300'>

			<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 md:grid-cols-5  gap-4 p-10 items-center justify-center'>
				<div className="">
					<label htmlFor='division' className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
					<select {...register("division",
						{
							required: true,
							validate: (value) => value !== 'বিভাগ নির্বাচন করুন'
						})} name='division' id='districts' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<label className="block mb-1 text-md font-bold text-primary_200">জেলা*</label>
					<select  {...register("district", { required: true })} name='district' id='upazilas' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<label className="block mb-1 text-md font-bold text-primary_200">উপজেলা*</label>
					<select  {...register("upazila", { required: false })} id='upazila'
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<label className="block mb-1 text-md font-bold text-primary_200 ">রক্তের গ্রুপ*</label>
					<select {...register("blood_group")} id='blood_group'
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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

				<button className="w-full h-10 cursor-pointer flex justify-center items-center mt-7 bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md transition duration-300 ease focus:outline-none focus:border-primary_100">
					দাতা খুজেন
				</button>
				{(errors.division || errors.district) && <p className='col-span-1 md:col-span-2 pl-2 inline-flex  text-balck bg-yellow-500'>বিভাগ ও জেলা নির্বাচন আবশ্যক !</p>}
			</form>
			<hr className="border-primary_300 dark:border-primary_300"></hr>
			<div className='grid grid-cols-1 md:grid-cols-4 p-10 gap-4 justify-items-center items-center'>
				{
					donars?.map((donar, index) => (
						<div key={index} className='flex w-75 h-30  bg-white/65 justify-evenly items-center rounded-lg shadow-lg  '>
							<div>
								<img className='rounded-lg ' src={`${AVATAR_BASE_URL}?name=${donar.full_name}&background=random`} alt="" />
							</div>
							<div>
								<p className='font-semibold flex items-center gap-2 '><BiDroplet /> <span className='bg-primary_200 text-netural_300 px-2'>{donar.blood_group}</span></p>
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
				donars.length === 0 && (
					<div className='flex flex-col justify-center items-center gap-4'>
						<div className='w-95 bg-yellow-500 text-black text-center text-sm md:text-lg font-bold border rounded-md px-5 py-2'>কোন রক্তদাতা পাওয়া যায়নি</div>
						<Link to='/register' className='w-95 bg-primary_300 text-netural_300 text-center text-sm md:text-lg font-bold border hover:bg-primary_100 rounded-md px-5 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100'>রক্ত দানকারী হিসাবে যোগদিন</Link>
						<button onClick={handleReset} className='w-95 bg-yellow-500 text-black text-center text-sm md:text-lg font-bold border rounded-md px-5 py-2'>ফিল্টার বাতিল</button>
					</div>
				)
			}

			<div className='bottom-0'>
				{
					countPages > 1 && (
						<div className='flex justify-center items-center gap-2'>
							<button
								disabled={currentPage <= 1}
								className={`flex items-center bg-primary_100 text-netural_300 px-5 py-2 font-bold rounded-md ${currentPage <= 1 ? "cursor-not-allowed opacity-50" : "hover:bg-primary_100"} `} onClick={() => setCurrentPage(currentPage - 1)}><BiLeftArrow/> পূর্ববর্তী</button>
							<div className='flex gap-4'>
								{
									[...Array(countPages)].map((_, index) => (
										<button key={index} className={`flex items-center px-[20px] py-[8px] font-bold  rounded-md ${currentPage === index+1  ? "bg-primary_300 text-netural_300" : "bg-primary_100 text-netural_300 hover:bg-primary_200"}`}
											onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
									))
								}
							</div>
							<button
								disabled={currentPage >= countPages}
								className={`flex items-center bg-primary_100 text-netural_300 p-2 font-bold rounded-md ${currentPage >= countPages ? "cursor-not-allowed opacity-50" : "hover:bg-primary_100"} `}
								onClick={() => setCurrentPage(currentPage + 1)}>পরবর্তী  <BiRightArrow/></button>
						</div>
					)
				}
			</div>
		</section>
	)
}

export default DonnarList