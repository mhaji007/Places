import React, { useEffect, useState } from "react";
import axios from "axios";
import PlaceItem from "../components/PlaceItem";
import "./Home.scss";
import { motion } from "framer-motion";

const Home = () => {
  const [state, setState] = useState({
    places: ""
  });
  const { places } = state;
  const PLACES_API =
    "https://api.places.togogroup.io//api/v3/search?categories=national-park&limit=5&min_images=1&client_id=081efe616153461e80d543df9b90b656";

  const fetchPlaces = async () => {
    try {
      const response = await axios.get(PLACES_API);

      setState({
        ...state,
        places: response && response.data && response.data.data
      });
    } catch (error) {
      console.log(error);
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
      transition={{ duration: 0.5 }}
    >
      <div className="app">
        {places &&
          places.map((place) => (
            <PlaceItem
              key={place.id}
              id={place.id}
              name={place.name}
              image={place.images && place.images[0].image_url}
              subtitle={place.subtitle}
            />
          ))}
      </div>
    </motion.div>
  );
};
export default Home;
