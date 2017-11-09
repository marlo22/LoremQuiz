import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import MainMenu from "../components/MainMenu.jsx";

const MainMenuContainer = connect(function(state) {
  let appReducer = state.get("appReducer"),
      gameReducer = state.get("gameReducer");

  return {
    gameLoaded: appReducer.get("gameLoaded"),
    criticalError: appReducer.get("criticalError")
  }

}, mapDispatchToProps)(MainMenu);

export default MainMenuContainer;
