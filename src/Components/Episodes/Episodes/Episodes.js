import React, { Component } from "react";
import Row from "../Row/Row";
import "./episodes_style.scss";

const mainURL = "https://rickandmortyapi.com/api/episode/";
const countOnPage = 25;

class Episodes extends Component {
  constructor() {
    super();
    this.maxAmount = 41;
    this.currentNumber = 0;
    this.allEpisodes = [];
    this.filteredEpisodes = [];   
    this.state = {
      episodes: [],
      serch: ''
    };
    this.getAllEpisodes();
  }

  getAllEpisodes = async (e) => {
    let arr = Array.from({ length: this.maxAmount }).map((arr, ind) => ind + 1);
    const response = await fetch(`${mainURL}${arr}`);
    const items = await response.json();
    this.allEpisodes = items;
    this.filteredEpisodes = items;
    const firstState = items.filter((obj, i) => i < countOnPage);
    this.setState({ episodes: firstState });
  };

  changeItemsOnPage = (e) => {
    let newState;
    if (e.target.value === "next") {
      if (this.currentNumber >= this.filteredEpisodes.length - countOnPage) {
        return;
      }
      this.currentNumber += countOnPage;
      newState = this.filteredEpisodes.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    } else {
      if (this.currentNumber <= 0) {
        return;
      }
      this.currentNumber -= countOnPage;
      newState = this.filteredEpisodes.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    }
    this.setState({ episodes: newState });
  };

  handleSearchChange = async (e) => {
    await this.setState({ search: e.target.value });
    this.filterNames();
  };

  filterNames = () => {
    const currentSearch = this.state.search.toLowerCase().trim();  
    let filteredNames = this.allEpisodes.filter(
      (episode) =>
        episode.name.toLowerCase().includes(currentSearch)
    );
    this.filteredEpisodes = filteredNames;
    if (filteredNames !== []) {
      this.setState({ episodes: filteredNames });
    } else {
      this.setState({ episodes: this.allEpisodes });
    }
  };

  render() {
    return (
      <div className="episodContainer">
        <div className="episodButtons">
          <button
            className="btn"
            onClick={this.changeItemsOnPage}
            value="previous"
          >            
            &#60;&#60; previous
          </button>
          <div className = 'serch'>
          	<p>choose an episode title: </p>
          	<input
	          className="serch__input"
	          type="text"
	          value={this.state.search}
	          onChange={this.handleSearchChange}
        	/>
          </div>
          <button className="btn" onClick={this.changeItemsOnPage} value="next">
            next &#62;&#62;
          </button>
        </div>
        <div className="episodTable">
          <div className="episodTable__head">
            <div className="episodTable__episode">episode</div>
            <div className="episodTable__name">episode title</div>
            <div className="episodTable__air_date">air date</div>
          </div>
          {this.state.episodes.map((film) => (
            <Row {...film} key={film.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Episodes;

