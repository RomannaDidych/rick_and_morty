import React, {Component} from 'react';
import './rowLoc_style.scss';


const RowLoc = (props) => {		
	return(
		<div className= 'rowLoc'>
			<div className= 'rowLoc__name'>{props.name}</div>
			<div className= 'rowLoc__type'>{props.type}</div>
			<div className= 'rowLoc__dimension'>{props.dimension}</div>							
		</div>
	)
}

export default RowLoc;