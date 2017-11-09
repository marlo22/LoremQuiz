import React from "react";
import { connect } from "react-redux";
import mapDispatchToProps from "../maps/mapDispatchToProps.js";

import Game from "../components/Game.jsx";

const GameContainer = connect(function(state) {
  let gameReducer = state.get("gameReducer");
  let appReducer = state.get("appReducer");

  return {
    confirmAnswers: appReducer.get("confirmAnswers"),

    cash: gameReducer.get("cash"),
    cheatActive: gameReducer.get("cheatActive"),
    criticalError: appReducer.get("criticalError"),
    gameEnd: gameReducer.get("gameEnd"),
    levelNumber: gameReducer.get("levelNumber"),
    lifes: gameReducer.get("lifes"),
    questionSet: gameReducer.get("questionSet"),
    questionNumber: gameReducer.get("questionNumber"),
    tips: gameReducer.get("tips"),
    selectedAnswer: gameReducer.get("selectedAnswer"),
    submitScores: gameReducer.get("submitScores"),
    timerValue: gameReducer.get("timer"),
  }
}, mapDispatchToProps)(Game);

export default GameContainer;
