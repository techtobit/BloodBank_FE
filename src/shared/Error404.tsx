import React from 'react'
import errorImg from '../assets/error404.svg'

function Error404():React.ReactElement {
	return (
		<section className='w-full h-screen flex justify-center items-center'>
			<img className='w-95' src={errorImg} alt="" />
		</section>
	)
}

export default Error404;