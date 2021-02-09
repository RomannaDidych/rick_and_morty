import React, { Component } from "react";
import "./card_style.scss";

const Card = (props) => {
  return (
    <div className="card">
      <img className="card__img" src={props.image} alt={props.name} />
      <div className="card__content">
        <h3 className="card__name">{props.name}</h3>
        <p className="card__species">{props.species}</p>
      </div>
    </div>
  );
};

export default Card;
