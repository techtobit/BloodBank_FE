import axios from "axios";
import { useEffect, useState } from "react";
import { DistrictType, UpazilaType } from '../utils/type';
const GEO_BASE_URL = import.meta.env.VITE_API_GEO_URL;

const useGeoDetails = (setFindUnder: string | undefined, searchQuery: string|undefined) => {
	const [district, setDistrict] = useState<DistrictType[]>([])
	const [upazila, setUpazila] = useState<UpazilaType[]>([])

	useEffect(() => {
		axios.get(`${GEO_BASE_URL}${setFindUnder}/${searchQuery}`)
			.then(response => {
				if (setFindUnder === 'districts') {
					setDistrict(response.data);
				}
				else if (setFindUnder === 'upazilas') {
					setUpazila(response.data);
				}
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
	}, [setFindUnder, searchQuery])

	return [district, upazila]
}

export default useGeoDetails;