import * as ACTIONS from "../consts/actionConsts.js";

export function gameLoaded() {
  return {
    type: ACTIONS.GAME_LOADED
  }
}

export function getHighscoresData(data) {
  return {
    type: ACTIONS.GET_HIGHSCORES_DATA,
    data
  }
}

export function loadLSSettings() {
  return {
    type: ACTIONS.LOAD_LS_SETTINGS
  }
}

export function setCriticalError(msg) {
  return {
    type: ACTIONS.SET_CRITICAL_ERROR,
    msg
  }
}
