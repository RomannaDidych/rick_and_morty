import React, { Component } from "react";
import RowLoc from "../RowLoc/RowLoc";
import "./locations_style.scss";

const mainURL = "https://rickandmortyapi.com/api/location/";
const countOnPage = 25;

class Locations extends Component {
  constructor() {
    super();
    this.maxAmount = 108;
    this.currentNumber = 0;
    this.allLocations = [];
    this.filteredLocations = [];    
    this.state = {
      locations: [],
      serchName: '',
      serchType: '',
      serchDimention: ''
    };
    this.getAllLocations();
  }

  getAllLocations = async (e) => {
    let arr = Array.from({ length: this.maxAmount }).map((arr, ind) => ind + 1);
    const response = await fetch(`${mainURL}${arr}`);
    const items = await response.json();
    this.allLocations = items;
    this.filteredLocations = items;
    const firstState = items.filter((obj, i) => i < countOnPage);
    this.setState({ locations: firstState });
  };

  changeItemsOnPage = (e) => {
    let newState;
    if (e.target.value === "next") {
      if (this.currentNumber >= this.filteredLocations.length - 25) {
        return;
      }
      this.currentNumber += 25;
      newState = this.filteredLocations.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    } else {
      if (this.currentNumber <= 0) {
        return;
      }
      this.currentNumber -= 25;
      newState = this.filteredLocations.slice(
        this.currentNumber,
        this.currentNumber + countOnPage
      );
    }
    this.setState({ locations: newState });
  };

  handleSearchChange = async (e) => {
    if(e.target.name === "name"){
        await this.setState({ searchName: e.target.value });
      };
    if(e.target.name === "type"){
        await this.setState({ serchType: e.target.value });
      };
    if(e.target.name === "dimension"){
        await this.setState({ serchDimention: e.target.value });
      };  
    let currentArr = this.allLocations; 
    currentArr = this.filterNames(currentArr);
    currentArr = this.filterTypes(currentArr);
    currentArr = this.filterDimensions(currentArr);
    this.filteredLocations = currentArr;
    //this.currentNumber = 0;    
    await  this.setState({ locations: currentArr }); 
  };

  filterNames = (arr) => {
    const currentSearch = this.state.searchName.toLowerCase().trim();
    let filteredNames = [];
    if (currentSearch !== ''){  
        filteredNames = arr.filter(
          (location) =>
            location.name.toLowerCase().includes(currentSearch)
        )
      } else {
        filteredNames = arr;
      }
    return filteredNames
  };

  filterTypes = (arr) => {
    const currentSearch = this.state.serchType.toLowerCase().trim();
    let filteredTypes = [];
    if (currentSearch !== ''){  
        filteredTypes = arr.filter(
          (location) =>
            location.type.toLowerCase().includes(currentSearch)
        )
      } else {
        filteredTypes = arr;
      }
    return filteredTypes;
  };

  filterDimensions = (arr) => {
    const currentSearch = this.state.serchDimention.toLowerCase().trim();
    let filteredDim = [];
    if (currentSearch !== ''){  
        filteredDim = arr.filter(
          (location) =>
            location.dimension.toLowerCase().includes(currentSearch)
        )
      } else {
        filteredDim = arr;
      }
    return filteredDim;
  };

  render() {
    return (
      <div className="locationContainer">
        <div className="locationButtons">
          <button
            className="btn"
            onClick={this.changeItemsOnPage}
            value="previous"
          >            
            &#60;&#60; previous
          </button>

          <div className = 'serch'>
            <p>name: </p>
            <input
            className="serch__inp"
            type="text"
            name="name"
            value={this.state.searchName}
            onChange={this.handleSearchChange}
          />
          </div>
          <div className = 'serch'>
            <p>type: </p>
            <input
            className="serch__inp"
            type="text"
            name="type"
            value={this.state.searchType}
            onChange={this.handleSearchChange}
          />
          </div>
          <div className = 'serch'>
            <p>dimention: </p>
            <input
            className="serch__inp"
            type="text"
            name="dimension"
            value={this.state.serchDimention}
            onChange={this.handleSearchChange}
          />
          </div>

          <button className="btn" onClick={this.changeItemsOnPage} value="next">
            next &#62;&#62;
          </button>
        </div>
        <div className="locationTable">
          <div className="locationTable__head">
            <div className="locationTable__name">name</div>
            <div className="locationTable__type">type</div>
            <div className="locationTable__dimension">dimention</div>
          </div>
          {this.state.locations.map((place) => (
            <RowLoc {...place} key={place.id} />
          ))}
        </div>
      </div>
    );
  }
}

export default Locations;
