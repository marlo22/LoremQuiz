import { SET_CRITICAL_ERROR } from "../consts/actionConsts.js";
import { API_URL, CONSOLE_ERROR_PREFIX, CONSOLE_INFO_PREFIX } from "../consts/appConsts.js";
import { setCriticalError } from "../actions/gameActions.js";

const reportBug = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");

  function parseDate() {
    let date = new Date(),
        day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();

    return `${year}-${month < 10? `0${month}` : month}-${day < 10? `0${day}` : day}`;
  }

  function parseTime() {
    let date = new Date(),
        hour = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();

    return `${hour < 10? `0${hour}` : hour}:${minutes < 10? `0${minutes}` : minutes}:${seconds < 10? `0${seconds}` : seconds}`;
  }

  function sendReport(errObj) {
    return new Promise((resolve, reject) => {
      let xhttp = new XMLHttpRequest();

      let { code, columnNumber, filename, lineNumber, message, name } = errObj;

      xhttp.open("POST", `${API_URL}/bugs-reports/`, true);

      xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
      xhttp.send(`date=${parseDate()}&time=${parseTime()}&file=${filename}&line=${lineNumber}&col=${columnNumber}&type=${name}&code=${code}&message=${message}`);

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
    case SET_CRITICAL_ERROR:
      if(gameReducer.get("bugsReporting")) {
        sendReport(action.errorObj)
        .then(() => {
          next({...action, msg: action.errorObj.message})
          console.log(`${CONSOLE_INFO_PREFIX} Raport o błędach został wysłany! Dziękuję za pomoc.`)
        })
        .catch((err) => console.error(`${CONSOLE_ERROR_PREFIX} ${err.message}`));
      } else {
        next({...action, msg: action.errorObj.message})
      }
      break;

    default:
      next(action);
      break;
  }

}

export default reportBug;
