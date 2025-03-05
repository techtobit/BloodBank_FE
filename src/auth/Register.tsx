import axios from 'axios'
import Flag_of_Bangladesh from '../assets/Flag_of_Bangladesh.svg'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
	phoneNumber: string,
	password: string
}


function Register() {

	const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data)
		axios.post('http://127.0.0.1:8000/user/register/', data)
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}

	return (
		<>
			<div className="w-full max-w-xs">
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="w-full max-w-sm min-w-[200px] mt-4">
						<label className="block mb-1 text-sm text-primary_300">Enter Phone Number</label>
						<div className="relative mt-2">
							<div className="absolute top-2 left-0 flex items-center pl-3">
								<div className="h-full gap-[4px] text-sm flex justify-center items-center bg-transparent text-slate-700 focus:outline-none">
								<img src={Flag_of_Bangladesh} alt="Flag_of_Bangladesh" />
								<span >+88</span>
								<div className="h-6 border-l border-slate-200 "></div>
								</div>
							</div>
							<input
							{...register('phoneNumber')}
								type="tel"
								className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pr-3 pl-20 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
								placeholder="01886627127"
								pattern="[0-9]*"
								inputMode="numeric"
								maxLength={11}
								id="phone_number"
							/>
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
								Password
							</label>
							<input {...register("password")} id='password' className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******************" />
							<p className="text-red-500 text-xs italic">Please choose a password.</p>
						</div>
						<div className="flex items-center justify-between">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
								Sign In
							</button>
							<a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
								Forgot Password?
							</a>
						</div>
					</div>
					{errors.phoneNumber && <span className="text-red-500">This field is required</span>}
					{errors.password && <span className="text-red-500">This field is required</span>}
					{errors.password?.type === "minLength" && <span className="text-red-500">This field is required to be at least 6 characters</span>}
				</form>
			</div >
		</>
	)
}

export default Register