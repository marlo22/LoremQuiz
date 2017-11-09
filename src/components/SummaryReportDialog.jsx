import React from "react";
import PropTypes from "prop-types";

import { TOTAL_POINTS } from "../consts/rulesConsts.js";

//Components
import CenterList from "../components/CenterList.jsx";
import { Icon } from "../components/Icons.jsx";
import { BtnGroup, SimpleButton } from "../components/Buttons.jsx";
import SendingScoreStatusContainer from "../containers/SendingScoreStatusContainer.js";

function calculatePercent(value, maxValue) {
  if(value !== 0 && maxValue !== 0) {
    return parseInt((value * 100) / maxValue) + "%";
  } else {
    return 0 + "%";
  }
}

const SummaryReportDialog = (props) => {
  let questionsSum = props.correctAnswers + props.incorrectAnswers;

  return (
    <div className="summary-report">
      <span className="title">Podsumowanie gry</span>
      <CenterList>
        <ul className="summary-list">
          <li>Poprawne odpowiedzi: { props.correctAnswers + " (" + calculatePercent(props.correctAnswers, questionsSum) + ")" }</li>
          <li>Błędne odpowiedzi: { props.incorrectAnswers + " (" + calculatePercent(props.incorrectAnswers, questionsSum) + ")" }</li>
          <li>Łącznie udzielonych odpowiedzi: { questionsSum }</li>
          <li>Zdobyte punkty: { props.cash }</li>
          <li>Wykorzystane podpowiedzi: { props.tipsCounter }</li>
          <li>Wynik procentowy: { calculatePercent(props.cash, TOTAL_POINTS) }</li>
          { /* <li>Miejsce w rankingu: 1</li> */ }
          { props.submitScores && (props.cash > 0)? <li><SendingScoreStatusContainer /></li> : null }
        </ul>
      </CenterList>
      <BtnGroup>
        <SimpleButton
          className="btn"
          onClick={ () => {
            props.actions.resetGame();
            props.actions.getQuestion(1);
          } }
        >
          Od nowa
        </SimpleButton>

        <SimpleButton
          className="btn"
          localHref="/"
          onClick={ () => {
            props.actions.resetGame();
          } }
        >
          Powrót do menu
        </SimpleButton>
      </BtnGroup>
    </div>
  )
}

SummaryReportDialog.propTypes = {
  cash: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
  incorrectAnswers: PropTypes.number.isRequired,
  submitScores: PropTypes.bool.isRequired,
  tipsCounter: PropTypes.number.isRequired
}

export default SummaryReportDialog;
