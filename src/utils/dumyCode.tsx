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