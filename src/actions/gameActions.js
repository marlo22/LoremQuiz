import * as ACTIONS from "../consts/actionConsts.js";

export function acceptAnswer() {
  return {
    type: ACTIONS.ACCEPT_ANSWER
  }
}

export function addToUsedQuestions(questionDetails) {
  return {
    type: ACTIONS.ADD_TO_USED_QUESTIONS,
    questionDetails
  }
}

export function changeCategories(categories) {
  return {
    type: ACTIONS.CHANGE_CATEGORIES,
    categories
  }
}

export function changeCheatActive(value) {
  return {
    type: ACTIONS.CHANGE_CHEAT_ACTIVE,
    value
  }
}

export function changeSubmitScores(value) {
  return {
    type: ACTIONS.CHANGE_SUBMIT_SCORES,
    value
  }
}

export function changeBugsReporting(value) {
  return {
    type: ACTIONS.CHANGE_BUGS_REPORTING,
    value
  }
}

export function changeSubmitScoreStatus(code) {
  return {
    type: ACTIONS.CHANGE_SUBMIT_SCORE_STATUS,
    code
  }
}

export function changePlayerName(name) {
  return {
    type: ACTIONS.CHANGE_PLAYER_NAME,
    name
  }
}

export function correctAnswer() {
  return {
    type: ACTIONS.CORRECT_ANSWER
  }
}

export function gameOver() {
  return {
    type: ACTIONS.GAME_OVER
  }
}

export function getQuestion(level) {
  return {
    type: ACTIONS.GET_QUESTION,
    level
  }
}

export function incorrectAnswer() {
  return {
    type: ACTIONS.INCORRECT_ANSWER
  }
}

export function lockAnswers() {
  return {
    type: ACTIONS.LOCK_ANSWERS
  }
}

export function loadCategories() {
  return {
    type: ACTIONS.LOAD_CATEGORIES
  }
}

export function nextLevel(levelNumber) {
  return {
    type: ACTIONS.NEXT_LEVEL,
    levelNumber
  }
}

export function nextQuestion(questionNumber) {
  return {
    type: ACTIONS.NEXT_QUESTION,
    questionNumber
  }
}

export function notEnoughMoney(status) {
  return {
    type: ACTIONS.NOT_ENOUGH_MONEY,
    status
  }
}

export function resetGame() {
  return {
    type: ACTIONS.RESET_GAME
  }
}

export function selectAnswer(answer) {
  return {
    type: ACTIONS.SELECT_ANSWER,
    answer
  }
}

export function timeIsUp() {
  return {
    type: ACTIONS.TIME_IS_UP
  }
}

export function tipsExtraChance() {
  return {
    type: ACTIONS.TIPS_EXTRA_CHANCE
  }
}

export function tipsSwapQuestion() {
  return {
    type: ACTIONS.TIPS_SWAP_QUESTION
  }
}

export function tipsElliminateAnswer(amount) {
  return {
    type: ACTIONS.TIPS_ELLIMINATE_ANSWER,
    amount
  }
}

export function tipsFreezeTime() {
  return {
    type: ACTIONS.TIPS_FREEZE_TIME
  }
}

export function resetRoundState() {
  return {
    type: ACTIONS.RESET_ROUND_STATE
  }
}

export function updateTimer(value) {
  return {
    type: ACTIONS.UPDATE_TIMER,
    value
  }
}

export function submitScore() {
  return {
    type: ACTIONS.SUBMIT_SCORE
  }
}
