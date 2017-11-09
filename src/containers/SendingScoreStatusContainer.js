import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import SendingScoreStatus from "../components/SendingScoreStatus.jsx";

const SendingScoreStatusContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    sendScoreStatus: gameReducer.get("sendScoreStatus"),
  }

}, mapDispatchToProps)(SendingScoreStatus);

export default SendingScoreStatusContainer;
