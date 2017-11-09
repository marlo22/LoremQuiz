import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import SummaryReportDialog from "../components/SummaryReportDialog.jsx";

const SummaryReportDialogContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");
  let stats = gameReducer.get("stats");

  return {
    cash: gameReducer.get("cash"),
    correctAnswers: stats.get("correct"),
    incorrectAnswers: stats.get("incorrect"),
    submitScores: gameReducer.get("submitScores"),
    tipsCounter: stats.get("tipsCounter")
  }

}, mapDispatchToProps)(SummaryReportDialog);

export default SummaryReportDialogContainer;
