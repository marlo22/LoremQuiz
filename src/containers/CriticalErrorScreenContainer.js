import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import CriticalErrorScreen from "../components/CriticalErrorScreen.jsx";

const CriticalErrorScreenContainer = connect(function(state) {
  let appReducer = state.get("appReducer");

  return {
    criticalError: appReducer.get("criticalError")
  }

}, mapDispatchToProps)(CriticalErrorScreen);

export default CriticalErrorScreenContainer;
