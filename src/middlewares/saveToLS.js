import {
  CHANGE_CATEGORIES,
  CHANGE_CHEAT_ACTIVE,
  CHANGE_PLAYER_NAME,
  CHANGE_SUBMIT_SCORES,
  CHANGE_BUGS_REPORTING
} from "../consts/actionConsts.js";

function saveItem(key, val) {
  if(!localStorage) {
    console.error("Nie udało zapisać się ustawień! Twoja przeglądarka nie wspiera localStorage!")
  } else {
    localStorage.setItem(key, val)
  }
}

const saveToLS = (state) => (next) => (action) => {
  let gameReducer = state.getState().get("gameReducer");

  switch(action.type) {
    case CHANGE_PLAYER_NAME:
      saveItem("playerName", action.name);
      next(action);
      break;

    case CHANGE_CATEGORIES:
      saveItem("categories", JSON.stringify(action.categories));
      next(action);
      break;

    case CHANGE_CHEAT_ACTIVE:
      saveItem("cheatActive", action.value);
      next(action);
      break;

    case CHANGE_SUBMIT_SCORES:
      saveItem("submitScores", action.value);
      next(action);
      break;

    case CHANGE_BUGS_REPORTING:
      saveItem("bugsReporting", action.value);
      next(action);
      break;

    default:
      next(action);
      break;
  }

}

export default saveToLS;
