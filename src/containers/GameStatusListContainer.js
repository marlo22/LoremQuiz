import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import GameStatusList from "../components/GameStatusList.jsx";

const GameStatusListContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    cash: gameReducer.get("cash"),
    lifes: gameReducer.get("lifes"),
    notEnoughMoney: gameReducer.get("notEnoughMoney")
  }

}, mapDispatchToProps)(GameStatusList);

export default GameStatusListContainer;
