import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './Loader.styles.scss';

const Loader = props => {
	return (
		<React.Fragment>
			<div
				className={
					props.normal
						? 'cssload-dots-small'
						: 'cssload-dots-absolute'
				}
			>
				<div className='cssload-dot'></div>
				<div className='cssload-dot'></div>
				<div className='cssload-dot'></div>
				<div className='cssload-dot'></div>
				<div className='cssload-dot'></div>
			</div>
			<svg version='1.1' xmlns='http://www.w3.org/2000/svg'>
				<defs>
					<filter id='goo'>
						<feGaussianBlur
							in='SourceGraphic'
							result='blur'
							stdDeviation='12'
						></feGaussianBlur>
						<feColorMatrix
							in='blur'
							mode='matrix'
							values='1 0 0 0 0	0 1 0 0 0	0 0 1 0 0	0 0 0 18 -7'
							result='goo'
						></feColorMatrix>
					</filter>
				</defs>
			</svg>
		</React.Fragment>
	);
};

Loader.propTypes = {
	normal: PropTypes.bool
};

export default Loader;
