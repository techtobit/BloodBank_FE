import React, { useEffect, useState } from 'react'
import { BiDroplet, BiSolidUser, BiSolidLocationPlus, BiDonateHeart, BiSolidPhone } from "react-icons/bi";
import donnarBgImg from '../assets/map_hands.svg'
import avatar from '../assets/person.png'
import axios from 'axios';
import { useForm } from 'react-hook-form';

interface Inputs {
	division: string;
	district: string;
	upazila: string;
	blood_group: string;
}

function DonnarList() {
	const { register, watch, handleSubmit, formState: { errors } } = useForm<Inputs>();
	const [district, setDistrict] = useState<string[]>([])
	const [upazila, setUpazila] = useState<string[]>([])
	const [donars, setDonars] = useState<string[]>([])

	useEffect(() => {
		fetch('./data.json')
			.then(response => response.json())
			.then(data => {
				setDonars(data)
			})
	}, [])




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

	return (
		<section
			style={{
				backgroundImage: `url(${donnarBgImg})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				opacity: 1.5
			}}
			className='w-full h-screen bg-netural_300'>
			{/* <h2 className='text-3xl text-center py-4 font-bold text-primary_200'>রক্তদাতাদের তালিকা</h2> */}
			<div className='flex gap-4 py-10 items-center justify-center'>
				<div className="">
					<label className="block mb-1 text-md font-bold text-primary_200 ">বিভাগ*</label>
					<select {...register("division", { required: true })} id='division' onChange={handleChangeDistrict}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
					<select  {...register("district", { required: true })} id='district' onChange={handleChangeUpazila}
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
					>
						<option value="" disabled selected className=''>উপজেলা নির্বাচন করুন</option>
						{
							upazila.map((items, index) => (
								<option key={index} value={items?.name_bn} className=''>{items?.name_bn}</option>
							))
						}
					</select>
				</div>
				<div className="">
					<label className="block mb-1 text-md font-bold text-primary_200 ">রক্তের গ্রুপ*</label>
					<select {...register("blood_group")} id='blood_group'
						className="w-full h-10 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
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
			<div className='grid grid-cols-4 px-4 justify-center items-center'>
			{
				donars.map((donar, index) => (
					<div key={index} className='flex w-82 h-30 mt-10  bg-white/65 gap-4 justify-center items-center rounded-lg shadow-lg  '>
						<img className='rounded-lg' src={donar.avatar} alt="" />
						<div>
							<p className='flex items-center gap-2 '><BiDroplet /> <span className='bg-primary_200 text-netural_300 px-2'>{donar.blood_group}</span></p>
							<h4 className='flex items-center gap-2'><BiSolidUser /> {donar.name}</h4>
							<p className='flex items-center gap-2 text-xm font-extralight'><BiSolidLocationPlus />{donar.address}</p>
							<p className='flex items-center gap-2'><BiDonateHeart /> {donar.donation_count} বার রক্ত দান</p>
							<p className='flex items-center gap-2'><BiSolidPhone /> {donar.phone}</p>
						</div>
					</div>
				))
			}
			</div>
		</section>
	)
}

export default DonnarList