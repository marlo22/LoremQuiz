import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux-immutable";
import { Map } from "immutable";
import { MemoryRouter as Router, Route } from "react-router-dom";

//Components
import MainMenuContainer from "./containers/MainMenuContainer.js";
import GameContainer from "./containers/GameContainer.js";
import HighscoresContainer from "./containers/HighscoresContainer.js";
import SettingsContainer from "./containers/SettingsContainer.js";
import Help from "./components/Help.jsx";
import About from "./components/About.jsx";

//Reducers
import appReducer from "./reducers/appReducer.js";
import gameReducer from "./reducers/gameReducer.js";
import UIReducer from "./reducers/UIReducer.js";

//Middlewares
import loadCategories from "./middlewares/loadCategories.js";
import manageQuestions from "./middlewares/manageQuestions.js";
import addToUsedQuestions from "./middlewares/addToUsedQuestion.js";
import nextQuestion from "./middlewares/nextQuestion.js";
import saveToLS from "./middlewares/saveToLS.js";
import loadLSSettings from "./middlewares/loadLSSettings.js";
import sendScores from "./middlewares/sendScores.js";
import getHighscoresData from "./middlewares/getHighscoresData.js";
import reportBug from "./middlewares/reportBug.js";

const reducers = combineReducers({
  appReducer,
  gameReducer,
  UIReducer
})

const store = createStore(reducers, Map({}),
  applyMiddleware(
    loadCategories,
    manageQuestions,
    addToUsedQuestions,
    nextQuestion,
    saveToLS,
    loadLSSettings,
    loadLSSettings,
    sendScores,
    getHighscoresData,
    reportBug
  )
);

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ history }>
      <div>
        <Route path="/" exact component={ MainMenuContainer } />
        <Route path="/game" component={ GameContainer } />
        <Route path="/highscores" component={ HighscoresContainer } />
        <Route path="/settings" component={ SettingsContainer } />
        <Route path="/help" component={ Help } />
        <Route path="/about" component={ About } />
      </div>
    </Router>
  </Provider>
, document.getElementById("app"));
