import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import Timer from "../components/Timer.jsx";

const TimerContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    frozenTime: gameReducer.get("frozenTime"),
    timeIsUp: gameReducer.get("timeIsUp")
  }

}, mapDispatchToProps)(Timer);

export default TimerContainer;
