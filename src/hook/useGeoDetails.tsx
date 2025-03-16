import axios from "axios";
import { useEffect, useState } from "react";
import { DistrictType, UpazilaType } from '../utils/type';

const useGeoDetails = (name: string, value: string) => {
	console.log(name, value);

	const [district, setDistrict] = useState<DistrictType[]>([])
	const [upazila, setUpazila] = useState<UpazilaType[]>([])

	useEffect(() => {
		axios.get(`https://bdapi.editboxpro.com/api/${name}/${value}`)
			.then(response => {
				if (name === 'districts') {
					setDistrict(response.data);
				}
				else if (name === 'upazilas') {
					setUpazila(response.data);
				}
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}, [name, value])

	return [district, upazila]
}

export default useGeoDetails;