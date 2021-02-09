import React, {Component} from 'react';
import Row from '../Row/Row';
import './episodes_style.scss';

const mainURL = 'https://rickandmortyapi.com/api/episode/';
const countOnPage = 25;

class Episodes extends Component{
	constructor() {
        super();
        this.maxAmount = 41
        this.currentNumber = 0
        this.allEpisodes = []
        this.filteredEpisodes = []
        this.filterStatus = 'all'
        this.filterGender = 'all'
        this.filterSpecies = 'all'                
        this.state = {        	
        	episodes: []
        }        
        this.getAllEpisodes();               
    }

    getAllEpisodes = async (e) =>{
		let arr =  Array.from({length:this.maxAmount}).map((arr, ind) =>  ind +1);					
		const response = await fetch(`${mainURL}${arr}`);		
		const items = await response.json();
		this.allEpisodes = items; 
		this.filteredEpisodes = items;		
		const firstState = items.filter((obj, i) => i < countOnPage);
		this.setState({episodes: firstState});				
	}

	changeItemsOnPage = (e) => {
		let newState;
		if (e.target.value === 'next')	{
			if (this.currentNumber >= this.filteredEpisodes.length - 25) {
				return;
			}
			this.currentNumber += 25;
			newState = this.filteredEpisodes.slice(this.currentNumber, this.currentNumber + countOnPage );
						
		} else {
			if (this.currentNumber <= 0){
				return;
			}
			this.currentNumber -= 25;
			newState = this.filteredEpisodes.slice(this.currentNumber, this.currentNumber + countOnPage);
			
		};
		this.setState({episodes: newState});
	};

	

	render(){
		return (
			<div className='episodContainer'>
				<div className= "episodButtons">
					<button className= 'btn' onClick={this.changeItemsOnPage} value='previous'> &#60;&#60;  previous</button>
					
					<button className= 'btn' onClick={this.changeItemsOnPage} value='next'>next  &#62;&#62;</button>
				</div>
				<div className= 'episodTable'>
					<div className= 'episodTable__head'>
						<div className= 'episodTable__episode'>episode</div>
						<div className= 'episodTable__name'>episodes name</div>
						<div className= 'episodTable__air_date'>air date</div>									
					</div>
					{this.state.episodes.map((film) => <Row {...film} key={film.id} />)}
				</div>
			</div>
			)
	}

}

export default Episodes;

/*<div className='selectors'>
						<div className='selector'>
							<label htmlFor="status" className='selector__label'>status:</label>
							<select className='selector__select' name="status" id="status" onChange={this.selectStatus}>
								<option value="all">all</option>
								<option value="Alive">alive</option>
								<option value="Dead">dead</option>
								<option value="unknown">unknown</option>
							</select>
							<span className='selector__arrow'></span>
						</div>
						<div className='selector'>
							<label htmlFor="gender" className='selector__label'>gender:</label>
							<select className='selector__select' name="gender" id="gender" onChange={this.selectGender}>
								<option value="all">all</option>
								<option value="Male">male</option>
								<option value="Female">female</option>
								<option value="Genderless">genderless</option>
								<option value="unknown">unknown</option>
							</select>
							<span className='selector__arrow'></span>
						</div>
						<div className='selector'>
							<label htmlFor="species" className='selector__label'>species:</label>
							<select className='selector__select' name="species" id="species" onChange={this.selectSpecies}>
								<option value="all">all</option>
								<option value="Human">human</option>
								<option value="Alien">alien</option>
								<option value="Humanoid">humanoid</option>
								<option value="Poopybutthole">poopybutthole</option>
								<option value="unknown">unknown</option>
								<option value="Mythological Creature">mythological creature</option>
								<option value="Animal">animal</option>
								<option value="Robot">robot</option>
								<option value="Cronenberg">cronenberg</option>
								<option value="Disease">disease</option>
								<option value="Planet">planet</option>
							</select>
							<span className='selector__arrow'></span>
						</div>
					</div>*/

/*parsedStr = (str) => {
		const date = new Date(str);
		console.log(date)
		const newStr = `${date.getMonth()} ${date.getDate()}, ${date.getFullYear()}`;
		//console.log(newStr);
		return newStr;
	}*/