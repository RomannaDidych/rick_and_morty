import React, { Component } from "react";
import Modal from 'react-responsive-modal';
import Card from "../Card/Card";
import "./characters-style.scss";

const mainURL = "https://rickandmortyapi.com/api/character/";
const countOnPage = 10;

class Characters extends Component {
  constructor() {
    super();
    this.maxAmount = 671;
    this.currentNumber = 0;
    this.allChracters = [];
    this.filteredCharacters = [];
    this.filterStatus = "all";
    this.filterGender = "all";
    this.filterSpecies = "all";
    //this.filteredCharacters = []
    this.state = {
      characters: [],
      open: false,
      selectedCard: null
    };
    this.getAllChracters();
  }

  getAllChracters = async (e) => {
    let arr = Array.from({ length: this.maxAmount }).map((arr, ind) => ind + 1);
    const response = await fetch(`${mainURL}${arr}`);
    const items = await response.json();
    this.allChracters = items;
    this.filteredCharacters = items;
    const firstState = items.filter((obj, i) => i < countOnPage);
    this.setState({ characters: firstState });
  };

  changeItemsOnPage = (e) => {
    let newState;
    if (e.target.value === "next") {
      if (this.currentNumber >= this.filteredCharacters.length - countOnPage) {
        return;
      }
      this.currentNumber += countOnPage;
      newState = this.filteredCharacters.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    } else {
      if (this.currentNumber <= 0) {
        return;
      }
      this.currentNumber -= countOnPage;
      newState = this.filteredCharacters.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    }
    this.setState({ characters: newState });
  };

  setFilteredCharacters = () => {
    let current = [];    
    this.filteredCharacters = this.allChracters;
    if (this.filterStatus !== "all") {
      current = this.filteredCharacters.filter(
        (hero) => hero.status === this.filterStatus
      );
      this.filteredCharacters = current;
    }
    if (this.filterGender !== "all") {
      current = this.filteredCharacters.filter(
        (hero) => hero.gender === this.filterGender
      );
      this.filteredCharacters = current;
    }
    if (this.filterSpecies !== "all") {
      current = this.filteredCharacters.filter(
        (hero) => hero.species === this.filterSpecies
      );
      this.filteredCharacters = current;
    }
  };

  selectStatus = (e) => {
    this.filterStatus = e.target.value;
    this.setFilteredCharacters();
    const currentState = this.filteredCharacters.filter(
      (obj, i) => i < countOnPage
    );
    this.setState({ characters: currentState });
    this.currentNumber = 0;
  };

  selectGender = (e) => {
    this.filterGender = e.target.value;
    this.setFilteredCharacters();
    const currentState = this.filteredCharacters.filter(
      (obj, i) => i < countOnPage
    );
    this.setState({ characters: currentState });
    this.currentNumber = 0;
  };

  selectSpecies = (e) => {
    this.filterSpecies = e.target.value;
    this.setFilteredCharacters();
    const currentState = this.filteredCharacters.filter(
      (obj, i) => i < countOnPage
    );
    this.setState({ characters: currentState });
    this.currentNumber = 0;
  };

  /*onOpenModal = (i) => {
    this.setState({
      open: true,
      selectedCard: i 
    });
    console.log('gggg')
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  renderModal = () => {
     Check to see if there's a selected post. If so, render it.
    if (this.state.selectedCard !== null) {
      const card = this.state.characters[this.state.selectedCard];
      return (
        <div
          
        >
          <p>name:   {card.name}</p>
          <p>status:{this.state.characters.status}</p>
          <p>species:{this.state.characters.species}</p>
          <p>type:{this.state.characters.type}</p>          
        </div>
      );
    }
  }*/

  render() {
   
    return (
      <div className="container">
        <div className="buttons">
          <button
            className="btn"
            onClick={this.changeItemsOnPage}
            value="previous"
          >
            {" "}
            &#60;&#60; previous
          </button>
          <div className="selectors">
            <div className="selector">
              <label htmlFor="status" className="selector__label">
                status:
              </label>
              <select
                className="selector__select"
                name="status"
                id="status"
                onChange={this.selectStatus}
              >
                <option value="all">all</option>
                <option value="Alive">alive</option>
                <option value="Dead">dead</option>
                <option value="unknown">unknown</option>
              </select>
              <span className="selector__arrow"></span>
            </div>
            <div className="selector">
              <label htmlFor="gender" className="selector__label">
                gender:
              </label>
              <select
                className="selector__select"
                name="gender"
                id="gender"
                onChange={this.selectGender}
              >
                <option value="all">all</option>
                <option value="Male">male</option>
                <option value="Female">female</option>
                <option value="Genderless">genderless</option>
                <option value="unknown">unknown</option>
              </select>
              <span className="selector__arrow"></span>
            </div>
            <div className="selector">
              <label htmlFor="species" className="selector__label">
                species:
              </label>
              <select
                className="selector__select"
                name="species"
                id="species"
                onChange={this.selectSpecies}
              >
                <option value="all">all</option>
                <option value="Human">human</option>
                <option value="Alien">alien</option>
                <option value="Humanoid">humanoid</option>
                <option value="Poopybutthole">poopybutthole</option>
                <option value="unknown">unknown</option>
                <option value="Mythological Creature">
                  mythological creature
                </option>
                <option value="Animal">animal</option>
                <option value="Robot">robot</option>
                <option value="Cronenberg">cronenberg</option>
                <option value="Disease">disease</option>
                <option value="Planet">planet</option>
              </select>
              <span className="selector__arrow"></span>
            </div>
          </div>
          <button className="btn" onClick={this.changeItemsOnPage} value="next">
            next &#62;&#62;
          </button>
        </div>
        <div className="table">
          {this.state.characters.map((hero) => (
            <Card {...hero} key={hero.id} />
          ))}
        </div>
        
      </div>
    );
  }
}

export default Characters;
//const { open } = this.state;