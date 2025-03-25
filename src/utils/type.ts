
type BaseInputType = {
	phone_number: number,
	password: string,
	created_at: Date,
}

type GeoAddressType = {
	division: string,
	district: string,
	upazila: string
}

export type LogInInputType = BaseInputType
export type RegisterInputType = BaseInputType & GeoAddressType &{
	full_name: string,
	blood_group: string,
	confirm_password: string
}

type UserProfileType = Omit<RegisterInputType,  'password' | 'confirm_password'> & {
	avatar: string
	last_donation: Date,
	total_donation: number,
	last_donation_date: Date | null,
	last_login: Date,
	created_at: Date,
	is_active: boolean
}

export type DonarType = UserProfileType
export type DonarSearchType = GeoAddressType & {
	blood_group: string	
}

type BaseGeoType ={
	name: string,
	name_bn: string
}

export type DivisionType = BaseGeoType
export type DistrictType = BaseGeoType
export type UpazilaType = BaseGeoType


export type FeedbackType = {
	feedbacker_name: string,
	feedback_subject: string,
	feedback_details: string,
}
export type ReportType = {
	report_to_donar: boolean,
	report_to_seeker: boolean,
	own_phone_number: number,
	reporting_phone_number: number,
	reporting_details: string
}


