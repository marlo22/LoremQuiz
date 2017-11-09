import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import shortid from "shortid";

import Answer from "./Answer.jsx";

class Answers extends React.Component {
  constructor(props) {
    super(props);

    this.answerOnClick = this.answerOnClick.bind(this);
    this.setStatus = this.setStatus.bind(this);
  }

  answerOnClick(elem, correct) {
    let actions = this.props.actions;

    if(!this.props.timeIsUp && !this.props.lockedAnswers) {

      if(this.props.questionSet.get("correct") === elem) {
        return function() {
          actions.acceptAnswer();
          actions.lockAnswers();
          actions.selectAnswer(elem);
          actions.correctAnswer();
        }
      } else {
        return function() {
          actions.acceptAnswer();
          actions.lockAnswers();
          actions.selectAnswer(elem);
          actions.incorrectAnswer();
        }
      }

    } else {
      return null;
    }
  }

  setStatus(elem) {
    let questionSet = this.props.questionSet;

    if(questionSet.get("correct") === elem && this.props.highlightCorrect) {
      return "correct";
    }

    if(questionSet.get("correct") !== elem && this.props.selectedAnswer === elem && this.props.highlightCorrect) {
      return "incorrect";
    }

    return null;
  }

  render() {
    let questionSet = this.props.questionSet;
    let actions = this.props.actions;

    return (
      <ul className="answers stretch-block">
      { questionSet.get("answers").map((elem, i) => {
        return (

          <Answer
              key={ shortid.generate() }
              onClick={ this.answerOnClick(elem, questionSet.get("correct")) }
              status={ this.setStatus(elem) }
              text={ elem }
          />

        );
      }) }
      </ul>
    );
  }
}

Answers.propTypes = {
  actions: PropTypes.object.isRequired,
  // answerAccepted: PropTypes.bool.isRequired,
  // confirmAnswers: PropTypes.bool.isRequired,
  highlightCorrect: PropTypes.bool.isRequired,
  lockedAnswers: PropTypes.bool.isRequired,
  questionSet: ImmutablePropTypes.shape({

    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    correct: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]).isRequired

  }).isRequired,
  selectedAnswer: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  timeIsUp: PropTypes.bool.isRequired
}

export default Answers;
