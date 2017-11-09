import React from "react";
import PropTypes from "prop-types";
import { MAX_QUESTIONS_STEPS } from "../consts/rulesConsts.js";

//Components
import { Icon } from "../components/Icons.jsx";
import ProgressBar from "../components/ProgressBar.jsx";

const GameProgress = (props) => {
  let question = props.question;
  let level = props.level;
  let currentStep = Number(((level - 1) * 5) + (question));
  let percentProgress = parseInt((currentStep * 100) / MAX_QUESTIONS_STEPS);

  return (
    <div className="game-progress">
      <span>
        { question === 5 && level === 5 && props.gameEnd?
          <Icon symbol="trophy" />
          :
          `${question} / ${level}`
        }
      </span>
      <ProgressBar value={ percentProgress } />
    </div>
  );
}

GameProgress.propTypes = {
  gameEnd: PropTypes.bool.isRequired,
  level: PropTypes.number.isRequired,
  question: PropTypes.number.isRequired,
}

export default GameProgress;
