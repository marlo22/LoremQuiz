import {
  GAME_LOADED,
  GET_HIGHSCORES_DATA,
  LOAD_LS_SETTINGS,
  SET_CRITICAL_ERROR
} from "../consts/actionConsts.js";

import { Map } from "immutable";

const initialState = Map({
  confirmAnswers: false,
  highscoresData: [
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
    ["-", "-", "-", "-", "-"],
  ],
  gameLoaded: false,
  criticalError: null
})

const appReducer = (state = initialState, action) => {

  switch(action.type) {

    case GAME_LOADED:
      return state.set("gameLoaded", true);

    case GET_HIGHSCORES_DATA:
      return state.set("highscoresData", action.data);

    case SET_CRITICAL_ERROR:
      return state.merge({
        "criticalError": action.msg,
        "gameLoaded": true
      });

    case LOAD_LS_SETTINGS:
      return state;

    default:
      return state;

  }
}

export default appReducer;
