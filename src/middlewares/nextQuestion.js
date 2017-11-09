import { NEXT_QUESTION, NEXT_LEVEL } from "../consts/actionConsts.js";
import { QUESTION_AT_LEVEL_NUMBER } from "../consts/rulesConsts.js";
import { nextQuestion, nextLevel, gameOver, getQuestion } from "../actions/gameActions.js";

const manageQuestions = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");
  let questionNumber = gameReducer.get("questionNumber");
  let levelNumber = gameReducer.get("levelNumber");

  switch(action.type) {
    case NEXT_QUESTION:
      if(questionNumber === 5) {
        let nextLevelNumber = levelNumber + 1;

        if(nextLevelNumber <= 5) {
          next(nextLevel(nextLevelNumber));
          questionNumber = 0;
        }
      }
      next(nextQuestion(questionNumber + 1));
      break;

    default:
      next(action);
      break;
  }

}

export default manageQuestions;
