
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {ReportType, FeedbackType} from '../utils/type'

function UserInteraction():React.ReactElement {
	const { register, handleSubmit, formState: { errors } } = useForm<any[]>();
	const [isActiveBtn, setIsActiveBtn] = useState<boolean>(true)
	const [checkedBox, setCheckedBox] = useState<string | null>(null);

	const onSubmit = (data: FeedbackType) => {
		console.log(data);
	}


	return (
		<div className='w-full min-h-screen bg-secondary_300 grid grid-cols-1 md:grid-cols-2 justify-center justify-items-center items-center gap-4'>
			<div className='flex flex-col justify-center items-center gap-4'>
				<button onClick={() => setIsActiveBtn(true)} className={`w-80 h-20 text-xl font-bold border rounded-lg hover:bg-primary_100 hover:text-netural_300 ${isActiveBtn ? "text-netural_100 bg-primary_300" : "bg-netural_100 text-primary_300"} `}>রিপোর্ট করুন</button>
				<button onClick={() => setIsActiveBtn(false)} className={`w-80 h-20 text-xl font-bold border rounded-lg hover:bg-primary_100 hover:text-netural_300 ${isActiveBtn ? "bg-netural_100 text-primary_300" : " text-netural_100 bg-primary_300 "} `}>মাতামত দিন</button>
			</div>
			{
				isActiveBtn
					?
					<div className='bg-netural_300/30 rounded-lg p-10'>
						<h4 className='text-2xl font-bold text-primary_300'>দাতা/গ্রহিতাকে রিপোর্ট  করুন</h4>
						<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 items-center justify-center">
							<div className='pt-2'>
								<label className="text-primary_300 flex items-center gap-2">
									<input
										type="checkbox"
										id="report_to_donar"
										value="দাতাকে রিপোর্ট করুন"
										checked={checkedBox === "donar"}
										{...register('report_to_donar', {
											required: true,
											onChange: () => setCheckedBox(checkedBox === "donar" ? null : "donar"),
										})}
										disabled={checkedBox === "seeker"}
										className="accent-primary_100 hover:accent-netural_100 disabled:text-gray-600 disabled:cursor-not-allowed"
									/>
									দাতাকে রিপোর্ট করুন
								</label>

								<label className="text-primary_300 flex items-center gap-2">
									<input
										type="checkbox"
										id="report_to_seeker"
										value="গ্রহিতাকে রিপোর্ট করুন"
										checked={checkedBox === "seeker"}
										{...register('report_to_seeker', {
											required: true,
											onChange: () => setCheckedBox(checkedBox === "seeker" ? null : "seeker"),
										})}
										disabled={checkedBox === "donar"}
										className="accent-primary_100 hover:accent-netural_100 disabled:text-gray-600 disabled:cursor-not-allowed"
									/>
									গ্রহিতাকে রিপোর্ট করুন
								</label>
							</div>
							<p className='bg-yellow-400 text-priamry_300 text-xs'>বিপোর্টের ভিত্তিতে দাতার/গ্রহিতার একউন্ট সাময়িক বা স্থায়ি ভাবে বন্ধ কার হবে।</p>

							<input
								{...register('own_phoneNumber', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.phoneNumber ? '১১ সংখ্যার নাম্বর লিখেনি' : 'নিজের মোবাইল নাম্বার লিখুন'}
								type="tel"
								className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="own_phone_number"
							/>
							<input
								{...register('phoneNumber', { required: true, minLength: 11, maxLength: 11 })}
								placeholder={errors.phoneNumber ? '১১ সংখ্যার নাম্বর লিখেনি' : 'রিপোর্ট করা মোবাইল নাম্বার লিখুন'}
								type="tel"
								className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="phone_number"
							/>


							<div className='overflow-y-auto h-20'>
								<textarea
									id='feedback_details'
									maxLength={150}
									{...register("feedback_details", { required: true, maxLength: 110 })}
									placeholder={errors.feedback_details ? 'এই ঘরটি পূরণ করেনি' : 'রিপোর্টের কারন'}
									className="w-full h-18 bg-netural_100 placeholder:text-gray  text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								/>
							</div>
							{(errors.report_to_donar && errors.report_to_seeker) && <p className='text-black bg-yellow-500 text-xs'>চেক বক্স পূরণ করেনি</p>}
							<button className="w-full h-14 flex justify-center items-center bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100">
								সাবমিট
							</button>

						</form>
					</div>

					:

					<div className='w-5/6 bg-netural_300/30 rounded-lg p-10'>
						<h4 className='text-2xl text-center pb-10 font-bold text-primary_300'>আপনার মাতামত দিন</h4>
						<form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-5 items-center justify-center">
							<input
								id='feedbacker_name'
								{...register("feedbacker_name", { required: true, maxLength: 30 })}
								placeholder={errors.feedbacker_name ? 'এই ঘরটি পূরণ করেনি' : 'সম্পূর্ন নাম লিখুন'}
								className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text"
							/>
							<input
								id='feedback_subject'
								{...register("feedback_subject", { required: true, maxLength: 40 })}
								placeholder={errors.feedback_subject ? 'এই ঘরটি পূরণ করেনি' : 'বিষয় লিখুন'}
								className="w-full h-14 bg-netural_100 placeholder:text-gray text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								type="text"
							/>

							<div className='overflow-y-auto h-40'>
								<textarea
									id='feedback_details'
									maxLength={150}
									{...register("feedback_details", { required: true, maxLength: 110 })}
									placeholder={errors.feedback_details ? 'এই ঘরটি পূরণ করেনি' : 'বিস্তারিত লিখুন'}
									className="w-full h-38 bg-netural_100 placeholder:text-gray  text-primary_100 text-lg font-bold border border-primary_300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary_100 hover:border-primary_100"
								/>
							</div>
							{(errors.feedbacker_name || errors.feedback_subject || errors.feedback_details) && <p className='text-black bg-yellow-500 text-xs'>সকল ঘর পূরন করুন</p>}
							<button className="w-full h-14 flex justify-center items-center bg-primary_300 text-netural_300 text-lg font-bold border hover:bg-primary_100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary_100">
								সাবমিট
							</button>

						</form>
					</div>

			}


		</div>
	)
}

export default UserInteraction