import React, { Component } from "react";
import Episode from "./Episode";
import "./watchList_style.scss";

class WatchList extends Component {
  constructor(props) {
    super(props);
    this.state = { episodes: this.updateDataFromStorage() };
  }

  updateDataFromStorage = () => {
    let data = JSON.parse(localStorage.getItem("episodesTable"));
    if (data === null) {
      data = [];
    }
    return data;
  };

  updateLocalStorage = () => {
    const table = JSON.stringify(this.state.categories);
    localStorage.setItem("episodesTable", table);
  };

  deleteEpisode = (e) => {
    const currentID = e.target.id;
    let data = JSON.parse(localStorage.getItem("episodesTable"));
    const newData = data.filter((episode) => episode.id != currentID);
    console.log(newData);
    localStorage.setItem("episodesTable", JSON.stringify(newData));
    this.setState({ episodes: this.updateDataFromStorage() });
  };

  setInformation = async (e) => {
    e.preventDefault();
    let episode = {};
    episode.name = e.target.elements.name.value;
    episode.id = Date.now();
    episode.completed = false;
    let table = this.updateDataFromStorage();
    table.push(episode);
    localStorage.setItem("episodesTable", JSON.stringify(table));
    await this.setState({ episodes: this.updateDataFromStorage() });
    e.target.elements.name.value = "";
  };

  changeComplete = async (e) => {
    const currentID = e.target.id;
    console.log(currentID);
    let data = JSON.parse(localStorage.getItem("episodesTable"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == currentID) {
        data[i].completed = e.target.checked;
        console.log(data[i]);
      }
    }
    localStorage.setItem("episodesTable", JSON.stringify(data));
    await this.setState({ episodes: this.updateDataFromStorage() });
  };

  render() {
    return (
      <div className="pageList">
        <h2 className="pageList__title">My Watch List</h2>
        <form className="pageList__form" onSubmit={this.setInformation}>
          <div className="pageList__inputarea">
            <p>episode to watch:</p>
            <input className="pageList__inp" type="text" name="name" />
          </div>
          <button type="submit" className="btn">
            add episode
          </button>
        </form>
        <div className="pageList__table">
          {this.state.episodes.map((movie, id) => (
            <Episode
              movie={{
                deleteEpisode: this.deleteEpisode,
                changeComplete: this.changeComplete,
                prop: movie,
              }}
              key={movie.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default WatchList;
