type BaseInputType = {
	phoneNumber: number,
	password: string,
}

export type LogInInputType = BaseInputType

export type RegisterInputType = BaseInputType & {
	full_name: string,
	blood_group: string,
	division: string,
	district: string,
	upazila: string,
	confirm_password: string
}

type BaseGeoType ={
	name: string,
	name_bn: string
}

export type DivisionType = BaseGeoType
export type DistrictType = BaseGeoType
export type UpazilaType = BaseGeoType


