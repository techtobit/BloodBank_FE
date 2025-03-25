import React from 'react'
import donar from '../assets/donar.svg';
import roundShape from '../assets/svg/round.svg';
import leaf from '../assets/svg/leaf.svg';
import leaf70deg from '../assets/svg/leaf70deg.svg';
import leafGray from '../assets/svg/leafGray.svg';
import fill_Plus from '../assets/svg/Fill_Plus.svg';
import plus from '../assets/svg/plus.svg';
import uShape from '../assets/svg/uShape.svg';
import lShape from '../assets/svg/lShape.svg';


function BackgroundAsset():React.ReactElement {

	return (
		<div className='reletive'>
		<img src={roundShape} alt="roundShape" className='absolute left-[1%] bottom-0' />
		{/* <img src={donar} alt="donar_blob" className='absolute w-[550px] left-[-2%] bottom-[13%]' /> */}
		<img src={leaf} alt="leaf_blob" className='absolute left-[4%] -bottom-0' />
		<img src={fill_Plus} alt="fill_Plus" className='absolute w-8 left-0 top-[10%]' />
		<img src={fill_Plus} alt="fill_Plus" className='absolute w-8 left-[41%] bottom-[6%]' />
		<img src={plus} alt="plus" className='absolute w-10 left-[19%] top-[30%]' />
		<img src={uShape} alt="uShape" className='absolute right-[0%] top-[0%]' />
		<img src={fill_Plus} alt="fill_Plus" className='absolute right-[4%] top-[4%]' />
		<img src={lShape} alt="lShape" className='absolute right-[0%] bottom-[0%]' />
		<img src={leaf70deg} alt="leaf70deg" className='absolute right-[4%] bottom-0' />
		<img src={leafGray} alt="leafGray" className='absolute right-[20%] bottom-0' />
	</div>
	)
}

export default BackgroundAsset