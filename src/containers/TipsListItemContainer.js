import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import { TipsListItem } from "../components/TipsList.jsx";

const TipsListItemContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    cash: gameReducer.get("cash"),
    cheatActive: gameReducer.get("cheatActive"),
    gameEnd: gameReducer.get("gameEnd"),
    highlightCorrect: gameReducer.get("highlightCorrect"),
    levelNumber: gameReducer.get("levelNumber"),
    timeIsUp: gameReducer.get("timeIsUp")
  }

}, mapDispatchToProps)(TipsListItem);

export default TipsListItemContainer;
