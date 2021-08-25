import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PlaceDetails from "./pages/PlaceDetails";
import { AnimatePresence } from "framer-motion";

const Router = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/:id" component={PlaceDetails}></Route>
      </Switch>
    </AnimatePresence>
  );
};

export default Router;
