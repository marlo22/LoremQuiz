import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

//Components
import CriticalErrorScreenContainer from "../containers/CriticalErrorScreenContainer.js";
import Header from "./Header.jsx";
  import GameStatusListContainer from "../containers/GameStatusListContainer.js";
  import GameProgress from "./GameProgress.jsx";
  import { TipsList } from "./TipsList.jsx";
  import TipsListItemContainer from "../containers/TipsListItemContainer.js";

import Main from "./Main.jsx";
  import SummaryReportDialogContainer from "../containers/SummaryReportDialogContainer.js";
  import TimerContainer from "../containers/TimerContainer.js";
  import GameBoard from "./GameBoard.jsx";
    import Question from "./Question.jsx";
    import AnswersContainer from "../containers/AnswersContainer.js";
  import { BtnGroup, GameConfirmButton, FunctionalBtn } from "./Buttons.jsx";
  import NextQuestionButtonContainer from "../containers/NextQuestionButtonContainer.js";

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.listenLifeNumber = this.listenLifeNumber.bind(this);
    this.cancelGame = this.cancelGame.bind(this);
  }

  componentDidMount() {
    this.props.actions.getQuestion(this.props.levelNumber);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.lifes !== this.props.lifes) {
      this.listenLifeNumber(nextProps.lifes);
    }
  }

  listenLifeNumber(lifeNumber) {
    if(lifeNumber <= 0) {
      if(this.props.submitScores && !this.props.cheatActive && (this.props.cash > 0)) {
        this.props.actions.changeSubmitScoreStatus(1);
        this.props.actions.submitScore();
      }

      setTimeout(() => {
        this.props.actions.gameOver();
      }, 2000);
    } else {
      return null;
    }
  }

  cancelGame() {
    if(this.props.submitScores && !this.props.cheatActive && (this.props.cash > 0)) {
      this.props.actions.changeSubmitScoreStatus(1);
      this.props.actions.submitScore();
    }
    this.props.actions.gameOver()
  }

  render() {
    let tips = this.props.tips;
    let questionSet = this.props.questionSet;
    let extraChance = tips.get("extraChance");
    let swapQuestion = tips.get("swapQuestion");
    let elliminate1answer = tips.get("elliminate1answer");
    let elliminate2answers = tips.get("elliminate2answers");
    let freezeTime = tips.get("freezeTime");

    return (
      <div className="inner">
        { this.props.criticalError? <CriticalErrorScreenContainer /> : null }
        <Header>
          <GameStatusListContainer />
          <GameProgress level={ this.props.levelNumber } question={ this.props.questionNumber } gameEnd={ this.props.gameEnd } />
          <TipsList>
            <TipsListItemContainer symbol="plus" type="extraChance" cost={ extraChance.get("cost") } used={ extraChance.get("used") } description="Dodatkowa szansa" />
            <TipsListItemContainer symbol="refresh" type="swapQuestion" cost={ swapQuestion.get("cost") } used={ swapQuestion.get("used") } description="Podmiana pytania" />
            <TipsListItemContainer symbol="angle-left" type="elliminate1answer" cost={ elliminate1answer.get("cost") } used={ elliminate1answer.get("used") } description="Odrzuć jedną błędną odpowiedź" />
            <TipsListItemContainer symbol="angle-double-left" type="elliminate2answers" cost={ elliminate2answers.get("cost") } used={ elliminate2answers.get("used") } description="Odrzuć dwie błędne odpowiedź" />
            <TipsListItemContainer symbol="snowflake-o" type="freezeTime" cost={ freezeTime.get("cost") } used={ freezeTime.get("used") } description="Zatrzymaj czas" />
          </TipsList>
        </Header>
        <Main className={ this.props.gameEnd? "summary-report-main" : null }>
          { this.props.gameEnd? <SummaryReportDialogContainer /> : null }
          { this.props.timerValue !== -1? <TimerContainer value={ this.props.timerValue } /> : null }
          <GameBoard>
            <Question>{ questionSet.get("question") }</Question>
            <AnswersContainer />
          </GameBoard>
          <BtnGroup>
            { /*this.props.confirmAnswers? <GameConfirmButton selectedAnswer={ this.props.selectedAnswer } acceptAnswer={ this.props.actions.acceptAnswer } /> : null*/ }
            <FunctionalBtn value="Zrezygnuj" symbol="close" type="cancel" onClick={ this.cancelGame } />
            <NextQuestionButtonContainer />
          </BtnGroup>
        </Main>
      </div>
    );
  }
}

Game.propTypes = {
  actions: PropTypes.object.isRequired,
  cash: PropTypes.number.isRequired,
  cheatActive: PropTypes.bool.isRequired,
  confirmAnswers: PropTypes.bool.isRequired,
  criticalError: PropTypes.string,
  gameEnd: PropTypes.bool.isRequired,
  levelNumber: PropTypes.number.isRequired,
  lifes: PropTypes.number.isRequired,
  selectedAnswer: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  submitScores: PropTypes.bool.isRequired,
  timerValue: PropTypes.number.isRequired,
  tips: ImmutablePropTypes.shape({
    extraChance: ImmutablePropTypes.shape({
      used: PropTypes.bool.isRequired,
      cost: PropTypes.number.isRequired
    }),
    swapQuestion: ImmutablePropTypes.shape({
      used: PropTypes.bool.isRequired,
      cost: PropTypes.number.isRequired
    }),
    elliminate1answer: ImmutablePropTypes.shape({
      used: PropTypes.bool.isRequired,
      cost: PropTypes.number.isRequired
    }),
    elliminate2answers: ImmutablePropTypes.shape({
      used: PropTypes.bool.isRequired,
      cost: PropTypes.number.isRequired
    }),
    freezeTime: ImmutablePropTypes.shape({
      used: PropTypes.bool.isRequired,
      cost: PropTypes.number.isRequired
    }),
  }).isRequired
}

export default Game;
