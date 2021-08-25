import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlaceDetails.scss";
import { motion } from "framer-motion";

function PlaceDetails() {
  const { id } = useParams();

  console.log(typeof id);
  const thumbnailRef = useRef();
  const [state, setState] = useState({
    places: "",
    index: 0
  });
  const { places, index } = state;
  const PLACES_API =
    "https://api.places.togogroup.io//api/v3/search?categories=national-park&limit=5&min_images=1&client_id=081efe616153461e80d543df9b90b656";

  const handleTumbnailClick = (index) => {
    setState({ ...state, index: index });
    const thumbnails = thumbnailRef.current.children;
    for (let i = 0; i < thumbnails.length; i++) {
      thumbnails[i].className = thumbnails[i].className.replace("active", "");
    }
    thumbnails[index].className = "active";
  };

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(PLACES_API);

      setState({
        ...state,
        places:
          response &&
          response.data &&
          response.data.data.filter((place) => place.id === parseInt(id))
      });
    } catch (error) {
      console.log(error);
      setState({
        ...state
      });
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {places &&
        places.map((place) => (
          <div className="details" key={place.id}>
            <div className="details__image-container">
              {place.images && (
                <img
                  className="details__main-image"
                  src={place.images[index].image_url}
                  alt="First item displayed in large"
                />
              )}

              <div className="details__thumbnails" ref={thumbnailRef}>
                {place.images.map((img, index) => (
                  <img
                    src={img.image_url}
                    key={place.id}
                    onClick={() => handleTumbnailClick(index)}
                    alt="Rest of items displayed in thumbnail size"
                  />
                ))}
              </div>
            </div>
            <div className="details__box">
              <div className="details__info">
                <h3>{place.name}</h3>
                <h4 className="details__location">
                  {place.locations && place.locations[0].city},{" "}
                  {place.locations && place.locations[0].state}
                </h4>
              </div>
              <p className="details__description">{place.description}</p>
            </div>
          </div>
        ))}
    </motion.div>
  );
}

export default PlaceDetails;
