import React, { Component } from "react";
import "./watchList_style.scss";
import del from "../../assets/icons/delete.png";

class Episode extends Component {
  render() {
    return (
      <div className="episode">
        <div className="episode__checkbox">
          <input
            className="episode__inp"
            id={this.props.movie.prop.id}
            defaultChecked={this.props.movie.prop.completed}
            type="checkbox"
            name="complite"
            onChange={this.props.movie.changeComplete}
          />
        </div>
        <div className="episode__name">
          <p>{this.props.movie.prop.name}</p>
        </div>
        <button
          id={this.props.movie.prop.id}
          type="button"
          className="episode__del"
          onClick={this.props.movie.deleteEpisode}
        >
          <img
            id={this.props.movie.prop.id}
            className="act"
            src={del}
            alt="del"
          />
        </button>
      </div>
    );
  }
}

export default Episode;


         