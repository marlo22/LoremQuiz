import { SUBMIT_SCORE } from "../consts/actionConsts.js";
import { TOTAL_POINTS } from "../consts/rulesConsts.js";
import { API_URL, CONSOLE_ERROR_PREFIX } from "../consts/appConsts.js";

import { changeSubmitScoreStatus } from "../actions/gameActions.js";

const sendScores = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");

  function parseDate() {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    return `${year}-${month < 10? `0${month}` : month}-${day < 10? `0${day}` : day}`;
  }

  function calculatePercent(value, maxValue) {
    if(value !== 0 && maxValue !== 0) {
      return parseInt((value * 100) / maxValue) + "%";
    } else {
      return 0 + "%";
    }
  }

  function sendScore(playerName, points, percentScore, date) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();

      xhttp.open("POST", `${API_URL}/highscores/`, true);

      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhttp.send(`player_name=${playerName}&points=${points}&percent_score=${percentScore}&date=${date}`);

      xhttp.onload = (e) => {
        let target = e.target;

        if(target.readyState === 4 && target.status === 200) {
          resolve(xhttp.response);
        } else {
          reject(new Error("Response status error."));
        }
      }

      xhttp.onerror = () => {
        reject(err);
      }
    })
  }

  switch(action.type) {
    case SUBMIT_SCORE:
      let playerName = gameReducer.get("playerName"),
          points = gameReducer.get("cash"),
          percentScore = calculatePercent(points, TOTAL_POINTS),
          date = parseDate();

      next(changeSubmitScoreStatus(1));
      setTimeout(() => {
        sendScore(playerName, points, percentScore, date)
          .then(() => next(changeSubmitScoreStatus(2)))
          .then(() => next(action))
          .catch((err) => {
            console.error(`${CONSOLE_ERROR_PREFIX} ${err.message}`)
            next(changeSubmitScoreStatus(-1));
            next(action)
          });
      }, 1000);
      break;

    default:
      next(action);
      break;
  }

}

export default sendScores;
