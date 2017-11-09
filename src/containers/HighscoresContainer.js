import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import Highscores from "../components/Highscores.jsx";

const HighscoresContainer = connect(function(state) {
  let appReducer = state.get("appReducer");

  return {
    highscoresData: appReducer.get("highscoresData")
  }

}, mapDispatchToProps)(Highscores);

export default HighscoresContainer;
