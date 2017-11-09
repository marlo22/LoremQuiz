import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import Answers from "../components/Answers.jsx";
 
const AnswersContainer = connect(function(state) {
  let appReducer = state.get("appReducer");
  let gameReducer = state.get("gameReducer");

  return {
    // answerAccepted: gameReducer.get("answerAccepted"),
    // confirmAnswers: appReducer.get("confirmAnswers"),
    highlightCorrect: gameReducer.get("highlightCorrect"),
    lockedAnswers: gameReducer.get("lockedAnswers"),
    questionSet: gameReducer.get("questionSet"),
    selectedAnswer: gameReducer.get("selectedAnswer"),
    timeIsUp: gameReducer.get("timeIsUp")
  }

}, mapDispatchToProps)(Answers);

export default AnswersContainer;
