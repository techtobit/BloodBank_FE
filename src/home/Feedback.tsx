import React from 'react'
import {FeedbackType} from '../utils/type'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Feedback():React.ReactElement {
		const { register, reset, handleSubmit, formState: { errors } } = useForm<FeedbackType>();
		const onSubmitFeedback = (data:FeedbackType) => {
			const url = `${BASE_API_URL}feedback/`;
			axios.post(url, data)
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
		<div className='w-5/6 bg-netural-300/30 rounded-lg p-5 md:p-10'>
		<h4 className='text-2xl text-center pb-10 font-bold text-primary-300'>আপনার মাতামত দিন</h4>
		<form onSubmit={handleSubmit(onSubmitFeedback)} className="grid grid-cols-1 gap-5 items-center justify-center">
			<input
				id='feedbacker_name'
				{...register("feedbacker_name", { required: true, maxLength: 30 })}
				placeholder={errors.feedbacker_name ? 'এই ঘরটি পূরণ করেনি' : 'সম্পূর্ন নাম লিখুন'}
				className="w-full h-14 bg-netural-100 placeholder:text-gray text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
				type="text"
			/>
			<input
				id='feedback_subject'
				{...register("feedback_subject", { required: true, maxLength: 40 })}
				placeholder={errors.feedback_subject ? 'এই ঘরটি পূরণ করেনি' : 'বিষয় লিখুন'}
				className="w-full h-14 bg-netural-100 placeholder:text-gray text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
				type="text"
			/>

			<div className='overflow-y-auto h-40'>
				<textarea
					id='feedback_details'
					maxLength={150}
					{...register("feedback_details", { required: true, maxLength: 110 })}
					placeholder={errors.feedback_details ? 'এই ঘরটি পূরণ করেনি' : 'বিস্তারিত লিখুন'}
					className="w-full h-38 bg-netural-100 placeholder:text-gray  text-primary-100 text-lg font-bold border border-primary-300 rounded-md p-2 transition duration-300 ease focus:outline-none focus:border-primary-100 hover:border-primary-100"
				/>
			</div>
			{(errors.feedbacker_name || errors.feedback_subject || errors.feedback_details) && <p className='text-black bg-yellow-500 text-xs'>সকল ঘর পূরন করুন</p>}
			<button className="w-full h-14 flex justify-center items-center bg-primary-300 text-netural-300 text-lg font-bold border hover:bg-primary-100 rounded-md pr-3 pl-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary-100">
				সাবমিট
			</button>

		</form>
	</div>
	)
}
