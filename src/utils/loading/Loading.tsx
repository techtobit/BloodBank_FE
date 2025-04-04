
import React from 'react'
import './loading.css'

function Loading():React.ReactElement {
	// This is a loading component that shows a spinner while the page is loading
	return (
		<div className='flex justify-center items-center'>
			<span className="loader"></span>
		</div>
	)
}

export default Loading