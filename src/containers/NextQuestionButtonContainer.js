import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import { NextQuestionButton } from "../components/Buttons.jsx";

const NextQuestionButtonContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");

  return {
    cash: gameReducer.get("cash"),
    cheatActive: gameReducer.get("cheatActive"),
    levelNumber: gameReducer.get("levelNumber"),
    lifes: gameReducer.get("lifes"),
    highlightCorrect: gameReducer.get("highlightCorrect"),
    questionNumber: gameReducer.get("questionNumber"),
    submitScores: gameReducer.get("submitScores")
  }

}, mapDispatchToProps)(NextQuestionButton);

export default NextQuestionButtonContainer;
