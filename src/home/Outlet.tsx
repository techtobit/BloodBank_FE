import React from 'react'
import HeroPage from './HeroPage'
import DonnarList from './DonnarList'
import UserInteraction from './UserInteraction'


export default function Outlet():React.ReactElement {
	return (
		<>
			{/* <HeroPage/> */}
			<DonnarList/>
			{/* <UserInteraction/> */}
		</>
	)
}