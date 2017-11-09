import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";

//Components
import { Icon } from "./Icons.jsx";

export const BtnGroup = (props) => {
  let children = React.Children.toArray(props.children);

  return (
    <div className="btn-group">
      { children }
    </div>
  );
}

BtnGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]).isRequired
}

export class SimpleButton extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  onClick() {
    if(this.props.localHref && this.props.onClick) {
      this.props.onClick();
      return this.context.router.history.push(this.props.localHref);
    }

    if(this.props.localHref && !this.props.onClick) {
      return this.context.router.history.push(this.props.localHref);
    }

    if(!this.props.localHref && this.props.onClick) {
      this.props.onClick();
    }

    if(this.props.extHref) {
      return window.location.replace(this.props.extHref);
    }

    return null;
  }

  prepareClassName() {
    let className,
        props = this.props;

    if(props.className) {
      className = "btn " + props.className;
    }

    if(props.transparent) {
      className = "btn-transparent";
    }

    return className;
  }

  render() {
    let children = React.Children.toArray(this.props.children);

    return (
      <button
        className={ this.prepareClassName() }
        onClick={ this.onClick }
      >
      { children }
      </button>
    );
  }
}

SimpleButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number
  ]).isRequired,
  className: PropTypes.string,
  extHref: PropTypes.string,
  localHref: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  onClick: PropTypes.func,
  transparent: PropTypes.bool
}

export const FunctionalBtn = (props) => {
  return (
    <button
      onClick={ props.onClick? props.onClick : null }
      type="button"
      className={ props.type? "btn-transparent functional-btn " + props.type + "-btn" : "btn-transparent functional-btn default-btn" }
    >
      { props.symbol? <Icon symbol={ props.symbol } /> : null }
      { " " }
      { props.value }
    </button>
  );
}

FunctionalBtn.propTypes = {
  onClick: PropTypes.func,
  symbol: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export class NextQuestionButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      btnText: "Następne pytanie"
    }

    this.nextQuestion = this.nextQuestion.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.levelNumber === 5 && nextProps.questionNumber === 5) {
      this.setState({
        btnText: "Sprawdź i zakończ grę"
      })
    }
  }

  nextQuestion() {
    let levelNumber = this.props.levelNumber,
        questionNumber = this.props.questionNumber;

    if(levelNumber === 5 && questionNumber === 5) {
      if(this.props.submitScores && !this.props.cheatActive && (this.props.cash > 0)) {
        this.props.actions.changeSubmitScoreStatus(1);
        this.props.actions.submitScore();
      }

      this.props.actions.gameOver();
    } else {
      if(questionNumber === 5) {
        levelNumber += 1;
      }

      this.props.actions.nextQuestion();
      this.props.actions.getQuestion(levelNumber);
    }

    this.props.actions.resetRoundState();
  }

  render() {
    return(
      <FunctionalBtn
        value={ this.state.btnText }
        type={ !this.props.highlightCorrect || this.props.lifes <= 0? "inactive" : null }
        symbol="angle-right"
        onClick={ this.props.highlightCorrect && this.props.lifes > 0? this.nextQuestion : null }
      />
    )
  }
}

NextQuestionButton.propTypes = {
  actions: PropTypes.object.isRequired,
  cash: PropTypes.number.isRequired,
  cheatActive: PropTypes.bool.isRequired,
  highlightCorrect: PropTypes.bool.isRequired,
  lifes: PropTypes.number.isRequired,
  levelNumber: PropTypes.number.isRequired,
  questionNumber: PropTypes.number.isRequired,
  submitScores: PropTypes.bool.isRequired
}

export class GameConfirmButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.selectedAnswer || "inactive"
    }

    this.acceptAnswer = this.acceptAnswer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.props.selectedAnswer !== nextProps.selectedAnswer? this.setState({type: "confirm"}) : null
  }

  acceptAnswer() {
    if(this.props.selectedAnswer) {

      this.setState({
        type: "confirm-selected"
      })

      this.props.acceptAnswer();
    }
  }

  render() {
    return (
      <FunctionalBtn
        value="Zatwierdź"
        symbol="check"
        type={ this.state.type } onClick={ this.acceptAnswer }
      />
    );
  }
}

GameConfirmButton.propTypes = {
  acceptAnswer: PropTypes.func.isRequired,
  selectedAnswer: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}
