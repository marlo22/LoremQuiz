import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import Settings from "../components/Settings.jsx";

const SettingsContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    bugsReporting: gameReducer.get("bugsReporting"),
    cheatActive: gameReducer.get("cheatActive"),
    categories: gameReducer.get("categories"),
    playerName: gameReducer.get("playerName"),
    submitScores: gameReducer.get("submitScores")
  }

}, mapDispatchToProps)(Settings);

export default SettingsContainer;
