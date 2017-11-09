import { GET_HIGHSCORES_DATA } from "../consts/actionConsts.js";
import { API_URL } from "../consts/appConsts.js";

import { CONSOLE_ERROR_PREFIX } from "../consts/appConsts.js";

const getHighscoresData = (state) => (next) => (action) => {
  function getData(playerName, points, percentScore, date) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();

      xhttp.open("GET", `${API_URL}/highscores?order=percent_score,desc&page=1,10`, true);
      xhttp.send();

      xhttp.onload = (e) => {
        let target = e.target;

        if(target.readyState === 4 && target.status === 200) {
          let response = JSON.parse(xhttp.response).highscores.records,
              responseLength = response.length,
              highscoresReducerData = state.getState().get("appReducer").get("highscoresData");

          if(responseLength < 10) {
              response = Object.assign([], highscoresReducerData, response);
          }

          resolve(response);
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
    case GET_HIGHSCORES_DATA:
      getData()
        .then((res) => next({...action, data: res}))
        .catch((err) => console.error(`${CONSOLE_ERROR_PREFIX} ${err.message}`));
      break;

    default:
      next(action);
      break;
  }

}

export default getHighscoresData;
