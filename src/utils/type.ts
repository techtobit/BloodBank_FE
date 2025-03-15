type BaseInputType = {
	phone_number: number,
	password: string,
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
	donation_count: number,
	created_at: Date
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


