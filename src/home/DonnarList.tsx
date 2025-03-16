import React, { useEffect, useState } from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiSolidPhone } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { DonarSearchType, DonarType, DistrictType, UpazilaType } from '../utils/type';
import useGeoDetails from '../hook/useGeoDetails';


function DonnarList() {
	const { register, watch, handleSubmit, formState: { errors } } = useForm<DonarSearchType>();
	const [districtName, setDistrictName] = useState<string>()
	const [upazilaName, setUpazilaName] = useState<string>()
	const [donars, setDonars] = useState<DonarType[]>([])

	const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value;
		const name = e.target.name;
		setDistrictName(name);
		setUpazilaName(value)

	}
	const [district, upazila] = useGeoDetails(districtName, upazilaName)

	useEffect(() => {
		fetch('./data1.json')
			.then(response => response.json())
			.then(data => {
				setDonars(data)
			})
	}, [])


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
			<div className='grid grid-cols-2 md:grid-cols-4  gap-4 p-10 items-center justify-center'>
				<div className="">
					<label htmlFor='division' className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
					<select {...register("division", { required: true })} id='division' name='districts' onChange={handleSelectAddress}
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
					<select  {...register("district", { required: true })} id='district' name='upazilas' onChange={handleSelectAddress}
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
			</div>
			<hr className="border-primary_300 dark:border-primary_300"></hr>
			<div className='grid grid-cols-1 md:grid-cols-4 p-10 gap-4 justify-items-center items-center'>
				{
					donars.map((donar, index) => (
						<div key={index} className='flex w-75 h-30  bg-white/65 justify-evenly items-center rounded-lg shadow-lg  '>
							<div>
								<img className='rounded-lg ' src={donar.avatar} alt="" />
							</div>
							<div>
								<p className='font-semibold flex items-center gap-2 '><BiDroplet /> <span className='bg-primary_200 text-netural_300 px-2'>{donar.blood_group}</span></p>
								<h5 className='font-semibold flex items-center gap-2'><BiSolidUser /> {donar.full_name}</h5>
								<p className='flex items-center gap-2 text-xs font-extralight'><BiSolidLocationPlus />{donar.division}</p>
								{/* <p className='flex items-center gap-2 text-sm'><BiDonateHeart /> {donar.donation_count} বার রক্ত দান</p> */}
								<p className='flex items-center gap-2 text-sm'><BiSolidPhone /> <a href={`tel:${donar.phone_number}`}>{donar.phone_number}</a></p>
							</div>
						</div>
					))
				}
			</div>
		</section>
	)
}

export default DonnarList