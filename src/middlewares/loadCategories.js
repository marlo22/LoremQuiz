import { LOAD_CATEGORIES } from "../consts/actionConsts.js";
import { API_URL } from "../consts/appConsts.js";

import { gameLoaded, setCriticalError } from "../actions/appActions.js";

function getCategories() {
  return new Promise((resolve, reject) => {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET", `${API_URL}/categories/`, true);
    xhttp.send();

    xhttp.onload = (e) => {
      let target = e.target;

      if(target.readyState === 4 && target.status === 200) {
        let categories = JSON.parse(xhttp.response).categories.records;
        let categoriesObj = {};

        categories.map((elem) => {
          categoriesObj[elem[1]] = {
            name: elem[2],
            available: true
          }
        })

        resolve(categoriesObj);
      } else {
        reject(new Error("Response status error."));
      }
    }

    xhttp.onerror = (err) => {
      reject(err);
    }
  })
}

const loadCategories = (state) => (next) => (action) => {

  switch(action.type) {
    case LOAD_CATEGORIES:
      getCategories()
        .then((categories) => {
          let stateCategories = state.getState().get("gameReducer").get("categories");

          if(!stateCategories) {
            next({...action, categories, availableCategories: Object.keys(categories)})
          } else {
            let categoriesObj = Object.assign({}, categories, stateCategories),
                categoriesKeys = Object.keys(categories),
                keysDiffrenece = [];

            //Remove outdated categories
            for(let key in categoriesObj) {
              categoriesKeys.indexOf(key) === -1? delete categoriesObj[key] : null;
            }

            let availableCategories = [];

            for(let key in categoriesObj) {
              categoriesObj[key].available? availableCategories.push(key) : null;
            };

            next({...action, categories: categoriesObj, availableCategories});
          }

          setTimeout(() => next(gameLoaded()), 1000);

      })
      .catch((err) => next({...setCriticalError(null), errorObj: err}));
      break;

    default:
      next(action);
      break;
  }

}

export default loadCategories;
