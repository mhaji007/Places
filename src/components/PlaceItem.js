import React from "react";
import { Link } from "react-router-dom";
import "./PlaceItem.scss";

function PlaceItem({ id, image, name, subtitle }) {
  return (
    <Link to={`/${id}`}>
      <div className="card">
        <img className="card__image" src={image} alt="First canocical place" />
        <div className="card__body">
          <h2 className="card__title">{name}</h2>
          <p className="card__description">{subtitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default PlaceItem;
