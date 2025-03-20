import React, { useEffect, useState } from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiSolidPhone, BiDonateHeart } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import { useForm } from 'react-hook-form';
import { DonarSearchType, DonarType } from '../utils/type';
import useGeoDetails from '../hook/useGeoDetails';


function DonnarList() {
	const { register, handleSubmit, formState: { errors } } = useForm<DonarSearchType>();
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

	useEffect(() => {
		fetch(`http://127.0.0.1:8000/api/v0.1/donars/?page=${[currentPage]}`)
			.then(response => response.json())
			.then(data => {

				setCoutPages(data.count / 12)
				setDonars(data.results)
			})
	}, [currentPage])

	const onSubmit = (e: any) => {
		console.log(e);
	}

	console.log(currentPage);


	return (
		<section
			style={{
				backgroundImage: `url(${donnarBgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: 1.5
			}}
			className='w-full min-h-screen bg-netural_300'>
			{/* <h2 className='text-3xl text-center py-4 font-bold text-primary_200'>রক্তদাতাদের তালিকা</h2> */}
			<form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 md:grid-cols-5  gap-4 p-10 items-center justify-center'>
				<div className="">
					<label htmlFor='division' className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
					<select {...register("division", { required: true })} name='division' id='districts' onChange={handleSelectAddress}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-base font-bold border border-primary_300 rounded-md pr-3 pl-3 text-base transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<select  {...register("upazila", { required: true })} id='upazila'
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

			</form>
			<hr className="border-primary_300 dark:border-primary_300"></hr>
			<div className='grid grid-cols-1 md:grid-cols-4 p-10 gap-4 justify-items-center items-center'>
				{
					donars?.map((donar, index) => (
						<div key={index} className='flex w-75 h-30  bg-white/65 justify-evenly items-center rounded-lg shadow-lg  '>
							<div>
								<img className='rounded-lg ' src={`https://ui-avatars.com/api/?name=${donar.full_name}&background=random`} alt="" />
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
				countPages > 1 && (
					<div className='flex justify-center items-center gap-2'>
						<button
							disabled={currentPage <= 1}
							className={`bg-primary_300 text-netural_300 p-2 font-bold rounded-md ${currentPage <= 1 ? "cursor-not-allowed opacity-50" : "hover:bg-primary_100"} `} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
						<div className='flex gap-4'>
							{
								[...Array(countPages)].map((_, index) => (
									<button key={index} className='flex items-center px-[20px] py-[8px] bg-primary_300 text-netural_300 font-bold hover:bg-primary_100 rounded-md'
										onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
								))
							}
						</div>
						<button
							disabled={currentPage >= countPages}
							className={`bg-primary_300 text-netural_300 p-2 font-bold rounded-md ${currentPage >= countPages ? "cursor-not-allowed opacity-50" : "hover:bg-primary_100"} `}
							onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
					</div>
				)
			}
		</section>
	)
}

export default DonnarList