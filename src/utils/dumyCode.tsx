// donar 


	// const handleSelectAddress = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	const id = e.target.id;
	// 	const value = e.target.value;
	// 	setFindUnder(id)
	// 	setSearchQuery(value)
	// }

	// const [district, upazila] = useGeoDetails(findUnder, searchQuery)


	// useEffect(() => {
	// 	const url = `${BASE_API_URL}donars/?page=${[currentPage]}`
	// 	fetch(url)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log(data);
	// 			setCoutPages(data?.count / 12)
	// 			setDonars(data.results)
	// 		})
	// }, [currentPage])

	// const onSubmit = (e: any) => {
	// 	console.log(e)
	// 	const url = `${BASE_API_URL}donars/?division=${e.division}&district=${e.district}&upazila=${encodeURIComponent(e?.upazila)}&blood_group=${encodeURIComponent(e.blood_group)}`
	// 	console.log(url)
	// 	fetch(url)
	// 		.then(response => response.json())
	// 		.then(data => {
	// 			console.log(data);
	// 			setDonars(data.results)
	// 			setActionFilter(true)
	// 		})
	// }





		// const fetchDonars = async (params = {}) => {
	// 	const url = new URL(`${BASE_API_URL}donars/`);
	// 	if(filterActive===true){

	// 		Object.entries(params).forEach(([key, value]) => {
	// 			url.searchParams.append(key, encodeURIComponent(value.toString()));
	// 		})
	// 	}else{
	// 		url.searchParams.append('page', currentPage.toString());
	// 	}

	// 	console.log(url.toString())


	// 	try {
	// 		const response = await fetch(url.toString());
	// 		const data = await response.json();
	// 		setDonars(data.results)
	// 		setCoutPages(Math.ceil(data?.count / 12))
	// 		setFilterActive(false)
	// 	}
	// 	catch (error) {
	// 		console.error('There was an error!', error);
	// 	}

	// }

	// useEffect(() => {
	// 	fetchDonars()
	// }, [currentPage])

	// const onSubmit = (e: DonarSearchType) => {
	// 	setFilterActive(true)
	// 	fetchDonars({
	// 		division: e.division,
	// 		district: e.district,
	// 		upazila: e.upazila ? e.upazila : '',
	// 		blood_group: e.blood_group ? e.blood_group : '',
	// 	});

	// }