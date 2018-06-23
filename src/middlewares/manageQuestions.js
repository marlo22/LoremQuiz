import { GET_QUESTION } from "../consts/actionConsts.js";
import { API_URL } from "../consts/appConsts.js";

import { addToUsedQuestions } from "../actions/gameActions.js";
import { setCriticalError } from "../actions/appActions.js";

const manageQuestions = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");

  function giveQuestion(level) {
    return new Promise((resolve, reject) => {
      let categories = gameReducer.get("availableCategories");
      let drawnCategoryIndex = Math.floor(Math.random() * categories.size);
      let drawnCategory = categories.get(drawnCategoryIndex);

      if(!categories) {
        reject(new Error());
      }

      let xhttp = new XMLHttpRequest();

      xhttp.open("GET", `${API_URL}/${drawnCategory}/?filter[]=level,eq,${level}&filter[]=accepted,eq,true`, true);
      xhttp.send();

      xhttp.onload = (e) => {
        let target = e.target;

        if(target.readyState === 4 && target.status === 200) {
          let response = JSON.parse(target.response)[drawnCategory].records;
          let usedQuestions = gameReducer.get("usedQuestions").toObject();

          function drawQuestionIndex() {
            let drawnQuestionIndex = Math.floor(Math.random() * response.length);

            if(usedQuestions[drawnCategory] && usedQuestions[drawnCategory].indexOf(drawnQuestionIndex) !== -1) {
              return drawQuestionIndex();
            } else {
              return drawnQuestionIndex;
            }
          }

          let drawnQuestionIndex = drawQuestionIndex();
          let drawnQuestion = response[drawnQuestionIndex];

          let question = {
            question: drawnQuestion[3],
            answers: JSON.parse(drawnQuestion[4]),
            correct: drawnQuestion[5]
          }

          let questionUsedData = {
            category: drawnCategory,
            id: drawnQuestionIndex
          }

          resolve([question, questionUsedData]);
        } else {
          reject(new Error("Response status error."));
        }
      }

      xhttp.onerror = (err) => {
        reject(err)
      }
    })
  }

  switch(action.type) {
    case GET_QUESTION:
      giveQuestion(action.level)
        .then((response) => {
          let question = response[0];
          let questionDetails = response[1];

          next(addToUsedQuestions(questionDetails));
          next({...action, question});
        })
        .catch((err) => next({...setCriticalError(null), errorObj: err}));
      break;

    default:
      next(action);
      break;
  }

}

export default manageQuestions;
