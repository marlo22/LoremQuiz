import { LOAD_LS_SETTINGS } from "../consts/actionConsts.js";
import {
  changeCategories,
  changeCheatActive,
  changePlayerName,
  changeSubmitScores,
  changeBugsReporting
} from "../actions/gameActions.js";

const loadLSSettings = (state) => (next) => (action) => {
  function loadFromLS() {
    if(!localStorage) {
      console.error("Twoja przeglądarka nie wspiera localStorage!")
    } else {
      let categories = localStorage.getItem("categories");
      let cheatActive = localStorage.getItem("cheatActive");
      let playerName = localStorage.getItem("playerName");
      let submitScores = localStorage.getItem("submitScores");
      let bugsReporting = localStorage.getItem("bugsReporting");
      let itemsObj = {};

      categories? itemsObj.categories = JSON.parse(categories) : null;
      cheatActive? itemsObj.cheatActive = JSON.parse(cheatActive) : null;
      submitScores? itemsObj.submitScores = JSON.parse(submitScores) : null;
      bugsReporting? itemsObj.bugsReporting = JSON.parse(bugsReporting) : null;
      playerName? itemsObj.playerName = playerName : itemsObj.playerName = state.getState().get("gameReducer").get("playerName");

      return itemsObj;
    }
  }

  switch(action.type) {
    case LOAD_LS_SETTINGS:
      let LS = loadFromLS();

      next(changeCategories(LS.categories));
      next(changeCheatActive(LS.cheatActive));
      next(changePlayerName(LS.playerName));
      next(changeSubmitScores(LS.submitScores));
      next(changeBugsReporting(LS.bugsReporting));
      next(action);
      break;

    default:
      next(action);
      break;
  }

}

export default loadLSSettings;
