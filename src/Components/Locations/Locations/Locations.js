import React, {Component} from 'react';
import RowLoc from '../RowLoc/RowLoc';
import './locations_style.scss';

const mainURL = 'https://rickandmortyapi.com/api/location/';
const countOnPage = 25;

class Locations extends Component{
	constructor() {
        super();
        this.maxAmount = 108
        this.currentNumber = 0
        this.allLocations = []
        this.filteredLocations = []
        this.filterStatus = 'all'
        this.filterGender = 'all'
        this.filterSpecies = 'all'                
        this.state = {        	
        	episodes: []
        }        
        this.getAllLocations();               
    }

    getAllLocations = async (e) =>{
		let arr =  Array.from({length:this.maxAmount}).map((arr, ind) =>  ind +1);					
		const response = await fetch(`${mainURL}${arr}`);		
		const items = await response.json();
		this.allLocations = items; 
		this.filteredLocations = items;		
		const firstState = items.filter((obj, i) => i < countOnPage);
		this.setState({episodes: firstState});				
	}

	changeItemsOnPage = (e) => {
		let newState;
		if (e.target.value === 'next')	{
			if (this.currentNumber >= this.filteredLocations.length - 25) {
				return;
			}
			this.currentNumber += 25;
			newState = this.filteredLocations.slice(this.currentNumber, this.currentNumber + countOnPage );
						
		} else {
			if (this.currentNumber <= 0){
				return;
			}
			this.currentNumber -= 25;
			newState = this.filteredLocations.slice(this.currentNumber, this.currentNumber + countOnPage);
			
		};
		this.setState({episodes: newState});
	};

	

	render(){
		return (
			<div className='locationContainer'>
				<div className= "locationButtons">
					<button className= 'btn' onClick={this.changeItemsOnPage} value='previous'> &#60;&#60;  previous</button>
					
					<button className= 'btn' onClick={this.changeItemsOnPage} value='next'>next  &#62;&#62;</button>
				</div>
				<div className= 'locationTable'>
					<div className= 'locationTable__head'>
						<div className= 'locationTable__name'>name</div>
						<div className= 'locationTable__type'>type</div>
						<div className= 'locationTable__dimension'>dimention</div>									
					</div>
					{this.state.episodes.map((place) => <RowLoc {...place} key={place.id} />)}
				</div>
			</div>
			)
	}

}

export default Locations;