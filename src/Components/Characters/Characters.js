import React, {Component} from 'react';
import Card from'./Card'
import './characters-style.scss';


const mainURL = 'https://rickandmortyapi.com/api/character/';
const countOnPage = 10;


class Characters extends Component{
	constructor() {
        super();
        this.maxAmount = 671
        this.currentNumber = 0
        this.allChracters = []
        this.filteredCharacters = []
        this.filterStatus = 'all'
        this.filterGender = 'all'
        this.filterSpecies = 'all'
        this.filteredCharacters = []        
        this.state = {        	
        	characters: []
        }
        //this.setMaxAmount();
        this.getAllChracters();               
    }

	getAllChracters = async (e) =>{
		let arr =  Array.from({length:this.maxAmount}).map((arr, ind) =>  ind +1);  //this.currentNumber +					
		const response = await fetch(`${mainURL}${arr}`);		
		const items = await response.json();
		this.allChracters = items;
		this.filteredCharacters = items;		
		const firstState = items.filter((obj, i) => i < countOnPage);
		this.setState({characters: firstState});				
	}

	changeItemsOnPage = (e) => {
		let newState;
		if (e.target.value === 'next')	{
			if (this.currentNumber >= this.filteredCharacters.length - 10) {
				return;
			}
			this.currentNumber += 10;
			newState = this.filteredCharacters.slice(this.currentNumber, this.currentNumber + countOnPage );// change allChracters to filteredCharacters
						
		} else {
			if (this.currentNumber <= 0){
				return;
			}
			this.currentNumber -= 10;
			newState = this.filteredCharacters.slice(this.currentNumber, this.currentNumber + countOnPage);
			
		};
		this.setState({characters: newState});
	};	

	/*setMaxAmount = async () =>{
		const response = await fetch(mainURL);
		const count = await response.json();
		this.maxAmount = count.info.count;				
	}

	getPreviousArr = () => {
		const arr = Array.from({length: countOnPage}).map((arr, ind) => this.currentNumber + ind - 9);
		return arr;
	}

	getNextArr = () => {
		const condition = this.maxAmount - this.currentNumber;
		let arr =[];
		if(condition >= countOnPage ) {
			arr =  Array.from({length:countOnPage}).map((arr, ind) => this.currentNumber + ind +1);
		} else {
			arr =  Array.from({length:condition}).map((arr, ind) => this.currentNumber + ind +1);
		}
		return arr;
	}*/

	setFilteredCharacters = () => {
		let current = [];
		//if((this.filterStatus === 'all') || (this.filterGander === 'all') || (this.filterSpecies !== 'all')){}
		this.filteredCharacters = this.allChracters;		
		if(this.filterStatus !== 'all'){
			current = this.filteredCharacters.filter((hero) => hero.status === this.filterStatus)
			this.filteredCharacters = current;
		};
		if(this.filterGender !== 'all'){
			current = this.filteredCharacters.filter((hero) => hero.gender === this.filterGender);
			this.filteredCharacters = current;
		};
		if(this.filterSpecies !== 'all'){
			current = this.filteredCharacters.filter((hero) => hero.species === this.filterSpecies)
			this.filteredCharacters = current;
		}
	}

	selectStatus = (e) => {
		this.filterStatus = e.target.value;
		//console.log(this.filterStatus);
		this.setFilteredCharacters();
		const currentState = this.filteredCharacters.filter((obj, i) => i < countOnPage);
		this.setState({characters: currentState});
		this.currentNumber = 0;
	}

	selectGender = (e) => {
		this.filterGender = e.target.value;
		//console.log(this.filterStatus);
		this.setFilteredCharacters();
		const currentState = this.filteredCharacters.filter((obj, i) => i < countOnPage);
		this.setState({characters: currentState});
		this.currentNumber = 0;
	}

	selectSpecies = (e) => {
		this.filterSpecies = e.target.value;
		//console.log(this.filterStatus);
		this.setFilteredCharacters();
		const currentState = this.filteredCharacters.filter((obj, i) => i < countOnPage);
		this.setState({characters: currentState});
		this.currentNumber = 0;
	}


	render(){				
		return (
			<div className='container'>				
								
				<div className= "buttons">
					<button className= 'btn' onClick={this.changeItemsOnPage} value='previous'>previous characters</button>
					<div className='selectors'>
						<div className='selector'>
							<select name="status" id="status" onChange={this.selectStatus}>
								<option value="all">all</option>
								<option value="Alive">alive</option>
								<option value="Dead">dead</option>
								<option value="unknown">unknown</option>
							</select>
						</div>
						<div className='selector'>
							<select name="gender" id="status" onChange={this.selectGender}>
								<option value="all">all</option>
								<option value="Male">male</option>
								<option value="Female">female</option>
								<option value="Genderless">genderless</option>
								<option value="unknown">unknown</option>
							</select>
						</div>
						<div className='selector'>
							<select name="species" id="status" onChange={this.selectSpecies}>
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
						</div>
					</div>
					<button className= 'btn' onClick={this.changeItemsOnPage} value='next'>next characters</button>
				</div>
				<div className= 'table'>
					{this.state.characters.map((hero) => <Card {...hero} key={hero.id} />)}
				</div>
			</div>
			)
	}

}

export default Characters;

//<button onClick={this.getChracters}>get Characters</button>
//onClick={() =>{console.log(characters)}}
//const response = await fetch(`https://rickandmortyapi.com/api/character/${Array.from({length: lengthArr}).map((arr, ind) => this.state.currentNumber + ind +1)}`);
//const response = await fetch(`https://rickandmortyapi.com/api/character/${Array.from({length: 10}).map((arr, ind) => this.state.currentNumber + ind +1)}`);
//<h2 className='title'>Characters</h2>
/*<div className= 'table'>
					{this.state.characters.map((hero) => <Card {...hero} key={hero.id} />)}
				</div>	*/