import React, {Component} from 'react';
import Card from'./Card'
import './characters-style.scss';


const mainURL = 'https://rickandmortyapi.com/api/character/';
const countOnPage = 10;
const characters = [];

class Characters extends Component{
	constructor() {
        super();
        this.maxAmount = 0
        this.currentNumber = 0        
        this.state = {        	
        	characters: []
        }
        this.setMaxAmount();               
    }

	getChracters = async () =>{		
		const arr = this.getNextArr()				
		const response = await fetch(`${mainURL}${arr}`);		
		const items = await response.json();
		this.setState({characters: items})		
		const newCurrent = this.currentNumber + 10;		
		return items;		
	}

	setMaxAmount = async () =>{
		const response = await fetch(mainURL);
		const count = await response.json();
		this.maxAmount = count.info.count;				
	}

	/*getPreviousIDarr = () => {
		const arr = Array.from({length: this.getNextLength()}).map((arr, ind) => this.state.currentNumber + ind - 9);
		return arr;
	}*/

	getNextArr = () => {
		const condition = this.maxAmount - this.currentNumber;
		let arr =[];
		if(condition >= countOnPage ) {
			arr =  Array.from({length:countOnPage}).map((arr, ind) => this.currentNumber + ind +1);
		} else {
			arr =  Array.from({length:condition}).map((arr, ind) => this.currentNumber + ind +1);
		}
		return arr;
	}


	render(){
		
		const data = this.getChracters;
		console.log(data);		
		return (
			<div className='container'>				
				<h2 className='title'>Characters</h2>
				<div className= 'table'>
					{this.state.characters.map((hero) => <Card {...hero} key={hero.id} />)}
				</div>
				<div className= "buttons">
					<button onClick={this.getChracters} value='previous'>previous characters</button>
					<button onClick={this.getChracters} value='next'>next characters</button>
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