import { ADD_TO_USED_QUESTIONS } from "../consts/actionConsts.js";

const addToUsedQuestions = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");

  switch(action.type) {
    case ADD_TO_USED_QUESTIONS:
      let questionDetails = action.questionDetails;
      let usedQuestions = gameReducer.get("usedQuestions").toObject();

      if(!usedQuestions[questionDetails.category]) {
        usedQuestions[questionDetails.category] = [];
      }

      if(usedQuestions[questionDetails.category].indexOf(questionDetails.id) === -1) {
        usedQuestions[questionDetails.category].push(questionDetails.id);
      }

      next({type: action.type, usedQuestions});
      break;

    default:
      next(action);
      break;
  }

}

export default addToUsedQuestions;
