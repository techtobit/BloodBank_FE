
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { ReportType } from '../utils/type'
import Feedback from './Feedback';
import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;
import { toast } from 'react-toastify';

function UserInteraction(): React.ReactElement {
	const { register, reset, handleSubmit, formState: { errors } } = useForm<ReportType>();
	const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
	const [checkedBox, setCheckedBox] = useState<string | null>(null);

	const onSubmit = (data: ReportType) => {
		console.log(data)
		axios.post(`${BASE_API_URL}report/`, data)
		.then(response => {
			toast.success(response.data.message);
			reset();
		})
		.catch(function (error) {
			toast.error('ব্যর্থ হয়েছে! আবার চেষ্টা করুন');
			console.log(error.config);
		})
	}



	return (
		<div id='report' className='w-full min-h-screen bg-secondary-300 grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center items-center gap-4'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<button onClick={() => setIsActiveBtn(true)} className={`w-80 h-20 text-xl font-bold border rounded-lg hover:bg-primary-100 hover:text-netural-300 ${isActiveBtn ? "text-netural-100 bg-primary-300" : "bg-netural-100 text-primary-300"} `}>রিপোর্ট করুন</button>
				<button onClick={() => setIsActiveBtn(false)} className={`w-80 h-20 text-xl font-bold border rounded-lg hover:bg-primary-100 hover:text-netural-300 ${isActiveBtn ? "bg-netural-100 text-primary-300" : " text-netural-100 bg-primary-300 "} `}>মাতামত দিন</button>
			</div>
			{
				isActiveBtn
					?
					<div className='bg-netural-300/30 rounded-lg mx-5 md:mx-0 p-5 md:p-10'>
						<h4 className='text-2xl font-bold text-primary-300'>দাতা/গ্রহিতাকে রিপোর্ট  করুন</h4>
						<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 items-center justify-center">
							<div className='pt-2'>
								<label className="text-primary-300 flex items-center gap-2">
									<input
										type="checkbox"
										id="report_to_donar"
										checked={checkedBox === "donar"}
										{...register('report_to_donar', {
											required: checkedBox !== "seeker",
											onChange: () => setCheckedBox(checkedBox === "donar" ? null : "donar"),
										})}
										disabled={checkedBox === "seeker"}
										className="accent-primary-100 hover:accent-netural-100 disabled:text-gray-600 disabled:cursor-not-allowed"
									/>
									দাতাকে রিপোর্ট করুন
								</label>

								<label className="text-primary-300 flex items-center gap-2">
									<input
										type="checkbox"
										id="report_to_seeker"
										checked={checkedBox === "seeker"}
										{...register('report_to_seeker', {
											required: checkedBox !== "donar",
											onChange: () => setCheckedBox(checkedBox === "seeker" ? null : "seeker"),
										})}
										disabled={checkedBox === "donar"}
										className="accent-primary-100 hover:accent-netural-100 disabled:text-gray-600 disabled:cursor-not-allowed"
									/>
									গ্রহিতাকে রিপোর্ট করুন
								</label>
							</div>
							<p className='bg-yellow-400 text-priamry_300 text-xs'>বিপোর্টের ভিত্তিতে দাতার/গ্রহিতার একউন্ট সাময়িক বা স্থায়ি ভাবে বন্ধ কার হবে।</p>

							<input
								{...register('own_phone_number', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.own_phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : 'নিজের মোবাইল নাম্বার লিখুন'}
								type="tel"
								className="w-full h-14 bg-netural-100 placeholder:text-gray text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="own_phone_number"
							/>
							<input
								{...register('reporting_phone_number', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.reporting_phone_number ? '১১ সংখ্যার নাম্বর লিখেনি' : 'রিপোর্ট করা মোবাইল নাম্বার লিখুন'}
								type="tel"
								className="w-full h-14 bg-netural-100 placeholder:text-gray text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="reporting_phone_number"
							/>


							<div className='overflow-y-auto h-20'>
								<textarea
									id='reporting_details'
									maxLength={150}
									{...register("reporting_details", { required: true, maxLength: 110 })}
									placeholder={errors.reporting_details ? 'এই ঘরটি পূরণ করেনি' : 'রিপোর্টের কারন'}
									className="w-full h-18 bg-netural-100 placeholder:text-gray  text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
								/>
							</div>
							{(errors.report_to_donar && errors.report_to_seeker) && <p className='text-black bg-yellow-500 text-xs'>চেক বক্স পূরণ করেনি</p>}
							<button className="w-full h-14 flex justify-center items-center bg-primary-300 text-netural-300 text-lg font-bold border hover:bg-primary-100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary-100">
								সাবমিট
							</button>

						</form>
					</div>

					:

					<Feedback />

			}


		</div>
	)
}

export default UserInteraction