import React from 'react';

import './index.css';

export default function Spinner({ description }) {
	return (
		<div className="spinner">
			<div className="preloader-wrapper small active">
				<div className="spinner-layer spinner-blue-only">
					<div className="circle-clipper left">
						<div className="circle"></div>
					</div>
					<div className="gap-patch">
						<div className="circle"></div>
					</div>
					<div className="circle-clipper right">
						<div className="circle"></div>
					</div>
				</div>
			</div>
      <div>{description}...</div>
		</div>
	);
}
