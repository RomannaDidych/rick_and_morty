import React, { Component } from "react";
import "./row_styles.scss";

const Row = (props) => {
  return (
    <div className="row">
      <div className="row__episode">{props.episode}</div>
      <div className="row__name">{props.name}</div>
      <div className="row__air_date">{props.air_date}</div>
    </div>
  );
};

export default Row;